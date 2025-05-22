from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.dependency import get_db
from app.schemas.opportunity import OpportunityRead
from app.models.opportunity import OpportunityStatus, Opportunity
from app.api.deps.auth import require_admin
from app.services import opportunity_service
from typing import List
from pydantic import BaseModel

class RejectionReason(BaseModel):
    reason: str
    lesson: str

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/opportunities", response_model=List[OpportunityRead])
def list_pending(db: Session = Depends(get_db), _: str = Depends(require_admin)):
    return db.query(Opportunity).filter(Opportunity.status == OpportunityStatus.pending or Opportunity.status == OpportunityStatus.accepted).all()

@router.post("/opportunities/{id}/accept", response_model=OpportunityRead)
def accept_opportunity(id: int, db: Session = Depends(get_db), _: str = Depends(require_admin)):
    return opportunity_service.update_opportunity_status(db, id, OpportunityStatus.accepted)

@router.post("/opportunities/{id}/reject", response_model=OpportunityRead)
def reject_opportunity(
    id: int,
    payload: RejectionReason,
    db: Session = Depends(get_db),
    _: str = Depends(require_admin)
):
    return opportunity_service.update_opportunity_status(
        db, id, OpportunityStatus.rejected,
        reason=payload.reason,
        lesson=payload.lesson
    )
