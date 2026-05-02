System Architecture Overview

Architectural Style

Layered Architecture

Architecture Description

The ResHub system follows a layered architecture consisting of three main layers:

* Presentation Layer (Frontend): A web-based user interface that allows students to register, log in, browse residences, submit reviews, and rate services.
* Application Layer (Backend): Handles business logic such as user authentication, review submission, rating calculations, and residence management.
* Data Layer (Database): Responsible for storing user data, residence information, reviews, and ratings.

This structure separates concerns, making the system easier to manage, test, and extend.

Alternative Options Considered

* Monolithic Architecture: Easier to develop initially but becomes difficult to maintain and scale as the application grows.
* Microservices Architecture: Highly scalable and flexible, but too complex for a small team and unnecessary for the current scope of the project.

Trade-offs

* The layered architecture provides simplicity, modularity, and ease of development.
* It allows team members to work on different layers independently.
* However, it may not scale as efficiently as microservices in the future.
* There may also be slight performance overhead due to communication between layers.

Potential Architectural Risks

* Tight coupling between layers if boundaries are not properly maintained.
* Increased latency if communication between layers is not optimized.
* Risk of poor data validation if responsibilities are not clearly defined.

High-Level Architecture Diagram

Frontend (React.js)
    ↓
Backend (SUPABASE EDGE FUNCTION REST API)
    ↓
Database (PostgreSQL)

Diagram Explanation

* The frontend allows users (students) to interact with the system through a web interface.
* The backend processes requests, applies business logic, and communicates with the database.
* The database stores all persistent data including user accounts, residence listings, reviews, and ratings.

The frontend communicates with the backend via HTTP requests, and the backend interacts with the database to store and retrieve information.
