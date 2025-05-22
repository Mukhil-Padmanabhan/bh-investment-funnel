from sqlalchemy import Column, Integer, String, Float
from app.db.session import Base

class PortfolioItem(Base):
    __tablename__ = "portfolio"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    sector = Column(String, nullable=False)
    value = Column(Float, nullable=False)
