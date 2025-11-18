# backend/routes/user_routes.py
from flask import Blueprint, request, jsonify
from config import get_db
from models.user_model import find_user_by_email, get_user_by_id
from models.prediction_model import get_predictions_by_email


user_routes = Blueprint("user_routes", __name__)

@user_routes.route("/profile", methods=["GET"])
def profile():
    """
    Example: GET /api/user/profile?email=prasad@test.com
    or GET /api/user/profile?id=<user_id>
    This is a simple, unprotected endpoint for development/testing.
    We'll secure it with tokens later.
    """
    db = get_db()
    email = request.args.get("email")
    user_id = request.args.get("id")

    user = None
    if email:
        user = find_user_by_email(db, email)
    elif user_id:
        user = get_user_by_id(db, user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Remove sensitive fields before returning
    user.pop("password", None)
    user["_id"] = str(user["_id"])

    return jsonify({"user": user})


@user_routes.route("/predictions", methods=["GET"])
def get_my_predictions():
    email = request.args.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400
    
    db = get_db()
    history = get_predictions_by_email(db, email)

    # Convert ObjectId & datetime to strings
    for h in history:
        h["_id"] = str(h["_id"])
        if "created_at" in h:
            try:
                h["created_at"] = h["created_at"].isoformat()
            except:
                pass

    return jsonify({"history": history})

