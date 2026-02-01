# test/create_test_plans.py
import asyncio
import uuid
import os
import sys
from pathlib import Path

# Добавьте путь к корню проекта
project_root = Path(__file__).parent.parent
sys.path.append(str(project_root))

# Загрузите переменные окружения из правильного файла .env
from dotenv import load_dotenv

env_path = project_root / '.env'
load_dotenv(env_path)

# Теперь импортируйте остальные модули
from core.database import AsyncSessionLocal
from models.subscription import Plan, PlanInterval
from sqlalchemy import delete  # Используйте delete вместо text


async def create_test_plans():
    plans_data = [
        {
            "id": uuid.uuid4(),
            "slug": "basic-monthly",
            "name": "Basic Plan",
            "description": "Perfect for individual users",
            "price_cents": 999,
            "interval": PlanInterval.month,
            "trial_days": 7,
            "features": {
                "max_orders_per_day": 10,
                "priority_support": False,
                "advanced_analytics": False
            },
            "stripe_price_id": "price_1SXexcCaalAn8zx3AVlutYR2"
        },
        {
            "id": uuid.uuid4(),
            "slug": "pro-monthly",
            "name": "Pro Plan",
            "description": "For power users and small businesses",
            "price_cents": 1999,
            "interval": PlanInterval.month,
            "trial_days": 14,
            "features": {
                "max_orders_per_day": 50,
                "priority_support": True,
                "advanced_analytics": True
            },
            "stripe_price_id": "price_1SXf15CaalAn8zx3FrG8gcEH"
        },
        {
            "id": uuid.uuid4(),
            "slug": "enterprise-yearly",
            "name": "Enterprise Plan",
            "description": "For large organizations",
            "price_cents": 2999,
            "interval": PlanInterval.year,
            "trial_days": 30,
            "features": {
                "max_orders_per_day": 1000,
                "priority_support": True,
                "advanced_analytics": True,
                "custom_integrations": True
            },
            "stripe_price_id": "price_1SXfB7CaalAn8zx3edPZT44x"
        }
    ]

    async with AsyncSessionLocal() as session:
        try:
            # Очистить существующие планы с использованием ORM
            await session.execute(delete(Plan))

            # Добавить новые планы
            for plan_data in plans_data:
                # Создаем объект Plan и добавляем его в сессию
                plan = Plan(**plan_data)
                session.add(plan)

            await session.commit()
            print("✅ Test plans created successfully!")
            print("📋 Created plans:")
            for plan in plans_data:
                print(f"   - {plan['name']} ({plan['slug']}) - ${plan['price_cents'] / 100}")

        except Exception as e:
            await session.rollback()
            print(f"❌ Error: {e}")
            raise


if __name__ == "__main__":
    asyncio.run(create_test_plans())