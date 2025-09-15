# app/controllers/auth_controller.py
from fastapi import APIRouter, HTTPException, Depends
from passlib.hash import bcrypt
from datetime import datetime, timedelta
from jose import JWTError, jwt
from app.config.db import get_collection
from app.config.settings import settings

router = APIRouter()
users_collection = get_collection("users")

# Generate JWT token
def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=2)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


@router.post("/register")
async def register(user: dict):
    email = user.get("email")
    password = user.get("password")

    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password required")

    # Check if user already exists
    if users_collection.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="User already exists")

    # Hash password
    hashed_pw = bcrypt.hash(password)

    # Insert new user
    new_user = {
        "email": email,
        "password": hashed_pw,
        "created_at": datetime.utcnow()
    }
    users_collection.insert_one(new_user)

    return {"message": "User registered successfully!"}


@router.post("/login")
async def login(user: dict):
    email = user.get("email")
    password = user.get("password")

    db_user = users_collection.find_one({"email": email})
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not bcrypt.verify(password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # ✅ Create JWT token
    access_token = create_access_token({"sub": email})

    return {
        "message": "Login successful!",
        "access_token": access_token,
        "token_type": "bearer"
    }
