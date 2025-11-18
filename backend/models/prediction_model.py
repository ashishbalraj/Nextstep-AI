from datetime import datetime

def save_prediction(db, prediction_record: dict) -> str:
    """
    Save a prediction document.
    prediction_record example:
    {
      "email": "prasad@test.com" or None,
      "prediction": "Software engineer",
      "input": { ... },   # original form fields
      "created_at": datetime.utcnow()
    }
    """
    preds = db["predictions"]
    result = preds.insert_one(prediction_record)
    return str(result.inserted_id)

def get_predictions_by_email(db, email: str, limit: int = 50):
    preds = db["predictions"]
    cursor = preds.find({"email": email}).sort("created_at", -1).limit(limit)
    return list(cursor)
