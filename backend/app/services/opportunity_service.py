from sqlalchemy.orm import Session
from app.models.opportunity import Opportunity
from app.schemas.opportunity import OpportunityCreate
from app.services.analysis_service import analyze_opportunity
from app.models.opportunity import OpportunityStatus
from app.models.opportunity_vote import OpportunityVote
from fastapi import Depends, HTTPException, status
from typing import Optional

def has_voted(db: Session, user_id: int, opportunity_id: int) -> bool:
    return db.query(OpportunityVote).filter_by(user_id=user_id, opportunity_id=opportunity_id).first() is not None

def upvote_opportunity(db: Session, user_id: int, opportunity_id: int):
    if has_voted(db, user_id, opportunity_id):
        return None  # already voted

    vote = OpportunityVote(user_id=user_id, opportunity_id=opportunity_id)
    db.add(vote)

    # update counter
    opportunity = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    opportunity.upvotes += 1
    db.commit()
    return opportunity

def unvote_opportunity(db: Session, user_id: int, opportunity_id: int):
    vote = db.query(OpportunityVote).filter_by(user_id=user_id, opportunity_id=opportunity_id).first()
    if not vote:
        return None  # no vote to remove

    db.delete(vote)
    opportunity = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    opportunity.upvotes -= 1
    db.commit()
    return opportunity

def get_all_opportunities(db: Session):
    return db.query(Opportunity).order_by(Opportunity.upvotes.desc()).all()

def create_opportunity(db: Session, payload: OpportunityCreate):
    opportunity = Opportunity(**payload.dict())
    db.add(opportunity)
    db.commit()
    db.refresh(opportunity)

    # This can be later put into a queue or something as the application grows
    analysis = analyze_opportunity(opportunity.id, db)
    if analysis:
        opportunity.summary = analysis.get("summary")
        opportunity.sector_confidence = str(analysis.get("sector_confidence", ""))
        opportunity.verdict = analysis.get("verdict")
        db.commit()

    return opportunity

def update_opportunity_status(
    db: Session,
    opportunity_id: int,
    status: OpportunityStatus,
    reason: str = None,
    lesson: str = None
):
    opportunity = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    opportunity.status = status
    opportunity.reason = reason
    opportunity.lesson = lesson
    db.commit()
    db.refresh(opportunity)
    return opportunity

def reject_opportunity_with_reason(db: Session, opportunity_id: int, rejection_reason: str, lesson: str):
    opportunity = db.query(Opportunity).get(opportunity_id)
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    opportunity.status = OpportunityStatus.rejected
    opportunity.rejection_reason = rejection_reason
    opportunity.lesson = lesson  # ✅ correct attribute name
    db.commit()
    db.refresh(opportunity)
    return opportunity