from pydantic import BaseModel
from typing import Optional

class Rejection(BaseModel):
    id: int
    title: str
    reason: str
    reason_code: Optional[str] = None
    lesson: Optional[str] = None

    model_config = {
        "from_attributes": True 
    }
