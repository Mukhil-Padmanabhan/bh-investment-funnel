import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

from app.db.session import engine, SessionLocal
from app.models.opportunity import Opportunity
from app.models.rejection import Rejection
from app.models.opportunity_vote import OpportunityVote
from app.models.portfolio import PortfolioItem
from app.models.user import User
from app.core.security import hash_password
from faker import Faker
import random

Opportunity.__table__.create(bind=engine, checkfirst=True)
User.__table__.create(bind=engine, checkfirst=True)
OpportunityVote.__table__.create(bind=engine, checkfirst=True)
PortfolioItem.__table__.create(bind=engine, checkfirst=True)

fake = Faker()
db = SessionLocal()

sectors = [
    "Technology", "Finance", "Healthcare", "Energy", "Retail",
    "Transportation", "Aerospace", "Consumer Goods"
]

sample_ideas = [
    ("Invest in OpenAI", "Due to its leadership in LLM innovation and enterprise AI services"),
    ("Acquire SpaceX shares", "Given its dominance in reusable launch tech and Starlink monetization"),
    ("Back Stripe", "For its strong fintech infrastructure and global B2B payment solutions"),
    ("Fund Moderna's mRNA platform", "As a hedge against future pandemics and global vaccine leadership"),
    ("Invest in Tesla Energy", "Because of growing solar and battery storage market share"),
]

if db.query(Opportunity).count() == 0:
    print("Seeding opportunities...")
    for i in range(30):
        if i < len(sample_ideas):
            title, description = sample_ideas[i]
        else:
            title = f"Idea {i+1}: {fake.company()}"
            description = f"{fake.catch_phrase()} in the {random.choice(sectors)} sector."

        sector = random.choice(sectors)
        confidence = round(random.uniform(0.6, 0.95), 2)
        verdict = "Promising with some risk" if confidence > 0.7 else "Needs deeper review"
        summary = fake.sentence(nb_words=12)

        db.add(Opportunity(
            title=title,
            description=description,
            upvotes=random.randint(0, 50),
            sector=sector,
            sector_confidence=str(confidence),
            verdict=verdict,
            summary=summary
        ))

    db.commit()
    
existing_admin = db.query(User).filter(User.email == "admin@gmail.com").first()

if not existing_admin:
    admin_user = User(
        email="admin@gmail.com",
        hashed_password=hash_password("Admin@123"),
        is_active=True,
        is_admin=True
    )
    db.add(admin_user)
    db.commit()
    print("Admin user created")
else:
    print("Admin already exists")

db.close()

portfolio_seed = [
    {"name": "Apple Inc.", "sector": "Technology", "value": 140_000_000},
    {"name": "Bank of America", "sector": "Finance", "value": 110_000_000},
    {"name": "Coca-Cola", "sector": "Consumer Goods", "value": 95_000_000},
    {"name": "Chevron Corp.", "sector": "Energy", "value": 88_000_000},
    {"name": "American Express", "sector": "Finance", "value": 75_000_000},
    {"name": "Kraft Heinz", "sector": "Consumer Goods", "value": 63_000_000},
    {"name": "Occidental Petroleum", "sector": "Energy", "value": 58_000_000},
    {"name": "Moody’s Corp.", "sector": "Finance", "value": 52_000_000},
    {"name": "HP Inc.", "sector": "Technology", "value": 44_000_000},
    {"name": "T-Mobile US", "sector": "Telecom", "value": 41_000_000},
    {"name": "Visa Inc.", "sector": "Finance", "value": 39_000_000},
    {"name": "BYD Company", "sector": "Automotive", "value": 36_000_000},
    {"name": "DaVita Inc.", "sector": "Healthcare", "value": 30_000_000},
    {"name": "Paramount Global", "sector": "Media", "value": 24_000_000},
    {"name": "Amazon.com", "sector": "E-Commerce", "value": 22_000_000},
    {"name": "Snowflake Inc.", "sector": "Technology", "value": 18_000_000},
    {"name": "Verisign", "sector": "Internet Infrastructure", "value": 14_000_000},
    {"name": "Charter Communications", "sector": "Telecom", "value": 13_000_000},
    {"name": "Mastercard", "sector": "Finance", "value": 12_000_000},
    {"name": "Johnson & Johnson", "sector": "Healthcare", "value": 11_000_000},
]

if db.query(PortfolioItem).count() == 0:
    print("Seeding portfolio holdings...")
    for entry in portfolio_seed:
        db.add(PortfolioItem(**entry))
    db.commit()
db.close()
print("DB seeding complete.")
