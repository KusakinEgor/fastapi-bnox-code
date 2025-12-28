from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID
from enum import Enum as PyEnum

from sqlalchemy import (
    ForeignKey,
    DateTime,
    Enum as SAEnum,
    JSON,
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.api.db.database import Base
from .utils import uuid_pk


def utcnow() -> datetime:
    """A single point of reference for the current time (UTC)."""
    return datetime.utcnow()

class ActivityType(PyEnum):
    CREATE_PROJECT = "create_project"
    UPDATE_PROJECT = "update_project"
    SHARE_CODE = "share_code"
    COMMENT = "comment"

class Activity(Base):
    __tablename__ = "activities"

    id: Mapped[UUID] = uuid_pk()
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    type: Mapped[ActivityType] = mapped_column(
        SAEnum(ActivityType, name="activity_type_enum"),
        nullable=False,
    )

    payload: Mapped[Optional[dict]] = mapped_column(
        JSON,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=utcnow,
        nullable=False,
    )

    user: Mapped["User"] = relationship(
        back_populates="activities",
        lazy="joined",
    )

    def __repr__(self) -> str:
        return f"<Activity id={self.id} type={self.type.value}>"
