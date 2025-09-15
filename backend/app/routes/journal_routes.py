from fastapi import APIRouter
from app.controllers import journal_controller

router = APIRouter()
router.include_router(journal_controller.router, prefix="/journal", tags=["Journal"])
