from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from backend/.env
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

from routes.auth_routes import auth_routes
from routes.user_routes import user_routes
from routes.career_routes import career_routes
from routes.chatbot_routes import chatbot_routes



print("GEMINI_API_KEY loaded:", os.getenv("GEMINI_API_KEY") is not None)

app = Flask(__name__)
CORS(app)  # allow cross-origin requests during development



# Register blueprints
app.register_blueprint(auth_routes, url_prefix="/api")         # auth endpoints => /api/...
app.register_blueprint(user_routes, url_prefix="/api/user")    # user endpoints => /api/user/...
app.register_blueprint(career_routes, url_prefix="/api/career")
app.register_blueprint(chatbot_routes, url_prefix="/api/chatbot")



@app.route("/")
def home():
    return jsonify({"message": "NextStep AI backend running"})

if __name__ == "__main__":
    app.run(debug=True)
