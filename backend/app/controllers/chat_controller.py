from fastapi import APIRouter, HTTPException
from app.services.ai_service import ask_gemini

router = APIRouter()

@router.post("/chat")
async def chat_with_ai(message: dict):
    try:
        reply = await ask_gemini(
            f"You are a supportive mental wellness assistant.\nUser: {message['text']}"
        )
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
