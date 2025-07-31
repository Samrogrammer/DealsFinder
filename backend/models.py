# models.py
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Deal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    original_price = db.Column(db.Float)
    deal_price = db.Column(db.Float)
    affiliate_link = db.Column(db.String(500))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    image_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)

    def to_dict(self):
        """Convert deal object to dictionary for API responses"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'original_price': self.original_price,
            'deal_price': self.deal_price,
            'affiliate_link': self.affiliate_link,
            'image_url': self.image_url,
            'category': self.category.name if self.category else None,
            'expires_at': self.expires_at.isoformat() if self.expires_at else None
        }

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    deals = db.relationship('Deal', backref='category', lazy=True)