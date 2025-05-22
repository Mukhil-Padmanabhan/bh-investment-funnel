from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from app.services.rejection_service import get_all_rejections
from app.db.dependency import get_db
from app.schemas.opportunity import OpportunityCreate, OpportunityRead
from fastapi_cache.decorator import cache

router = APIRouter()

@cache(expire=60) 
@router.get("/", response_model=List[OpportunityRead])
def list_rejections(db: Session = Depends(get_db)):
    return get_all_rejections(db)
