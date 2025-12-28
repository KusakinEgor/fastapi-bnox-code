from __future__ import annotations

from datetime import datetime
from uuid import UUID
from enum import Enum as PyEnum

from sqlalchemy import DateTime, ForeignKey, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column

from app.api.db.database import Base
from .utils import uuid_pk


def utcnow() -> datetime:
    """A single point of reference for the current time (UTC)."""
    return datetime.utcnow()

class FriendshipStatus(PyEnum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    BLOCKED = "blocked"

class Friendship(Base):
    __tablename__ = "friendships"

    id: Mapped[UUID] = uuid_pk()

    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    friend_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    status: Mapped[FriendshipStatus] = mapped_column(
        SAEnum(FriendshipStatus, name="friendship_status_enum"),
        default=FriendshipStatus.PENDING,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=utcnow,
        nullable=False,
    )

    def __repr__(self) -> str:
        return (
            f"<Friendship id={self.id} user_id={self.user_id} "
            f"friend_id={self.friend_id} status={self.status.value}>"
        )
