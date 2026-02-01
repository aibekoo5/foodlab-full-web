from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Foodlab"
    VERSION: str = "1.0.0"
    API_STR: str = "/api"
    DEBUG: bool = True

    # Database - значения по умолчанию для разработки
    DATABASE_URL: str = "postgresql+asyncpg://postgres:654321@localhost:5432/foodlab"

    # JWT - значения по умолчанию для разработки
    SECRET_KEY: str = "6a5168d54c2c87684c57bcbc32f1b6c44bf588bf85abfb52fb13443c58449057"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # CORS
    BACKEND_CORS_ORIGINS: str = "*"

    model_config = {
        "case_sensitive": True,
        "env_file": ".env",
        "env_file_encoding": "utf-8"
    }

# Загружаем настройки (переменные окружения переопределят значения по умолчанию)
settings = Settings()