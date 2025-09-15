from pydantic import BaseSettings

class Settings(BaseSettings):
    MONGO_URI: str
    DB_NAME: str
    GEMINI_API_KEY: str
    SECRET_KEY: str = "supersecret"
    ALGORITHM: str = "HS256"

    class Config:
        env_file = ".env"

settings = Settings()
