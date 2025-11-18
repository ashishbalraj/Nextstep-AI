# backend/routes/career_routes.py
from flask import Blueprint, request, jsonify
from config import get_db
from ml.model_loader import predict_career
from models.prediction_model import save_prediction

career_routes = Blueprint("career_routes", __name__)

@career_routes.route("/predict", methods=["POST"])
def predict():
    data = request.get_json() or {}

    # Accept optional email from frontend (if user is signed in)
    email = data.get("email")  # may be None

    qualification = data.get("qualification", "")
    hobbies = data.get("hobbies", "")
    about = data.get("about", "")
    goal = data.get("goal", "")
    skills = data.get("skills", "")

    # Combine into single text – same as model expects
    user_text = f"{qualification} {hobbies} {about} {goal} {skills}"

    try:
        # 1) get prediction from ML loader
        predicted = predict_career(user_text)

        # 2) Save prediction into DB (safe minimal record)
        db = get_db()
        record = {
            "email": email,
            "prediction": predicted,
            "input": {
                "qualification": qualification,
                "hobbies": hobbies,
                "about": about,
                "goal": goal,
                "skills": skills,
            },
            "created_at": __import__("datetime").datetime.utcnow()
        }

        save_id = save_prediction(db, record)

        # 3) respond with prediction + db id
        return jsonify({"career_prediction": predicted, "saved_id": save_id})
    except Exception as e:
        import traceback; traceback.print_exc()
        return jsonify({"error": "Model error", "details": str(e)}), 500
