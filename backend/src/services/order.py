from typing import Optional, List
import uuid

from src.utils.unitofwork import IUnitOfWork
from src.schemas.order import OrderCreate, OrderOut
from src.models.order import OrderStatus


class OrderService:
    async def create_order(
            self,
            uow: IUnitOfWork,
            order_data: OrderCreate,
            user_id: uuid.UUID
    ) -> OrderOut:
        """Создать заказ"""
        async with uow:
            # Проверить асхану
            canteen = await uow.canteens.get(order_data.canteen_id)
            if not canteen or not canteen.is_active:
                raise ValueError("Canteen not found or inactive")

            # Проверить меню
            if order_data.food_id:
                food = await uow.menu.get(order_data.food_id)
                if not food or not food.available or food.canteen_id != canteen.id:
                    raise ValueError("Food item not available")
                if food.type.value != "food":
                    raise ValueError("Item is not food")

            if order_data.drink_id:
                drink = await uow.menu.get(order_data.drink_id)
                if not drink or not drink.available or drink.canteen_id != canteen.id:
                    raise ValueError("Drink item not available")
                if drink.type.value != "drink":
                    raise ValueError("Item is not drink")

            # Создать заказ
            order_dict = {
                "user_id": user_id,
                "canteen_id": order_data.canteen_id,
                "food_id": order_data.food_id,
                "drink_id": order_data.drink_id,
                "status": OrderStatus.NEW
            }

            order = await uow.orders.add_one(order_dict)
            await uow.commit()
            await uow.session.refresh(order)

            return OrderOut.model_validate(order)

    async def get_user_orders(
            self,
            uow: IUnitOfWork,
            user_id: uuid.UUID
    ) -> List[OrderOut]:
        """Получить заказы пользователя"""
        async with uow:
            orders = await uow.orders.get_user_orders(user_id)
            return [OrderOut.model_validate(order) for order in orders]

    async def get_canteen_orders(
            self,
            uow: IUnitOfWork,
            canteen_id: uuid.UUID,
            status: Optional[OrderStatus] = None
    ) -> List[OrderOut]:
        """Получить заказы асханы"""
        async with uow:
            orders = await uow.orders.get_canteen_orders(canteen_id, status=status)
            return [OrderOut.model_validate(order) for order in orders]

    async def update_order_status(
            self,
            uow: IUnitOfWork,
            order_id: uuid.UUID,
            status: OrderStatus
    ) -> Optional[OrderOut]:
        """Обновить статус заказа"""
        async with uow:
            order = await uow.orders.update_order_status(order_id, status)
            if not order:
                return None
            await uow.commit()
            await uow.session.refresh(order)
            return OrderOut.model_validate(order)
