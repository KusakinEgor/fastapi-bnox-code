from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.api.models.users import User, AuthProvider
from app.api.core.security import get_password_hash, verify_password, create_access_token
from .schemas import UserCreate, UserLogin
import uuid
from datetime import datetime

async def register_user(user_data: UserCreate, db: AsyncSession):
    email_check = select(User).where(User.email == user_data.email)
    answer = await db.execute(email_check)

    if answer.scalar_one_or_none():
        return None
    
    new_user = User(
        id=uuid.uuid4(),
        username=user_data.username,
        email=user_data.email,
        avatar_url=None,
        auth_provider=AuthProvider.LOCAL,
        oauth_id=None,
        created_at=datetime.utcnow(),
        last_login=None,
        hashed_password=get_password_hash(user_data.password)
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user

async def authenticate_user(user_data: UserLogin, db: AsyncSession):
    email_check = select(User).where(User.email == user_data.email)
    answer = await db.execute(email_check)
    user = answer.scalar_one_or_none()

    if not user or not verify_password(user_data.password, user.hashed_password):
        return None
    
    token = create_access_token({"sub": str(user.id)})
    return token
