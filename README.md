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

## Start full stack
```
docker-compose up --build
```

Once the containers are up, the app should be seen as below:
- Frontend: http://localhost:3000  
-  Backend: http://localhost:8000/docs


## Demo Admin 
```
email: admin@gmail.com
password: Admin@123
```

---

## Testing


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

The Manual Test cases PDF can be found in Berkshire Investment - **Berkshire_Investment_Test_Case.pdf**
https://github.com/Mukhil-Padmanabhan/bh-investment-funnel/blob/main/Berkshire_Investment_Test_Case.pdf

Lighthouse Report is as shown below:

![Screenshot 2025-05-22 at 17 08 27](https://github.com/user-attachments/assets/d230f36b-13c3-4a0e-b266-b1653fe0f3e8)


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


- [ ] Add more unit tests with coverage on frontend and backend.
- [ ] Export analytics (top ideas, registered users, etc.).
- [ ] Email confirmation for registration.
- [ ] CI/CD pipeline for build + deploy (GH Actions or Railway).
- [ ] In-app Real time notifications.
- [ ] Slack webhook for new submissions.
- [ ] Multi admin support with activity logs.
- [ ] 2FA for admin login.
- [ ] Login with Google for users.
- [ ] Feedback box for end users to explain their reasoning

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

## Review Questions

1. **Technical choices: What influenced your decision on the specific tools used?**

Next.js 15 App Router allowed me to do file-based routing, server-side rendering and client-side interactivity which made it a great fit for a hybrid interactive/content driven platform. 

Backend: [FastAPI] was the obvious choice for  it gives a fast, modern, Pythonic API (based on standard Python type hints) along built-in features like validations, caching and etc., out of the box so I could focus more on writing business logic. 

Database: I went ahead with [PostgreSQL 15], because one word - Reliability. 

Auth: JWT based auth with bcrypt password hashing and secure token storage in localStorage are implemented, so as not to over complicate and keep things simple yet secured.

DevOps: Docker Compose helps to easily orchestrate services (Postgres, Redis, frontend, backend) locally and CI/CD.

Caching & Rate Limiting: Redis + slowapi stopped the abuse and so sped up the frontend.

2. **Feature prioritization: How did you come to the conviction a specific feature is valuable? What user persona did you hone in on and given what evidence?**

THe MVP was focused around a crowdsourced investment review funnel for 2 key personas:

- Casual Investors (guests or non-logged users):
Can browse, upvote, and see sectoral trends without logging in.

- Internal Investment Analysts/Admins:
Workflow to accept, reject ideas with tagging and rationale, learnings.

Features were prioritised according to:
Frequency of use (i.e. view opportunities vs submit new).

Risk mitigation first (auth + rate limiting), then analytics.

User delight next (modals, dark mode, search filtering), and

I wanted to answer questions, such as “What happens after rejection/approval? Where does an idea go?”
The initial belief was further reinforced by thinking in startup mode - “What is the smallest feature set that allows both of them to interact with ideas?”


3. **Feature functionality: What does the interactive feature do? How does it work? Was it built elegantly?**

The interactive core is the upvote + review loop:

- Users browse ideas, upvote if they like any and can submit their if they would like to.
- Admin will see a separate /admin panel with tabs (Pending, Accepted, Rejected). 
- Each submission is reviewable via a modal with full details. Admins can accept/reject with reason + lesson learned.

The public users can see the Accepted Ideas in Opportunities and Rejected with rejection reasoning Ideas in Rejections.

The logic is beautifully divided into:

- Shared models with minimum duplication (OpportunityStatus)
- Separate admin/public APIs for better access control

Reusuable cards, conditional buttons, modals. A lot of the basic UI building blocks that we use are abstracted and can even be generated with libraries Pretty much all.


4.**How did you deploy the page? What components and services did you use?**

Locally, the entire project is containerized with Docker Compose:

- Frontend: Next.js running on localhost:3000
- Backend: FastAPI on localhost:8000
- Redis: Used for caching
- Postgres: Used as the primary datastore

CI/CD is managed via GitHub Actions, which:
- Runs tests on every push to main

This setup is flexible enough to be deployed to Railway, Fly.io, or AWS ECS with minimal tweaks.

5. **Challenges and Learnings: What were the top challenges faced, and what did you learn from them?**

- One of the main challenges was orchestrating a clean, full-stack architecture that seamlessly connects user submissions, voting logic, and admin moderation—all while maintaining clear data flow and user access boundaries. Balancing interactivity with data integrity required careful API design and thoughtful frontend UX

- Another key challenge was ensuring that the admin panel had the right level of control without compromising the public user experience. Structuring access control securely, handling JWT-based authentication across client and server, and syncing frontend state with backend validation taught me the importance of both user roles and fallback handling.

- I also learned how vital it is to seed meaningful sample data early on—this makes testing logic and refining user flows much more effective.

Overall, this project deepened my understanding of modular backend design, authentication, and frontend state management in a real-world scenario.


6. **Improvement Propositions: Given more time, what improvements or additional features would you consider adding?**

Given more time, there are several meaningful features and enhancements I’d love to add to improve the platform's security, usability, and long-term value:

- Stronger test coverage
- Adding email verification and Google login would make signup both more secure and more convenient.
- Setting up a CI/CD pipeline (using GitHub Actions or Railway) would automate testing and deployment on every push.
- Real-time notifications and Slack webhooks for new submissions would help admins and reviewers stay updated instantly.
- Supporting multiple admins with activity logs would create transparency in who accepted or rejected what, and when.
- Enabling two-factor authentication (2FA) for admins would significantly improve protection for sensitive decisions.
- I’d add a feedback box for users to explain why they voted or submitted an idea, adding valuable context to each opportunity.

## License

MIT © 2025
