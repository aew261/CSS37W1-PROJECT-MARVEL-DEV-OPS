# Software Product Management Plan – Res Hub

## Team Members & Roles (Marvel DevOps)

| Role | Name | Responsibilities |
|------|------|------------------|
| **Project Manager** | Sinethemba Sitwayi | Overall coordination, schedule tracking, stakeholder communication, final report compilation, meeting logs |
| **System Designer** | Dennis Tshepho Makua | Architectural design (React + Node.js + Supabase), database schema, UML diagrams, technology stack decisions, design rationale |
| **Frontend Developer** | Sibahle Mhlongo | Build UI with **React JS** and **CSS**, implement wireframes into components, client‑side state management, responsive design, connect to backend APIs |
| **Developer** | Yabanathi Mangala | Backend development with **Node.js** and **Supabase Edge Functions**, database integration, **Supabase Auth** (WSU email verification), review submission logic |
| **Developer** | Siphiwo Masilo | Backend development (maintenance reports, admin moderation tools), **Supabase Row Level Security (RLS)** policies, security, POPIA compliance |

> **Note:** Both Yabanathi and Siphiwo work together on backend tasks; they split work as needed.

---

## Revised Project Timeline

| Milestone | Tasks | Deadline |
|-----------|-------|----------|
| **Phase 1 – Product Vision & Prototyping** | Product vision document, wireframes, management plan, meeting logs, GitHub setup | **Completed** |
| **Phase 2 – Requirements & Design** | Functional/non-functional requirements, architectural diagrams, database schema, design rationale | **April** |
| **Phase 3 – Development (Semester 2)** | Frontend + backend implementation, testing, deployment | To be defined (start May) |
| **Final Submission** | Complete report, working prototype, GitHub code freeze | |

### Phase 1 Catch‑up Internal Deadlines

| Task | Assigned To | Internal Deadline |
|------|-------------|-------------------|
| GitHub repository setup + structure | Sinethemba (PM) | Completed |
| Product vision document (`product_vision.md`) | Sibahle + Sinethemba | Completed |
| Wireframes + `wireframe_description.md` | Yabanathi + Siphiwo | Completed |
| Software management plan (`software_management_plan.md`) | Dennis | 12 April |
| Meeting logs (`meeting_notes.md`) | All (compiled by Sinethemba) | Ongoing (backdate first entry to March) |
| Final Phase 1 review & push | Sinethemba | completed |

### Phase 2 Deadlines (Requirements & Design)

| Task | Assigned To | Deadline |
|------|-------------|----------|
| Functional requirements document | Yabanathi + Siphiwo | April |
| Non-functional & domain requirements | Dennis + Sinethemba | April |
| Use case diagrams & user stories | All (lead by Dennis) | April |
| Architectural diagrams (component, deployment) | Dennis | April |
| Database schema finalisation | Yabanathi | April |
| Design rationale document | Dennis + Sinethemba | April |
| Compile Phase 2 report | Sinethemba | April |

---

## Risk Management Plan

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|------------|--------|----------------------|
| **Missed deadline due to poor coordination** | Medium | High | Weekly check‑ins (every Friday via WhatsApp/Meet); PM sends reminders 2 days before each deadline. |
| **Technical issues (Git conflicts, lost code)** | Medium | Medium | Use feature branches and pull requests; commit at least once per session; always pull before pushing. |
| **Unclear requirements from stakeholders** | Low | High | Conduct at least 2 interviews with students and SRC members; document all feedback in meeting logs. |
| **Team member unavailability** | Low | Medium | Cross‑train: frontend and backend developers pair‑work; PM can step in for documentation. |
| **GitHub structure not followed** | Low | Low | Instructor will review; use the provided folder template (README, docs/, etc.) from Phase 1 PDF. |
| **Data privacy / POPIA compliance** | Medium | High | Siphiwo researches POPIA; all user data encrypted; reviews can be anonymous; admin access logged. |

---

## Technology Stack

| Layer | Technology | Justification |
|-------|------------|----------------|
| **Frontend** | React JS, CSS | React provides component‑based UI development, efficient state management, and seamless integration with backend APIs. CSS for custom styling. |
| **Backend** | Node.js + Supabase Edge Functions | Node.js offers a fast, scalable JavaScript runtime. Supabase Edge Functions allow serverless, low‑latency execution close to users, removing the need for a separate Python/Django server. |
| **Database** | Supabase (PostgreSQL) | Supabase provides a fully managed PostgreSQL database with real‑time capabilities, built‑in API, and easy scalability. |
| **Authentication** | Supabase Auth | Handles user registration, login, email verification (WSU email), and session management out‑of‑the‑box with Row Level Security (RLS) for data protection. |
| **Version Control** | Git + GitHub | Industry standard; enables branch management, pull requests, issue tracking, and instructor access. |
| **Hosting (future)** | Vercel / Netlify (frontend) + Supabase (backend) | Vercel/Netlify for static React hosting; Supabase already hosts database and edge functions. |
| **Wireframing** | Figma (or hand‑drawn sketches) | Easy to collaborate; exports to PNG for `docs/wireframes/`. |
---

## Version History

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 12 April 2026 | 1.0 | Yabanathi & Siphiwo | Initial management plan created for Phase 1 |
| 12 April 2026 | 1.1 | Sinethemba | Updated task assignments and timeline for catch‑up |
| 12 April 2026 | 1.2 | Dennis | Aligned roles with React/Node.js/Supabase stack; added Phase 2 dates |
