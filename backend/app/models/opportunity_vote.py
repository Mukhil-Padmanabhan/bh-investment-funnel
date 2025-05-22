from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from app.db.session import Base

class OpportunityVote(Base):
    __tablename__ = "opportunity_votes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    opportunity_id = Column(Integer, ForeignKey("opportunities.id"))

    __table_args__ = (
        UniqueConstraint("user_id", "opportunity_id", name="unique_user_vote"),
    )
