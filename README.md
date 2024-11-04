# Comments App

## Overview
Comments App is a full-stack web application designed for posting and managing comments. It features a frontend built using React and a backend API developed with NestJS. The comments posted by users are saved in a relational database (PostgreSQL), allowing for persistence and easy data retrieval.

The backend API serves as the main interface to handle comment data, and the frontend provides a clean, responsive user interface for users to interact with. The entire stack is containerized using Docker to simplify deployment and development.

## Features
- **Add Comments**: Users can add comments to an image or post, specifying their username, email, and optional homepage.
- **Validation**: The form validates input fields to ensure proper data entry (e.g., email format, required fields).
- **Sanitized HTML**: The text field for comments sanitizes HTML input, only allowing safe tags (like `<i>`, `<strong>`, `<code>`, `<a>`).
- **HTML Validation**: Ensures that HTML tags are well-formed and properly closed.
- **Database Persistence**: Comments, along with the user's details, are stored in a PostgreSQL database.
- **Admin Interface**: PgAdmin4 is provided for database administration.

## Technology Stack
- **Frontend**: React
- **Backend**: NestJS
- **Database**: PostgreSQL
- **Admin Interface**: PgAdmin4
- **Containerization**: Docker & Docker Compose

## Prerequisites
- **Docker** and **Docker Compose** should be installed on your machine.

---

## Project Structure
```plaintext
/ - Root
│
├── /comments-app-api - NestJS backend API
│ 
├── /comments-app-frontend - React frontend application
│ 
└── docker-compose.yml - Docker Compose configuration
```

---

## Getting Started

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd comments-app
```

### Step 2: Set Up Environment Variables
Create a `.env` file in the `comments-app-api` directory with the following content:
```env
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=comments_db
```

### Step 3: Build and Start the Project Using Docker
Navigate to the project root and run the following command:
```bash
docker-compose up --build
```

This command will:
- Build and start the backend API (NestJS) at `http://localhost:5001`
- Launch the PostgreSQL database on port `5432`
- Run PgAdmin4 for database management at `http://localhost:8001`

### Step 4: Access the Services
- **Frontend Application**: (Assuming the frontend is set up to run on port 3000)
    - Navigate to `http://localhost:3000` to interact with the app.
- **Backend API**: Access the API at `http://localhost:5001`.
- **PgAdmin4**: Access PgAdmin4 at `http://localhost:8001`.
    - Login using `user@domain.com` as the email and `postgres` as the password.
    - Configure PgAdmin4 to connect to your PostgreSQL instance on `host: postgres` and `port: 5432`.
---
## Swagger Documentation
### The API is documented using Swagger, and the documentation can be accessed at:
-  `http://localhost:5001/api`
---
