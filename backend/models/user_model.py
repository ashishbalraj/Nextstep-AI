# backend/models/user_model.py
from bson.objectid import ObjectId

def create_user(db, user_data):
    users = db["users"]
    result = users.insert_one(user_data)
    return str(result.inserted_id)

def find_user_by_email(db, email):
    users = db["users"]
    return users.find_one({"email": email})

def get_user_by_id(db, user_id):
    users = db["users"]
    try:
        return users.find_one({"_id": ObjectId(user_id)})
    except Exception:
        return None

def verify_password(user_doc, raw_password):
    # For now we store plain text password (you said not to hash yet).
    # Later replace with hashing check.
    if not user_doc:
        return False
    return user_doc.get("password") == raw_password
