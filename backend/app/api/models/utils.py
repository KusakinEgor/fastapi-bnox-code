from __future__ import annotations

import uuid
from datetime import datetime
from typing import Optional
import enum

from sqlalchemy import (
    String,
    Text,
    DateTime,
    JSON,
    Enum as SAEnum,
    Integer,
    ForeignKey,
    Boolean,
)
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship


def uuid_pk() -> Mapped[uuid.UUID]:
    """
    Generates a primary key column for PostgreSQL UUID fields.
    Usage: id: Mapped[uuid.UUID] = uuid_pk()
    """
    return mapped_column(
        PG_UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False,
    )


def utcnow() -> datetime:
    """
    Standard UTC timestamp for default DateTime columns.
    """
    return datetime.utcnow()
