from pydantic_settings import BaseSettings, SettingsConfigDict
import os

ENV_MODE = os.getenv("ENV", "local")

env_file_name = {
    "local": ".env.local",
    "prod": ".env.prod"
}.get(ENV_MODE, ".env")

env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", env_file_name))

class Settings(BaseSettings):
    ENV: str = ENV_MODE
    DATABASE_URL: str
    REDIS_URL: str

    model_config = SettingsConfigDict(env_file=env_path)

settings = Settings()