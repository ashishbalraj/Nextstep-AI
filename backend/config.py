# backend/config.py
from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "nextstep_ai"

_client = None

def get_db():
    global _client
    if _client is None:
        _client = MongoClient(MONGO_URI)
    return _client[DB_NAME]
