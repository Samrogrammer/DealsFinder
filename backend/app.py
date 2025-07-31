from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import requests
from config import Config
from models import db, Deal, Category, User
from routes.auth import auth_bp
from routes.deals import deals_bp
from routes.admin import admin_bp

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(deals_bp)
app.register_blueprint(admin_bp)

# Database Models: models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

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

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    deals = db.relationship('Deal', backref='category', lazy=True)
