# 🏛 Berkshire Investment Funnel

A full-stack, LLM-powered investment tracking and vetting platform inspired by Berkshire-style decision making. Users can explore, submit, upvote, or reject investment opportunities, with sectoral insights, voting logic, and admin controls—all running on a FastAPI + Next.js + Docker stack.

---

## ✨ Features

📊 **Portfolio Dashboard** — Visual breakdown of holdings by sector, total value, and investment types.
💡 **Opportunities Explorer** — View and upvote promising ideas with filters, modals, and dynamic voting state.
📝 **Submit Ideas** — Submit new opportunities with metadata like sector, type, and return potential.
❌ **Rejections List** — Browse previously rejected opportunities with reason codes and lessons learned.
🔐 **Auth System** — JWT-based login/register with upvote locking to prevent duplicate voting.
🔄 **Rate Limiting & Caching** — Powered by Redis and slowapi for performance and security.
⚙️ **Dockerized Setup** — Runs locally and in production with Postgres, Redis, and both frontend/backend containers.
🌙 **Dark Mode & Animations** — Beautiful UI with Framer Motion, ShadCN components, and theme toggle.
✅ **Unit + E2E Tested** — Frontend tested with Playwright & React Testing Library.

---

## 📦 Tech Stack

| Layer      | Tech                                                   |
|------------|--------------------------------------------------------|
| Frontend   | Next.js 15 App Router, TailwindCSS, shadcn/ui, Framer Motion |
| Backend    | FastAPI, Pydantic v2, SQLAlchemy, Uvicorn, SlowAPI     |
| Database   | PostgreSQL 15                                          |
| Auth       | JWT, bcrypt, Pydantic validation                       |
| Caching    | Redis + FastAPI Cache 2                                |
| DevOps     | Docker, Docker Compose, .env support                   |
| Testing    | React Testing Library, Playwright                      |

---

## 🚀 Local Development

bash
# Clone the repo
git clone https://github.com/your-username/berkshire-investment-funnel.git
cd berkshire-investment-funnel

# Start full stack
docker-compose up --build

Frontend: http://localhost:3000  
Backend: http://localhost:8000/docs

---

## ⚙️ Project Structure

.
├── backend
│   ├── app/                   # FastAPI app
│   ├── scripts/init_db.py     # Seeds demo data (opportunities, rejections)
│   ├── requirements.txt
│   ├── start.sh               # Wait-for-DB + seed + run Uvicorn
│   └── Dockerfile
├── frontend
│   ├── src/app/               # Next.js App Router routes
│   ├── components/            # Reusable shadcn UI + domain components
│   ├── lib/api.ts             # Axios wrapper with JWT token
│   └── Dockerfile
├── docker-compose.yml
└── README.md

---

## 📊 Environment Variables

### backend/.env.prod
DATABASE_URL=postgresql://berkshire_user:secretpass@berkshire-db:5432/berkshire
REDIS_URL=redis://berkshire-redis:6379
SECRET_KEY=super-secret-key

### frontend/.env.local (optional if using Docker)
NEXT_PUBLIC_API_URL=http://localhost:8000

---

## 🧪 Testing

bash
# Frontend unit tests
cd frontend
npm test

# E2E tests with Playwright
npx playwright test

---

## 🛡 Security Features

Rate limiting on sensitive endpoints
Token expiration with secure password hashing (bcrypt)
Upvote protection (no duplicate voting per user)
Optional user registration required for vote interaction
Auto-detection of login state (frontend state + token)

---

## 🔧 TODO / Roadmap

[ ] Admin panel (FastAPI Admin or custom)
[ ] Role-based access (read-only guest, contributor, admin)
[ ] Export analytics (top ideas, registered users, etc.)
[ ] Email confirmation for registration
[ ] CI/CD pipeline for build + deploy (GH Actions or Railway)
[ ] LLM-powered validation for idea quality (RAG assistant)

---

## 📸 Demo

![Screenshot](https://your-screenshot-url.com/portfolio-dashboard.png)

---

## 🤝 Contribution

PRs and suggestions are welcome! Please open issues for bugs or features you'd like to see.

---

## 📝 License

MIT © 2025 [Your Name](https://github.com/your-username)