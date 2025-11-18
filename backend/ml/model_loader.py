import joblib
import os

BASE_DIR = os.path.dirname(__file__)

# Load all model components ONCE
model = joblib.load(os.path.join(BASE_DIR, "career_prediction_model.pkl"))
vectorizer = joblib.load(os.path.join(BASE_DIR, "tfidf_vectorizer.pkl"))
encoder = joblib.load(os.path.join(BASE_DIR, "label_encoder.pkl"))

def predict_career(text):
    """Takes user input text and returns predicted career."""
    tfidf_input = vectorizer.transform([text])
    prediction = model.predict(tfidf_input)[0]
    final_career = encoder.inverse_transform([prediction])[0]
    return final_career
