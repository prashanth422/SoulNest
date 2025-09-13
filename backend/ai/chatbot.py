# chatbot.py - Gemini API integration

import google.generativeai as genai

genai.configure(api_key="YOUR_GEMINI_API_KEY")

def get_gemini_response(user_message):
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(user_message)
    return response.text
