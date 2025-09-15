from fastapi import APIRouter
from app.controllers import mood_controller

router = APIRouter()
router.include_router(mood_controller.router, prefix="/mood", tags=["Mood"])
