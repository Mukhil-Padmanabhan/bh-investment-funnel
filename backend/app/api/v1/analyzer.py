from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.dependency import get_db
from app.services.analysis_service import analyze_opportunity

router = APIRouter()

@router.post("/{opportunity_id}")
def analyze(opportunity_id: int, db: Session = Depends(get_db)):
    result = analyze_opportunity(opportunity_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    return result
