from sqlalchemy import Column, Integer, String, Enum as SqlEnum, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base
from enum import Enum

class OpportunityStatus(str, Enum):
    pending = "pending"
    accepted = "accepted"
    rejected = "rejected"

class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    upvotes = Column(Integer, default=0)
    type = Column(String)
    return_potential = Column(String)
    sector = Column(String, nullable=True)
    summary = Column(Text, nullable=True)
    sector_confidence = Column(String, nullable=True)
    verdict = Column(String, nullable=True)
    status = Column(SqlEnum(OpportunityStatus), default=OpportunityStatus.pending)

    rejection_reason = Column(Text, nullable=True)
    lesson = Column(Text, nullable=True)

