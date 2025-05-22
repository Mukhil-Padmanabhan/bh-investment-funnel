from sqlalchemy.orm import Session
from app.models.opportunity import Opportunity, OpportunityStatus

def get_all_rejections(db: Session):
    return db.query(Opportunity).filter(Opportunity.status == OpportunityStatus.rejected).all()
