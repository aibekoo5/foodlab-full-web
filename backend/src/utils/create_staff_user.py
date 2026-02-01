import asyncio
import uuid
from src.core.database import get_async_session
from src.repositories.user import UserRepository
from src.core.security import get_password_hash


async def create_staff_user():
    async for db in get_async_session():
        user_repo = UserRepository(db)

        # Проверяем, существует ли пользователь
        existing_user = await user_repo.get_by_email("admin@example.com")
        if existing_user:
            print("Staff user already exists")
            return

        # Создаем пользователя с правами staff
        user_data = {
            "email": "admin@example.com",
            "hashed_password": get_password_hash("admin123"),
            "full_name": "Admin User",
            "phone": "+1234567890",
            "is_active": True,
            "is_staff": True  # Это ключевое поле!
        }

        user = await user_repo.create(user_data)
        print(f"✅ Created staff user: {user.email}")
        print("You can now login with: admin@example.com / admin123")


if __name__ == "__main__":
    asyncio.run(create_staff_user())