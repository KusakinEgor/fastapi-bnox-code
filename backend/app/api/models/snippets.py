from __future__ import annotations

from datetime import datetime
from uuid import UUID

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Text,
    Enum as SAEnum,
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.api.db.database import Base
from .utils import uuid_pk
from .projects import Language


def utcnow() -> datetime:
    """A single point of reference for the current time (UTC)."""
    return datetime.utcnow()

class Snippet(Base):
    __tablename__ = "snippets"

    id: Mapped[UUID] = uuid_pk()

    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    language: Mapped[Language] = mapped_column(
        SAEnum(Language, name="snippet_language_enum"),
        nullable=False,
    )

    code: Mapped[str] = mapped_column(
        Text,
        nullable=False,
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

    owner: Mapped["User"] = relationship(
        back_populates="snippets",
        lazy="joined",
    )

    def __repr__(self) -> str:
        return f"<Snippet id={self.id} language={self.language.value}>"
