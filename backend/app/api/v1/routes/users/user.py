from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from uuid import UUID

from app.api.db.database import get_db
from app.api.core.security import get_current_user
from app.api.models.users import User
from .schemas import UserOut, UserUpdate

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/profile", response_model=UserOut)
async def get_my_profile(
    current_user: User = Depends(get_current_user)
):
    return current_user

@router.patch("/profile", response_model=UserOut)
async def update_my_profile(
    data: UserUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if data.username is None:
        current_user.username = data.username
    if data.avatar_url is not None:
        current_user.avatar_url = data.avatar_url
    
    await db.commit()
    await db.refresh(current_user)
    return current_user

@router.get("/current")
async def get_current_user_profile(
    current_user: User = Depends(get_current_user)
):
    return {
        "name": current_user.username,
        "email": current_user.email,
    }

@router.get("/{user_id}", response_model=UserOut)
async def get_user_by_id(
    user_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    id_check = await db.execute(select(User).where(User.id == user_id))
    user = id_check.scalar_one_or_none()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user
    
