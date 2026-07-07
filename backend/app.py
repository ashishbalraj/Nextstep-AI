from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv


# Load environment variables from backend/.env
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))


# Debug API key loading
print("GROQ_API_KEY loaded:", os.getenv("GROQ_API_KEY") is not None)


from routes.auth_routes import auth_routes
from routes.user_routes import user_routes
from routes.career_routes import career_routes
from routes.chatbot_routes import chatbot_routes



app = Flask(__name__)

# Enable CORS
CORS(app)



# Register Blueprints
app.register_blueprint(
    auth_routes,
    url_prefix="/api"
)

app.register_blueprint(
    user_routes,
    url_prefix="/api/user"
)

app.register_blueprint(
    career_routes,
    url_prefix="/api/career"
)

app.register_blueprint(
    chatbot_routes,
    url_prefix="/api/chatbot"
)



@app.route("/")
def home():
    return jsonify({
        "message": "NextStep AI backend running"
    })



if __name__ == "__main__":
    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )