# Backend – Salesforce Accounts Dashboard

This is the backend component of the Salesforce Dashboard Application, responsible for user authentication, Salesforce integration, and secure account data retrieval. It is built with Node.js, Express, TypeScript, and Prisma ORM.

## Live Demo

- Frontend: [https://sdb-frontend.onrender.com](https://sdb-frontend.onrender.com)
- Backend: [https://sf-dashboard-backend.onrender.com](https://sf-dashboard-backend.onrender.com)

## Features

- Secure user registration and login with JWT-based authentication.
- Password hashing using bcrypt.
- Salesforce integration using jsforce to fetch Account records.
- Paginated API for fetching account data.
- PostgreSQL database (NeonDB) and accessed via Prisma ORM.
- CORS-enabled.

## Tech Stack

- **Runtime:** Node.js (TypeScript)
- **Framework:** Express.js
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Authentication:** JWT, bcrypt
- **Salesforce SDK:** jsforce

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma               # Prisma schema definition for DB models
├── src/
│   ├── middleware/
│   │   └── authMiddleware.ts       # JWT token authentication middleware
│   ├── routes/
│   │   ├── auth.ts                 # Handles /auth/login and /auth/register routes
│   │   └── dashboard.ts            # Protected route to fetch Salesforce accounts
│   ├── services/
│   │   ├── authService.ts          # Auth logic: validation, bcrypt, JWT generation
│   │   └── salesforceService.ts    # Salesforce integration using jsforce
│   └── app.ts                      # Main Express app entry point
├── .env                            # Environment variables (e.g., DB, JWT, Salesforce credentials)
├── package.json                    # Project metadata, dependencies, scripts
├── tsconfig.json                   # TypeScript compiler configuration
└── README.md                       # Project overview and setup guide

```
## Architecture Overview
```
Frontend (Vue + Pinia) → Axios → Express Backend
                          └── /auth/register -> Prisma (PostgreSQL)
                          └── /auth/login -> Prisma (PostgreSQL)
                          └── /dashboard - (JWT protected) -> Salesforce via jsforce                                     
```

- **Authentication**: Upon login, a JWT token is generated and returned to the frontend. This token is then used to protect routes such as `/dashboard` by verifying it in middleware (`authenticateToken`). Passwords are hashed using `bcrypt` before storage and compared securely during login.
  
- **Salesforce Integration**: The backend connects to Salesforce using the jsforce library. A service layer handles login using credentials and fetches Account records using `sobject('Account').find()`.

- **ORM Layer**: Prisma provides schema-driven database access, managing models and queries without writing actual SQL which might be error prone.

- **Environment Config**: Sensitive values such as JWT secret, DB credentials, and Salesforce credentials are securely stored in `.env` files and never exposed.

## Endpoints

### `POST /auth/register`
Registers a new user with email and password.

### `POST /auth/login`
Authenticates user credentials and returns a signed JWT token.

### `GET /dashboard`
Returns Salesforce account data (paginated). Requires a valid JWT token in the `Authorization` header.

## Deployment (Local)

1. **Clone the repository**

```bash
git clone repoURL
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory and populate it using the `.env.example` template:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your_jwt_secret
SALESFORCE_LOGIN_URL=https://login.salesforce.com
SALESFORCE_USERNAME=your_salesforce_username
SALESFORCE_PASSWORD=your_password
SALESFORCE_TOKEN=your_token
```

4. **Push Prisma schema & generate client**

```bash
npx prisma generate
npx prisma db push
```

5. **Run the server in dev mode**

```bash
npm run dev
```

## Deployment (Render)

1. Push code to GitHub
2. Create a new **WEB Service** on Render

```bash
npm run build
npm start
```

## Issues Faced

CORS Config: Initially, the frontend application was unable to communicate with the backend due to CORS (Cross-Origin Resource Sharing) issues. Despite the backend being live and accessible, the browser blocked requests coming from the frontend origin. After investigating the network errors and understanding how CORS works, resolved the issue by explicitly enabling CORS. 
This allowed cross-origin access between the frontend and backend running on different domains during local development and in production.

## Note
Current CSS doesn't support dark mode.
