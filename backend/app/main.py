from fastapi import FastAPI
from app.routes import auth_routes, chat_routes, mood_routes, journal_routes, resource_routes

app = FastAPI(title="SoulNest - Youth Wellness AI")

# ✅ Include all routes
app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(chat_routes.router, prefix="/chat", tags=["Chat"])
app.include_router(mood_routes.router, tags=["Mood"])
app.include_router(journal_routes.router, tags=["Journal"])
app.include_router(resource_routes.router, tags=["Resources"])

# ✅ Health check (optional but good for hackathons)
@app.get("/")
async def root():
    return {"message": "Welcome to SoulNest API - Youth Wellness AI 💙"}
