from pydantic import BaseModel
from datetime import datetime

class JournalEntry(BaseModel):
    user_id: str
    text: str
    created_at: datetime = datetime.utcnow()
