# routes/admin.py
from flask import Blueprint, request, jsonify
from models import db, Deal, Category

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin/deals', methods=['POST'])
def create_deal():
    """Create a new deal"""
    data = request.get_json()
    
    new_deal = Deal(
        title=data['title'],
        description=data['description'],
        original_price=data['original_price'],
        deal_price=data['deal_price'],
        affiliate_link=data['affiliate_link'],
        category_id=data['category_id'],
        image_url=data['image_url']
    )
    
    db.session.add(new_deal)
    db.session.commit()
    
    return jsonify(new_deal.to_dict()), 201

@admin_bp.route('/admin/deals/<int:deal_id>', methods=['PUT', 'DELETE'])
def manage_deal(deal_id):
    """Update or delete a deal"""
    deal = Deal.query.get_or_404(deal_id)
    
    if request.method == 'DELETE':
        db.session.delete(deal)
        db.session.commit()
        return '', 204
    
    # Handle PUT request
    data = request.get_json()
    for key, value in data.items():
        setattr(deal, key, value)
    
    db.session.commit()
    return jsonify(deal.to_dict())