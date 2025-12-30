from typing import Optional, List
import uuid

from src.utils.unitofwork import IUnitOfWork
from src.schemas.payment import PaymentCreate, PaymentOut
from src.models.payment import PaymentStatus, PaymentMethod


class PaymentService:
    async def create_kaspi_payment(
            self,
            uow: IUnitOfWork,
            payment_data: PaymentCreate
    ) -> PaymentOut:
        """Создать платеж через Kaspi"""
        async with uow:
            # Генерируем ссылку на оплату Kaspi
            # В реальном проекте здесь будет интеграция с Kaspi API
            payment_dict = {
                "user_id": payment_data.user_id,
                "amount": payment_data.amount,
                "method": payment_data.method,
                "status": PaymentStatus.PENDING
            }

            payment = await uow.payments.add_one(payment_dict)
            await uow.commit()
            
            # Генерируем payment_url после создания платежа (чтобы использовать payment.id)
            payment_url = f"https://kaspi.kz/pay/foodlab?payment_id={payment.id}"
            payment.payment_url = payment_url
            await uow.payments.update(payment, {"payment_url": payment_url})
            await uow.commit()
            await uow.session.refresh(payment)

            return PaymentOut.model_validate(payment)

    async def confirm_payment(
            self,
            uow: IUnitOfWork,
            payment_id: uuid.UUID
    ) -> Optional[PaymentOut]:
        """Подтвердить платеж (вызывается админом или через webhook)"""
        async with uow:
            payment = await uow.payments.update_payment_status(payment_id, PaymentStatus.PAID)
            if not payment:
                return None

            await uow.commit()
            await uow.session.refresh(payment)
            return PaymentOut.model_validate(payment)

    async def get_user_payments(
            self,
            uow: IUnitOfWork,
            user_id: uuid.UUID
    ) -> List[PaymentOut]:
        """Получить платежи пользователя"""
        async with uow:
            payments = await uow.payments.get_user_payments(user_id)
            return [PaymentOut.model_validate(p) for p in payments]

