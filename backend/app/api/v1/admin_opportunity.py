from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.dependency import get_db
from app.models.opportunity import Opportunity, OpportunityStatus
from app.api.deps.auth import require_admin
from app.schemas.opportunity import OpportunityRead, RejectionInput
from typing import List, Optional
from app.services import opportunity_service

router = APIRouter(prefix="/opportunities", tags=["Admin: Opportunities"], dependencies=[Depends(require_admin)])

@router.get("/", response_model=List[OpportunityRead])
def get_opportunities_by_status(
    status: Optional[OpportunityStatus] = Query(None),
    db: Session = Depends(get_db),
    _ = Depends(require_admin)
):
    query = db.query(Opportunity)
    if status:
        query = query.filter(Opportunity.status == status)
    return query.order_by(Opportunity.id.desc()).all()

@router.post("/{opportunity_id}/accept")
def accept_opportunity(opportunity_id: int, db: Session = Depends(get_db), _=Depends(require_admin)):
    opportunity = db.query(Opportunity).get(opportunity_id)
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    opportunity.status = OpportunityStatus.accepted
    db.commit()
    return {"message": "Opportunity accepted"}

@router.post("/{opportunity_id}/reject")
def reject_opportunity(
    opportunity_id: int,
    input: RejectionInput,
    db: Session = Depends(get_db),
    _: str = Depends(require_admin)
):
    return opportunity_service.reject_opportunity_with_reason(
        db, opportunity_id, input.reason, input.lesson
    )
