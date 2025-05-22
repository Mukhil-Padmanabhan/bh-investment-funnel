from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List
from fastapi_cache.decorator import cache
from app.schemas.opportunity import OpportunityCreate, OpportunityRead
from app.services import opportunity_service
from app.api.deps.current_user import get_current_user
from app.models.user import User
from app.db.dependency import get_db
from app.services.auth import get_current_user_optional
from app.core.rate_limiter import limiter
from fastapi import Request

router = APIRouter()

@cache(expire=30) 
@router.get("/", response_model=List[OpportunityRead])
async def list_opportunities(
    request: Request, 
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user_optional)
):
    opportunities = opportunity_service.get_all_opportunities(db)
    if not opportunities:
        return [] 

    if current_user:
        voted_ids = set(vote.opportunity_id for vote in current_user.votes)
    else:
        voted_ids = set()

    results = []
    for opp in opportunities:
        opp_dict = OpportunityRead.from_orm(opp).dict()
        opp_dict["has_voted"] = opp.id in voted_ids
        results.append(opp_dict)

    return results

@router.post("/", response_model=OpportunityRead)
@limiter.limit("5/minute")
def create_opportunity(request: Request, payload: OpportunityCreate, db: Session = Depends(get_db)):
    return opportunity_service.create_opportunity(db, payload)

@router.post("/{opportunity_id}/upvote", response_model=OpportunityRead)
@limiter.limit("10/minute")
def upvote_opportunity(
    request: Request,
    opportunity_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    opportunity = opportunity_service.upvote_opportunity(db, current_user.id, opportunity_id)
    if not opportunity:
        raise HTTPException(status_code=400, detail="Already upvoted")
    return opportunity

@router.post("/{opportunity_id}/unvote", response_model=OpportunityRead)
def unvote_opportunity(
    opportunity_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    opportunity = opportunity_service.unvote_opportunity(db, current_user.id, opportunity_id)
    if not opportunity:
        raise HTTPException(status_code=400, detail="You haven’t voted yet")
    return opportunity

@router.get("/{opportunity_id}/has-voted")
def has_voted_opportunity(
    opportunity_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    voted = opportunity_service.has_voted(db, current_user.id, opportunity_id)
    return {"voted": voted}
