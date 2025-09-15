from fastapi import APIRouter
from app.controllers import resource_controller

router = APIRouter()
router.include_router(resource_controller.router, prefix="/resources", tags=["Resources"])
