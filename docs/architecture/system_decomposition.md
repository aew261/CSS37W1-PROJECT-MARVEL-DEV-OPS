# System Decomposition – Res Hub

## Overview

The Res Hub system is decomposed into **seven core modules** and **two supporting modules**. Each module has a well‑defined responsibility and interacts with others through the backend API (Supabase Edge Functions). This decomposition follows the layered architecture (presentation, application, data) and ensures separation of concerns.

---

## Module 1: User Management

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Handle all user account operations and profiles |
| **Related Features** | 1.1 (Registration & Authentication) |
| **Components** | Registration, login, logout, password reset, profile editing |
| **Dependencies** | Supabase Auth (external), User table in Supabase DB |
| **Exposed API** | `/auth/register`, `/auth/login`, `/auth/reset-password`, `/user/profile` |

**Responsibilities:**
- Register new students using WSU email (institutional email verification)
- Authenticate users (email + hashed password)
- Manage JWT sessions
- Allow password reset via email
- Allow users to view and edit their profile (name, student number, faculty, year)

**Data stored:** `users` table (id, email, name, student_number, faculty, year, role, created_at)

---

## Module 2: Residence Management

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Manage residence listings (admin) and provide public residence data |
| **Related Features** | 2.4 (Admin Panel), 1.2–1.4 (Reviews & Ratings) |
| **Components** | CRUD operations for residences, residence detail view |
| **Dependencies** | Residences table, Admin role check |
| **Exposed API** | `GET /residences`, `GET /residences/{id}`, `POST /admin/residences`, `PUT /admin/residences/{id}`, `DELETE /admin/residences/{id}` |

**Responsibilities:**
- Admin: add, edit, delete residence listings
- Admin: upload basic information (name, address, distance, photos)
- Public: view list of all residences (with aggregated ratings)
- Public: view detailed residence page (including reviews, category ratings, landlord ratings)

**Data stored:** `residences` table (id, name, address, distance_km, contact_info, official_photo, created_by, created_at)

---

## Module 3: Review Management

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Allow verified students to submit, edit, and delete reviews |
| **Related Features** | 1.2 (Residence Review System) |
| **Components** | Submit review, edit review, delete review, prevent duplicates |
| **Dependencies** | User Management (authentication), Residence Management, Reviews table |
| **Exposed API** | `POST /reviews`, `PUT /reviews/{id}`, `DELETE /reviews/{id}`, `GET /residences/{id}/reviews` |

**Responsibilities:**
- Allow a verified student to submit a review for a residence they lived in
- Each review includes: overall rating, written feedback, date of stay, category ratings
- Prevent duplicate review (one per student per residence)
- Allow author to edit or delete their own review
- Retrieve all reviews for a given residence

**Data stored:** `reviews` table (id, user_id, residence_id, overall_rating, written_feedback, stay_date, created_at, updated_at)

---

## Module 4: Rating Engine

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Calculate and expose aggregated ratings for residences and landlords |
| **Related Features** | 1.3 (Landlord Rating System), 1.4 (Residence Rating Breakdown) |
| **Components** | Category rating aggregator, landlord rating aggregator, overall score calculator |
| **Dependencies** | Review Management (reads review data), Landlord ratings table |
| **Exposed API** | `GET /residences/{id}/ratings` (returns category averages, landlord averages, overall) |

**Responsibilities:**
- Calculate average category ratings per residence (infrastructure, maintenance, safety, cleanliness, accessibility)
- Calculate average landlord ratings per residence (responsiveness, professionalism, fairness, maintenance handling)
- Compute overall average score (from category averages or overall rating)
- Update aggregates automatically when a new review or landlord rating is submitted

**Data stored:** Aggregated values can be computed on‑the‑fly or stored in a materialized view; separate `landlord_ratings` table (review_id, landlord_criteria scores, written_feedback_optional)

---

## Module 5: Search & Discovery

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Enable users to find residences based on various criteria |
| **Related Features** | 1.5 (Residence Search & Discovery) |
| **Components** | Search by keyword, filter by rating/distance/safety, sort by popularity |
| **Dependencies** | Residence Management (reads residences), Rating Engine (reads aggregated data) |
| **Exposed API** | `GET /search?q=...&min_rating=...&max_distance=...&sort=rating` |

**Responsibilities:**
- Search residences by name, location, or price range
- Filter results by minimum rating, safety score (derived from category ratings), and distance from campus
- Sort results by highest rated, most reviewed, or recently added
- Return paginated results for performance

**Algorithmic approach:** SQL queries with `WHERE` and `ORDER BY` clauses; optionally use PostgreSQL full‑text search for name/location matching.

---

## Module 6: Favorites (Bookmarking)

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Allow students to save residences for later comparison |
| **Related Features** | 2.2 (Favorites / Bookmarking) |
| **Components** | Add to favorites, remove from favorites, list favorites |
| **Dependencies** | User Management, Residence Management, Favorites table |
| **Exposed API** | `POST /favorites`, `DELETE /favorites/{residence_id}`, `GET /favorites` |

**Responsibilities:**
- Authenticated user can save a residence to their personal favorites list
- User can remove a residence from favorites
- User can view all saved residences (with details and ratings)
- Favorites persist across sessions

**Data stored:** `favorites` table (user_id, residence_id, created_at)

---

## Module 7: Notifications

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Send email alerts to users about relevant events |
| **Related Features** | 2.3 (Notifications System) |
| **Components** | Review interaction notification, new review on saved residence notification |
| **Dependencies** | User Management (email addresses), Review Management (triggers), Favorites (to know which residences to watch) |
| **Exposed API** | (Internal event listeners, not a public API) |

**Responsibilities:**
- Send an email to a user when their review receives a like or reply (if implemented)
- Send an email to a user when a new review is posted on a residence they have saved
- Use Supabase Edge Functions triggered by database webhooks or schedule

**Note:** Maintenance status notifications were removed (Feature 1.5 removed).

---

## Module 8: Admin Panel

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Provide administrative tools to moderate content and manage the platform |
| **Related Features** | 2.4 (Admin Panel) |
| **Components** | Review moderation, user management, residence management, flag monitoring |
| **Dependencies** | All other modules (through admin‑privileged API endpoints) |
| **Exposed API** | Admin‑only endpoints (e.g., `/admin/reviews/flag`, `/admin/users/{id}/suspend`) |

**Responsibilities:**
- **Review moderation:** View flagged reviews, hide or delete inappropriate ones
- **User management:** Approve, suspend, or delete user accounts
- **Residence management:** Add, edit, or remove residence listings (same as Module 2, but admin‑only)
- **Flag monitoring:** View all content flagged by users and take action
- **Issue warnings/sanctions:** Send warnings to users who violate guidelines

**Access control:** Only users with `role = 'admin'` (stored in `users` table) can call these endpoints.

---

## Module 9: Transparency & Verification Support

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Ensure reviews come from genuine students and provide trust indicators |
| **Related Features** | 1.6 (Review Transparency & Verification) |
| **Components** | Email verification, verified badge, flag/report |
| **Dependencies** | User Management, Review Management, Flag table |
| **Exposed API** | Embed into other modules (not standalone) |

**Responsibilities:**
- **Email verification:** After registration, send a verification link; only verified users can post reviews
- **Verified badge:** Display a badge next to reviewer names
- **Flag/report:** Allow users to flag a review as inappropriate; store flag in `flags` table for admin review
- **Display number of reviewers:** Show count of distinct reviewers for each residence

**Data stored:** `flags` table (id, review_id, user_id, reason, created_at, status)

---

## Summary of Modules and Responsibilities

| Module | Primary Responsibility | API Endpoints (examples) |
|--------|------------------------|---------------------------|
| User Management | Registration, auth, profiles | `/auth/*`, `/user/*` |
| Residence Management | CRUD for residences (admin) + public views | `/residences/*` |
| Review Management | Submit, edit, delete reviews | `/reviews/*` |
| Rating Engine | Aggregate and expose ratings | `/residences/{id}/ratings` |
| Search & Discovery | Find and filter residences | `/search` |
| Favorites | Save/bookmark residences | `/favorites` |
| Notifications | Send email alerts | (internal) |
| Admin Panel | Moderate content, manage users | `/admin/*` |
| Transparency & Verification | Email verification, flags, badges | (embedded) |

---

## Next Steps

- we will use this decomposition to create the UML component diagram.
- we will also refer to this when designing the database schema and Edge Functions.
- we can use the API endpoints listed above to plan frontend state management.

All modules will be implemented using **React (frontend)**, **Node.js + Supabase Edge Functions (backend)**, and **Supabase PostgreSQL (database)**.
