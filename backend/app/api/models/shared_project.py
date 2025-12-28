from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlalchemy import (
    ForeignKey,
    DateTime,
    Text,
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

class SharedProject(Base):
    __tablename__ = "shared_projects"

    id: Mapped[UUID] = uuid_pk()

    project_id: Mapped[UUID] = mapped_column(
        ForeignKey("projects.id", ondelete="CASCADE"),
        nullable=False,
    )

    sender_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    recipient_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    message: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=utcnow,
        nullable=False,
    )

    project: Mapped["Project"] = relationship(
        lazy="joined",
    )

    sender: Mapped["User"] = relationship(
        foreign_keys=[sender_id],
        lazy="joined",
    )

    recipient: Mapped["User"] = relationship(
        foreign_keys=[recipient_id],
        lazy="joined",
    )

    def __repr__(self) -> str:
        return (
            f"<SharedProject id={self.id} "
            f"project_id={self.project_id} "
            f"from={self.sender_id} to={self.recipient_id}>"
        )
