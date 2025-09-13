# mongo_handler.py - MongoDB connection and data operations

from pymongo import MongoClient

# Connect to local MongoDB (replace with cloud URI later)
client = MongoClient("mongodb://localhost:27017/")
db = client["soulnest_db"]

# Collections for storing data
moods_collection = db["moods"]
journals_collection = db["journals"]

# Save mood entry
def save_mood(user_id, mood):
    moods_collection.insert_one({
        "user_id": user_id,
        "mood": mood
    })

# Save journal entry
def save_journal(user_id, entry):
    journals_collection.insert_one({
        "user_id": user_id,
        "entry": entry
    })
