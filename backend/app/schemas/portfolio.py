from pydantic import BaseModel

class Investment(BaseModel):
    name: str
    value: float
    percentage: float
