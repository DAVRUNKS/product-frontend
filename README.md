# Product Management App

A full-stack product management application built with React and a Flask REST API.

## Features

* User registration
* User login
* Token-based authentication
* Create products
* View products
* Edit products
* Delete products
* Responsive design for desktop, tablet, and mobile
* Protected product routes
* REST API integration

## Tech Stack

### Frontend

* React
* React Router
* JavaScript
* CSS
* Vite

### Backend

* Python
* Flask
* SQLite
* REST API
* Pytest

## Application Flow

```text
User
 ↓
React Frontend
 ↓
Flask REST API
 ↓
Authentication
 ↓
Database
 ↓
Products
```

## Authentication

Users can register and log in.

After successful login, the authentication token is stored in `localStorage` and used to access protected product functionality.

## Product Management

Authenticated users can:

1. Add a product
2. View products
3. Edit a product
4. Delete a product

## Responsive Design

The interface adapts to different screen sizes:

* Desktop → multi-column product layout
* Tablet → two-column layout
* Mobile → single-column layout

## Running the Project

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run using Vite.

### Backend

```bash
cd backend
pip install -r requirements.txt
python run.py
```

## API

The frontend communicates with the Flask backend through REST endpoints.

Example:

```text
POST /register
POST /login
GET  /products
POST /products
PUT  /products/<id>
DELETE /products/<id>
```

## Project Goal

This project demonstrates practical full-stack development skills including:

* React component development
* REST API integration
* Authentication
* CRUD operations
* Database interaction
* Responsive UI design
* Automated backend testing
* Frontend/backend integration

## Status

**Completed**

Built as a portfolio project demonstrating full-stack web development.
