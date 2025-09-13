from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to talk to backend

@app.route("/mood", methods=["POST"])
def mood():
    data = request.json
    mood = data.get("mood", "")
    return jsonify({ "message": f"Mood '{mood}' received", "streak": 3 })

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message = data.get("message", "")
    reply = f"AI response to: {message}"  # Replace with Gemini/OpenAI later
    return jsonify({ "reply": reply })

if __name__ == "__main__":
    app.run(debug=True)
