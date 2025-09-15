from fastapi import APIRouter, HTTPException
from app.models.journal import JournalEntry

router = APIRouter()

# Temporary in-memory store
journal_db = []

@router.post("/add")
async def add_journal(entry: JournalEntry):
    journal_db.append(entry.dict())
    return {"msg": "Journal entry added", "entry": entry}

@router.get("/list/{user_id}")
async def list_journals(user_id: str):
    user_entries = [j for j in journal_db if j["user_id"] == user_id]
    if not user_entries:
        raise HTTPException(status_code=404, detail="No journal entries found")
    return {"journals": user_entries}
