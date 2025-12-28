from __future__ import annotations

from datetime import datetime
from typing import Optional, List
from uuid import UUID
from enum import Enum as PyEnum

from sqlalchemy import (
    String,
    Text,
    Boolean,
    DateTime,
    ForeignKey,
    Enum as SAEnum,
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

class Language(PyEnum):
    PYTHON = "python"
    JAVASCRIPT = "javascript"

class Project(Base):
    __tablename__ = "projects"

    id: Mapped[UUID] = uuid_pk()

    owner_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    title: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    description: Mapped[Optional[str]] = mapped_column(Text)

    language: Mapped[Language] = mapped_column(
        SAEnum(Language, name="language_enum"),
        nullable=False,
    )

    # Current version code project
    code: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    is_public: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
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

    # Relationships
    owner: Mapped["User"] = relationship(
        back_populates="projects",
        lazy="joined",
    )

    versions: Mapped[List["ProjectVersion"]] = relationship(
        back_populates="project",
        cascade="all, delete-orphan",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return f"<Project id={self.id} title={self.title!r}>"

class ProjectVersion(Base):
    __tablename__ = "project_versions"

    id: Mapped[UUID] = uuid_pk()

    project_id: Mapped[UUID] = mapped_column(
        ForeignKey("projects.id", ondelete="CASCADE"),
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

    # Relationship
    project: Mapped[Project] = relationship(
        back_populates="versions",
        lazy="joined",
    )

    def __repr__(self) -> str:
        return f"<ProjectVersion id={self.id} project_id={self.project_id}>"
