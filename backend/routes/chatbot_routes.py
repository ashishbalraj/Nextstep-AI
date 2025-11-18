from flask import Blueprint, request, jsonify
import os
import google.generativeai as genai

chatbot_routes = Blueprint("chatbot_routes", __name__)

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("ERROR: GEMINI_API_KEY is not set.")
else:
    genai.configure(api_key=GEMINI_API_KEY)

# Use FREE available model
model = genai.GenerativeModel("gemini-1.5-flash")

@chatbot_routes.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message.strip():
        return jsonify({"reply": "Please enter a message."})

    if not GEMINI_API_KEY:
        return jsonify({"reply": "Configuration Error: Gemini API key is missing on the server."})

    try:
        response = model.generate_content(user_message)
        reply = response.text
        return jsonify({"reply": reply})

    except Exception as e:
        print(f"Chatbot error: {e}")
        # Log the full traceback for better debugging
        import traceback
        traceback.print_exc()
        return jsonify({"reply": "Something went wrong. Try again later."})
