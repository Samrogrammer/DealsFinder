# config.py
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:password@localhost:5432/affiliate_site')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Security settings
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')
    
    # API keys for affiliate networks
    AMAZON_AFFILIATE_ID = os.getenv('AMAZON_AFFILIATE_ID')
    
    # Pagination settings
    DEALS_PER_PAGE = 12