from fastapi import APIRouter

router = APIRouter()

# Example resource list (can later be moved to MongoDB)
resources = [
    {"title": "Stress Management Tips", "url": "https://www.mind.org.uk/information-support/tips-for-everyday-living/stress"},
    {"title": "Free Mental Health Helpline India", "url": "https://www.vandrevalafoundation.com/helpline"},
    {"title": "Meditation for Students", "url": "https://www.headspace.com/meditation/students"}
]

@router.get("/")
async def get_resources():
    return {"resources": resources}
