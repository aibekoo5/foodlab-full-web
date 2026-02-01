from fastapi import APIRouter, Depends, HTTPException

from src.schemas.canteen import CanteenWithMenu
from src.services.canteen import CanteenService
from src.api.dependencies import UOWDep

router = APIRouter()


@router.get("/{qr_code}", response_model=CanteenWithMenu)
async def get_canteen_by_qr(
    qr_code: str,
    uow: UOWDep
):
    """Получить асхану по QR коду с меню"""
    canteen_service = CanteenService()
    canteen = await canteen_service.get_by_qr_code(uow, qr_code)
    if not canteen:
        raise HTTPException(status_code=404, detail="Canteen not found or inactive")
    return canteen

