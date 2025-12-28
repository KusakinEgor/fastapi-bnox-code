from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlalchemy import (
    String,
    ForeignKey,
    DateTime,
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


class EditorSettings(Base):
    __tablename__ = "editor_settings"

    id: Mapped[UUID] = uuid_pk()

    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    theme: Mapped[Optional[str]] = mapped_column(
        String(50),
        nullable=True,
    )

    font_size: Mapped[Optional[int]] = mapped_column(
        nullable=True,
    )

    keymap: Mapped[Optional[str]] = mapped_column(
        String(50),
        nullable=True,
    )

    custom_colors: Mapped[Optional[dict]] = mapped_column(
        JSON,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=utcnow,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=utcnow,
        onupdate=utcnow,
        nullable=False,
    )

    user: Mapped["User"] = relationship(
        back_populates="editor_settings",
        lazy="joined",
    )

    def __repr__(self) -> str:
        return f"<EditorSettings id={self.id} user_id={self.user_id}>"
