from pydantic import BaseModel
from typing import Optional

class OpportunityCreate(BaseModel):
    title: str
    description: str
    type: Optional[str] = None
    return_potential: Optional[str] = None
    sector: Optional[str] = None


class OpportunityRead(BaseModel):
    id: int
    title: str
    description: str
    type: Optional[str] = None  
    return_potential: Optional[str] = None 
    sector: Optional[str] = None
    summary: Optional[str] = None
    sector_confidence: Optional[str] = None
    verdict: Optional[str] = None
    rejection_reason: Optional[str] = None
    lesson: Optional[str] = None
    upvotes: int
    has_voted: bool = False
    status: str

    class Config:
        from_attributes = True 
    
class RejectionInput(BaseModel):
    reason: Optional[str] = None
    lesson: Optional[str] = None
