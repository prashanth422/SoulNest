from fastapi import APIRouter, HTTPException
from app.models.mood import MoodEntry

router = APIRouter()

# Temporary in-memory store
mood_db = []

@router.post("/track")
async def track_mood(entry: MoodEntry):
    mood_db.append(entry.dict())
    return {"msg": "Mood saved successfully", "entry": entry}

@router.get("/history/{user_id}")
async def get_mood_history(user_id: str):
    user_moods = [m for m in mood_d_]()_
