from flask import Blueprint, request, jsonify
import os
from dotenv import load_dotenv
from openai import OpenAI


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

load_dotenv()

print("ENV PATH:", BASE_DIR)
print("ENV TEST:", os.getenv("GROQ_API_KEY"))


chatbot_routes = Blueprint("chatbot_routes", __name__)

# Get Groq API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")


print("CHATBOT KEY FOUND:", GROQ_API_KEY is not None)


# Create Groq client
client = None

if GROQ_API_KEY:

    client = OpenAI(
        api_key=GROQ_API_KEY,
        base_url="https://api.groq.com/openai/v1"
    )

    print("Groq client created successfully")

else:

    print("ERROR: GROQ_API_KEY is not set.")



@chatbot_routes.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "reply": "No data received"
            })


        user_message = data.get("message", "")


        if not user_message.strip():

            return jsonify({
                "reply": "Please enter a message."
            })


        if client is None:

            return jsonify({
                "reply": "Configuration Error: Groq API key is missing."
            })


        print("User message:", user_message)


        response = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "system",
                    "content": "You are NextStep AI career assistant. Help users with career guidance, skills, jobs and learning paths."
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ],

            temperature=0.7
        )


        reply = response.choices[0].message.content


        print("Groq response:", reply)


        return jsonify({
            "reply": reply
        })


    except Exception as e:

        print("Chatbot error:", str(e))

        import traceback
        traceback.print_exc()


        return jsonify({
            "reply": "Something went wrong: " + str(e)
        })