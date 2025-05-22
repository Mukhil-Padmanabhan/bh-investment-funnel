from transformers import pipeline
from app.models.opportunity import Opportunity
from sqlalchemy.orm import Session

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

SECTORS = [
    "Technology", "Finance", "Healthcare", "Energy", "Consumer Goods",
    "Transportation", "Aerospace", "Retail", "Entertainment", "Education"
]

def analyze_opportunity(opportunity_id: int, db: Session):
    opportunity: Opportunity = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    if not opportunity:
        return None

    desc = opportunity.description.strip()

    summary_result = summarizer(desc, max_length=60, min_length=20, do_sample=False)
    summary = summary_result[0]["summary_text"]

    classification = classifier(desc, SECTORS)
    sector = classification["labels"][0]
    confidence = round(classification["scores"][0], 2)

    verdict = "Promising with some risk" if confidence > 0.7 else "Needs deeper review"

    return {
        "summary": summary,
        "sector": sector,
        "sector_confidence": confidence,
        "verdict": verdict
    }
