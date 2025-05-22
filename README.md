#  Berkshire Investment Funnel

Berkshire Investment Funnel is a full-stack platform designed to crowdsource and evaluate investment ideas just like how seasoned investors review opportunities before making high-conviction decisions.
Users can browse, submit, and upvote investment ideas based on their potential, sector, and expected returns. Once submitted, ideas appear in a centralized dashboard for admins, who can review and either accept or reject them. If rejected, the admin can also add a reason and a lesson learned, which are shared publicly to help others understand the decision-making process.
The platform promotes transparency, collaborative judgment, and structured thinking around investing whether you're an enthusiast, a startup scout, or just love analyzing bold ideas.

---

##  Features

- **Portfolio Dashboard** — Visual breakdown of holdings by sector, total value, and investment types.
- **Opportunities Explorer** — View and upvote promising ideas with filters, modals, and dynamic voting state.
- **Submit Ideas** — Submit new opportunities with metadata like sector, type, and return potential.
- **Rejections List** — Browse previously rejected opportunities with reason codes and lessons learned.
- **Auth System** — JWT-based login/register with upvote locking to prevent duplicate voting.
- **Rate Limiting & Caching** — Powered by Redis and slowapi for performance and security.
- **Dockerized Setup** — Runs locally and in production with Postgres, Redis, and both frontend/backend containers.
- **Dark Mode & Animations** — Beautiful UI with Framer Motion, ShadCN components, and theme toggle.
- **Unit + E2E Tested** — Frontend tested with Playwright & React Testing Library.
- **Admin Panel** - To Accept or Reject Opportunities.
- **Role-based access** - Loggedin user, Guest user and Admin user

---

## Tech Stack

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

## Clone the repo
```
git clone https://github.com/your-username/berkshire-investment-funnel.git
cd berkshire-investment-funnel
```
## Start full stack
```
docker-compose up --build
```

Once the containers are up, the app should be seen as below:
Frontend: http://localhost:3000  
Backend: http://localhost:8000/docs


## Demo Admin 
```
email: admin@gmail.com
password: Admin@123
```

## Environment Variables

### backend/.env.prod
```
DATABASE_URL=postgresql://berkshire_user:secretpass@berkshire-db:5432/berkshire
REDIS_URL=redis://berkshire-redis:6379
ENV=prod
```
### frontend/.env.local (optional if using Docker)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🧪 Testing


# Frontend unit tests
```
cd frontend
npm run test
```

![Sample Coverage of some components](https://github.com/user-attachments/assets/99cef372-a992-480c-8ca5-ddfcbea72509)

# E2E tests with Playwright
```
npx playwright test
```

![Report of E2E Tests](https://github.com/user-attachments/assets/09ae4952-12aa-4189-80d3-4579fc428c05)

---

## Security Features

- Rate limiting on sensitive endpoints
- Token expiration with secure password hashing (bcrypt)
- Upvote protection (no duplicate voting per user)
- Optional user registration required for vote interaction
- Auto-detection of login state (frontend state + token)
- Auto Summarizer of the idea on insert

---

## TODO / Roadmap / Future Improvements


[ ] Add more unit tests with coverage on frontend and backend.
[ ] Export analytics (top ideas, registered users, etc.).
[ ] Email confirmation for registration.
[ ] CI/CD pipeline for build + deploy (GH Actions or Railway).
[ ] In-app Real time notifications.
[ ] Slack webhook for new submissions.
[ ] Multi admin support with activity logs.
[ ] 2FA for admin login.
[ ] Login with Google for users.
[ ] Feedback box for end users to explain their reasoning

---

## Demo

<img width="1289" alt="Screenshot 2025-05-21 at 17 36 06" src="https://github.com/user-attachments/assets/d14ef65a-de23-4ee3-9044-e279ec6967e5" />
<img width="1232" alt="Screenshot 2025-05-21 at 17 35 49" src="https://github.com/user-attachments/assets/efd11a62-0fa4-48f6-99df-5d1efda6874f" />
<img width="1256" alt="Screenshot 2025-05-21 at 17 34 53" src="https://github.com/user-attachments/assets/907907be-0c9a-460e-84ee-41558feba62b" />
<img width="1262" alt="Screenshot 2025-05-21 at 17 34 02" src="https://github.com/user-attachments/assets/8eaa3601-a888-4de1-b53d-f74f1d8a4543" />
<img width="1328" alt="Screenshot 2025-05-21 at 17 33 56" src="https://github.com/user-attachments/assets/f2d81c26-9752-4436-a165-0869f0a7df58" />
<img width="1279" alt="Screenshot 2025-05-21 at 17 33 49" src="https://github.com/user-attachments/assets/470ca40c-1382-473f-861f-e68bdb4512cd" />
<img width="1303" alt="Screenshot 2025-05-21 at 17 33 40" src="https://github.com/user-attachments/assets/4402a760-dc9a-4e5a-ae62-67c34dfaf425" />


---

## Contribution

PRs and suggestions are welcome! Please open issues for bugs or features you'd like to see.

---

## License

MIT © 2025
