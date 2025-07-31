# routes/deals.py
from flask import Blueprint, request, jsonify
from models import db, Deal, Category
from sqlalchemy import desc

deals_bp = Blueprint('deals', __name__)

@deals_bp.route('/deals', methods=['GET'])
def get_deals():
    """Get all deals with optional filtering and sorting"""
    category = request.args.get('category', 'all')
    sort = request.args.get('sort', 'newest')
    
    query = Deal.query.filter_by(is_active=True)
    
    # Apply category filter
    if category != 'all':
        query = query.join(Category).filter(Category.name == category)
    
    # Apply sorting
    if sort == 'newest':
        query = query.order_by(desc(Deal.created_at))
    elif sort == 'price-low':
        query = query.order_by(Deal.deal_price)
    elif sort == 'discount':
        query = query.order_by(desc(Deal.original_price - Deal.deal_price))
    
    deals = query.all()
    return jsonify([deal.to_dict() for deal in deals])

@deals_bp.route('/deals/<int:deal_id>', methods=['GET'])
def get_deal(deal_id):
    """Get a specific deal by ID"""
    deal = Deal.query.get_or_404(deal_id)
    return jsonify(deal.to_dict())