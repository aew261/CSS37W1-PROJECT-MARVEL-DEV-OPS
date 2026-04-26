# Requirements Mapping - Res Hub

This document maps the features of **Res Hub** to functional and non‑functional requirements. It ensures that every feature is backed by clear, testable criteria.


## Legend

| Abbreviation | Meaning |
|--------------|---------|
| **FR** | Functional Requirement |
| **NFR** | Non-Functional Requirement |
| **DR** | Domain Requirement (where applicable) |


## Feature 1.1: User Registration & Authentication

| ID | Requirement Type | Description |
|----|------------------|-------------|
| FR‑01 | Functional | Students shall register using their WSU email address for verification. |
| FR‑02 | Functional | System shall send a confirmation email with a verification link. |
| FR‑03 | Functional | Users shall log in securely with email and password. |
| FR‑04 | Functional | Users shall be able to reset their password via email. |
| FR‑05 | Functional | Users shall manage their profile (name, student number, faculty, year). |
| NFR‑01 | Non‑functional | Passwords must be hashed using a strong algorithm (e.g., bcrypt). |
| NFR‑02 | Non‑functional | Role‑based access control (student vs admin) must be enforced. |
| DR‑01 | Domain | Must comply with POPIA regarding storage of personal data. |


## Feature 1.2: Residence Review System

| ID | Requirement Type | Description |
|----|------------------|-------------|
| FR‑06 | Functional | A verified student may submit a structured review for a residence they have lived in. |
| FR‑07 | Functional | Each review must include an overall rating (1–5 stars) and written feedback. |
| FR‑08 | Functional | Reviews must capture the date of stay to ensure relevance. |
| FR‑09 | Functional | Students may edit or delete their own reviews. |
| FR‑10 | Functional | The system shall prevent duplicate reviews by the same student for the same residence. |
| NFR‑03 | Non‑functional | Review submission must complete within 3 seconds under normal load. |
| NFR‑04 | Non‑functional | All reviews must be stored securely and not editable by anyone except the author or admin. |


## Feature 1.3: Landlord Rating System

| ID | Requirement Type | Description |
|----|------------------|-------------|
| FR‑11 | Functional | Students may rate landlords separately from the residence on criteria: responsiveness, professionalism, fairness, maintenance handling. |
| FR‑12 | Functional | Landlord ratings shall include an optional written feedback field. |
| FR‑13 | Functional | Aggregated landlord ratings (averages per criterion) shall be displayed on the residence page. |
| NFR‑05 | Non‑functional | Landlord ratings must be anonymised when displayed if the reviewer chooses anonymity. |


## Feature 1.4: Residence Rating Breakdown

| ID | Requirement Type | Description |
|----|------------------|-------------|
| FR‑14 | Functional | Each review must provide multi‑criteria ratings: infrastructure, maintenance, safety, cleanliness, accessibility. |
| FR‑15 | Functional | The system shall calculate and display average ratings per category for each residence. |
| FR‑16 | Functional | An overall average score shall be automatically derived from category averages. |
| NFR‑06 | Non‑functional | Rating calculations must update in real‑time when a new review is submitted. |


## Feature 1.5: Residence Search & Discovery

| ID | Requirement Type | Description |
|----|------------------|-------------|
| FR‑17 | Functional | Users shall search residences by name, location, or price range. |
| FR‑18 | Functional | Users shall filter results by rating, safety score, and distance from campus. |
| FR‑19 | Functional | Users shall sort results by highest rated, most reviewed, or recently added. |
| NFR‑07 | Non‑functional | Search results shall load within 2 seconds. |
| NFR‑08 | Non‑functional | The system must support at least 100 concurrent search users. |


## Feature 1.6: Review Transparency & Verification

| ID | Requirement Type | Description |
|----|------------------|-------------|
| FR‑20 | Functional | Only email‑verified students may post reviews. |
| FR‑21 | Functional | Verified reviewers shall display a badge/indicator next to their name. |
| FR‑22 | Functional | Each residence listing shall show the number of reviewers. |
| FR‑23 | Functional | Users may flag a review as inappropriate or fake. |
| NFR‑09 | Non‑functional | Flagged reviews must be hidden from public view until moderated. |


## Feature 2.1: Aggregated Insights Dashboard

| ID | Requirement Type | Description |
|----|------------------|-------------|
| FR‑24 | Functional | Each residence page shall show summary statistics: average rating, common complaints (from keyword analysis), most mentioned positives. |
| FR‑25 | Functional | Optional: visual charts (bar/radar) for category ratings. |
| NFR‑10 | Non‑functional | Dashboard data must refresh within 5 minutes of new reviews. |


## Feature 2.2: Favorites / Bookmarking

| ID | Requirement Type | Description |
|----|------------------|-------------|
| FR‑26 | Functional | Authenticated users may save residences to a “Favorites” list. |
| FR‑27 | Functional | Users can access their saved residences from a dedicated page. |
| NFR‑11 | Non‑functional | Favorites must persist across user sessions. |


## Feature 2.3: Notifications System

| ID | Requirement Type | Description |
|----|------------------|-------------|
| FR‑28 | Functional | Users shall receive notifications when a review they wrote is liked or replied to. |
| FR‑29 | Functional | Users shall receive notifications when a new review is posted on a saved residence (optional). |
| NFR‑12 | Non‑functional | Notifications must be delivered within 1 minute of the triggering event. |


## Feature 2.4: Admin Panel

| ID | Requirement Type | Description |
|----|------------------|-------------|
| FR‑30 | Functional | Admin shall manage users (approve, suspend, delete). |
| FR‑31 | Functional | Admin shall moderate reviews and reports (hide/delete inappropriate content). |
| FR‑32 | Functional | Admin shall manage residence listings (add, edit, remove). |
| FR‑33 | Functional | Admin shall view all flagged content and user‑reported issues. |
| FR‑34 | Functional | Admin may issue warnings or sanctions to users who violate guidelines. |
| NFR‑13 | Non‑functional | All admin actions must be logged for audit purposes. |


## Cross‑cutting Non‑Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR‑14 | Security | All data transmitted between client and server must be encrypted (HTTPS). |
| NFR‑15 | Security | Row Level Security (RLS) in Supabase shall enforce that users see only their own data where appropriate. |
| NFR‑16 | Usability | The interface shall be mobile‑responsive and follow WCAG 2.1 AA guidelines for accessibility. |
| NFR‑17 | Performance | The system shall handle 1000 concurrent users without degradation. |
| NFR‑18 | Reliability | Automated daily backups must be performed; recovery point objective (RPO) ≤ 24 hours. |
| NFR‑19 | Reliability | System uptime target: 99.5% during campus hours (8am–10pm). |

---

## Traceability Summary

| Feature | Functional Requirements | Non‑Functional Requirements |
|---------|------------------------|-----------------------------|
| 1.1 User Registration | FR‑01 to FR‑05 | NFR‑01, NFR‑02, DR‑01 |
| 1.2 Review System | FR‑06 to FR‑10 | NFR‑03, NFR‑04 |
| 1.3 Landlord Rating | FR‑11 to FR‑13 | NFR‑05 |
| 1.4 Rating Breakdown | FR‑14 to FR‑16 | NFR‑06 |
| 1.5 Search & Discovery | FR‑17 to FR‑19 | NFR‑07, NFR‑08 |
| 1.6 Transparency & Verification | FR‑20 to FR‑23 | NFR‑09 |
| 2.1 Insights Dashboard | FR‑24, FR‑25 | NFR‑10 |
| 2.2 Favorites | FR‑26, FR‑27 | NFR‑11 |
| 2.3 Notifications | FR‑28, FR‑29 | NFR‑12 |
| 2.4 Admin Panel | FR‑30 to FR‑34 | NFR‑13 |
| Cross‑cutting | – | NFR‑14 to NFR‑19 |
