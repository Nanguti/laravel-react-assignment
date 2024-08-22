# Installation and Running Instructions

This project is divided into two main parts:

1. **Backend**: A Laravel application serving the backend API.
2. **Frontend**: A React application serving the frontend.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (recommended version: LTS).
- **PHP**: Ensure you have PHP installed (recommended version: 8.x).
- **Composer**: PHP dependency manager.
- **MySQL**: Database for the Laravel application.
- **Git**: Version control system.

## Backend Installation and Setup

1. **Navigate to the `backend` directory**:

   ```bash
   cd backend
   ```

2. **Install PHP dependencies:**

   ```bash
   composer install
   ```

3. **Create and configure the `.env` file:**

   ```bash
   cp .env.example .env

   ```

- Edit the .env file to configure your database and other settings. Make sure to set the DB_DATABASE, DB_USERNAME, and DB_PASSWORD values according to your MySQL setup.

4. **Generate the application key:**

   ```bash
   php artisan key:generate

   ```

5. **Run migrations:**

   ```bash
   php artisan migrate
   ```

6. **Start the Laravel development server:**

   ```bash
   php artisan serve

   ```

- By default, the server will start on http://localhost:8000.

## Frontend Installation and Setup

1. **Navigate to the `frontend` directory**:

   ```bash
   cd frontend
   ```

2. **Install `Node.js` dependencies:**:

   ```bash
   npm install
   ```

3. **Start the React development server:**:

   ```bash
   npm run dev
   ```

- By default, the server will start on http://localhost:3000
