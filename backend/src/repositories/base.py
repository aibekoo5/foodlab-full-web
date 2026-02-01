from abc import ABC, abstractmethod
from typing import Generic, TypeVar, Type, Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert, select, update
import uuid

ModelType = TypeVar("ModelType")


class AbstractRepository(ABC):
    @abstractmethod
    async def add_one(self, data: dict):
        raise NotImplementedError
    
    @abstractmethod
    async def find_all(self):
        raise NotImplementedError


class SQLAlchemyRepository(AbstractRepository, Generic[ModelType]):
    model = None

    def __init__(self, session: AsyncSession):
        self.session = session

    async def add_one(self, data: dict):
        """Add one record and return the created object"""
        db_obj = self.model(**data)
        self.session.add(db_obj)
        await self.session.flush()
        await self.session.refresh(db_obj)
        return db_obj

    async def edit_one(self, id: uuid.UUID, data: dict):
        """Update one record by id"""
        stmt = update(self.model).values(**data).filter_by(id=id).returning(self.model)
        res = await self.session.execute(stmt)
        return res.scalar_one_or_none()
    
    async def find_all(self):
        """Find all records"""
        stmt = select(self.model)
        res = await self.session.execute(stmt)
        return res.scalars().all()
    
    async def find_one(self, **filter_by):
        """Find one record by filters"""
        stmt = select(self.model).filter_by(**filter_by)
        res = await self.session.execute(stmt)
        return res.scalar_one_or_none()

    # Legacy methods for backward compatibility
    async def get(self, id: uuid.UUID) -> Optional[ModelType]:
        """Get one record by id"""
        return await self.find_one(id=id)

    async def get_multi(self, skip: int = 0, limit: int = 100) -> List[ModelType]:
        """Get multiple records with pagination"""
        stmt = select(self.model).offset(skip).limit(limit)
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def create(self, obj_in: dict) -> ModelType:
        """Create a new record (legacy method)"""
        return await self.add_one(obj_in)

    async def update(self, db_obj: ModelType, obj_in: dict) -> ModelType:
        """Update an existing object (legacy method)"""
        for field, value in obj_in.items():
            setattr(db_obj, field, value)
        await self.session.flush()
        await self.session.refresh(db_obj)
        return db_obj

    async def delete(self, id: uuid.UUID) -> bool:
        """Delete a record by id"""
        db_obj = await self.get(id)
        if db_obj:
            await self.session.delete(db_obj)
            await self.session.flush()
            return True
        return False