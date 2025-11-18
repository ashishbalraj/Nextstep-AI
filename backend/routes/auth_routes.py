# backend/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from config import get_db
from models.user_model import create_user, find_user_by_email, verify_password

auth_routes = Blueprint("auth_routes", __name__)

@auth_routes.route("/signup", methods=["POST"])
def signup_user():
    db = get_db()
    data = request.get_json() or {}

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "All fields (name, email, password) are required"}), 400

    if find_user_by_email(db, email):
        return jsonify({"error": "Email already registered"}), 400

    user = {"name": name, "email": email, "password": password}
    user_id = create_user(db, user)

    return jsonify({"message": "User registered successfully", "user_id": user_id}), 201

@auth_routes.route("/signin", methods=["POST"])
def signin_user():
    db = get_db()
    data = request.get_json() or {}

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = find_user_by_email(db, email)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if not verify_password(user, password):
        return jsonify({"error": "Incorrect password"}), 401

    # keep response minimal — tokens/sessions later
    return jsonify({"message": "Login successful", "name": user.get("name"), "email": user.get("email")})
