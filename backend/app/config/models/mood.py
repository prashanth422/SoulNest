from pydantic import BaseModel
from datetime import datetime

class MoodEntry(BaseModel):
    user_id: str
    mood: str
    created_at: datetime = datetime.utcnow()
