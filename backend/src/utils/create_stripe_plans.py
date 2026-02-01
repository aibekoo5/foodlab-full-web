import stripe
from src.core.config import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

def create_stripe_plans():
    plans = [
        {
            "name": "Basic Plan",
            "description": "Perfect for individual users",
            "price": 999,  # $9.99
            "interval": "month"
        },
        {
            "name": "Pro Plan",
            "description": "For power users and small businesses",
            "price": 1999,  # $19.99
            "interval": "month"
        },
        {
            "name": "Enterprise Plan",
            "description": "For large organizations",
            "price": 19900,  # $199.00
            "interval": "year"
        }
    ]

    for plan in plans:
        # Создать продукт
        product = stripe.Product.create(
            name=plan["name"],
            description=plan["description"],
        )

        # Создать цену
        price = stripe.Price.create(
            product=product.id,
            unit_amount=plan["price"],
            currency="usd",
            recurring={"interval": plan["interval"]},
        )

        print(f"Created: {plan['name']}")
        print(f"Product ID: {product.id}")
        print(f"Price ID: {price.id}")
        print("-" * 50)

if __name__ == "__main__":
    create_stripe_plans()