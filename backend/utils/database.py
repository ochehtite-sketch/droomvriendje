"""
Database configuration and helper functions
"""
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging

logger = logging.getLogger(__name__)

# MongoDB connection singleton
_client = None
_db = None

def get_database():
    """Get the database connection"""
    global _client, _db
    
    if _db is not None:
        return _db
    
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.environ.get('DB_NAME', 'droomvriendje')
    
    try:
        import certifi
        _client = AsyncIOMotorClient(
            mongo_url,
            tlsCAFile=certifi.where(),
            serverSelectionTimeoutMS=10000
        )
    except ImportError:
        _client = AsyncIOMotorClient(mongo_url)
    
    _db = _client[db_name]
    logger.info(f"MongoDB connected to: {db_name}")
    return _db

def get_collection(collection_name: str):
    """Get a specific collection"""
    db = get_database()
    return db[collection_name]
