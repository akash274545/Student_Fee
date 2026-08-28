
# Student Fee and Document Upload Management System

A full-stack web application for managing student information, fee details, profiles, and document uploads.

## Features

- Student registration and authentication
- Student profile management
- Student fee management
- Document upload and management
- Secure backend API
- MongoDB database integration
- React-based frontend
- REST API communication using Axios

## Technologies Used

### Frontend
- React.js
- Axios
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- PDFKit
- CORS
- dotenv

## Project Structure

```text
Student_Fee/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend-new/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md
````

## How to Run the Project

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Student_Fee
```

### 2. Backend Setup

Open a terminal inside the backend folder:

```bash
cd backend
npm install
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### 3. MongoDB Configuration

Create a `.env` file inside the `backend` folder.

Add your MongoDB connection details according to your local configuration.

> Do not upload the `.env` file to GitHub.

### 4. Frontend Setup

Open another terminal:

```bash
cd frontend-new
npm install
npm start
```

The frontend runs on:

```text
http://localhost:3000
```

## Environment Variables

The backend uses environment variables for sensitive configuration.

The `.env` file is intentionally excluded from GitHub using `.gitignore`.

## Important

The following files/folders are not uploaded to GitHub:

* `node_modules/`
* `.env`
* uploaded student documents
* `.zip` files
* screenshots
* React production build files

## Project Status

The project is currently running successfully with:

* React frontend
* Node.js/Express backend
* MongoDB database

## Author

Akash Narayankar


