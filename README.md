# Roadmap.sh-URL-Shortening-Service-API

A simple and efficient URL shortening service built with Node.js and Express. Create short links, track click statistics, and manage your URLs through a RESTful API. This project is a practical implementation of the roadmap.sh URL Shortener project idea.

## Source of Project

This project is based on the "URL Shortening Service" project idea from [roadmap.sh](https://roadmap.sh/projects/url-shortening-service). The goal of the project is to build a RESTful API that allows users to shorten long URLs, manage them, and track their usage statistics.

## Project Status

This project is fully functional and includes user authentication, URL shortening, and management features. The development process has included building the core features and debugging issues, such as an authorization bug in the URL deletion endpoint.


## Features

* **User Authentication**: Secure user registration and login using JWT.
* **URL Shortening**: Create short, unique URLs for any long URL.
* **URL Management**: Update or delete your shortened URLs.
* **Click Tracking**: View statistics for your shortened URLs, including click counts.
* **API Documentation**: A comprehensive Swagger UI is available at `/api-docs` to test and explore the API.

## Technologies Used

* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose
* **Authentication**: JSON Web Tokens (JWT), bcryptjs for password hashing
* **API Documentation**: Swagger (OpenAPI)
* **Other Key Packages**:
    * `nanoid`: For generating unique short URL codes
    * `vanta-api`: For handling API features like filtering and pagination
    * `morgan`: For HTTP request logging
    * `cors`: For enabling Cross-Origin Resource Sharing
    * `dotenv`: For managing environment variables

## API Endpoints

### Authentication

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user. |
| `POST` | `/api/auth/` | Log in to get a JWT token. |

### URL Management

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/url/` | Create a new short URL. |
| `GET` | `/api/url/` | Get all URLs for the current user. |
| `GET` | `/api/url/{shortUrl}` | Redirect to the original URL. |
| `GET` | `/api/url/{shortUrl}/stats` | Get statistics for a short URL. |
| `PATCH` | `/api/url/{shortUrl}/manage` | Update a short URL. |
| `DELETE` | `/api/url/{shortUrl}/manage` | Delete a short URL. |

### User Management (Admin Only)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/users` | Get all users. |
| `GET` | `/api/users/:id` | Get a specific user. |
| `PATCH` | `/api/users/:id` | Update a user's information. |

## Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/amirs0b/Roadmap.sh-URL-Shortening-Service-API.git
    cd Roadmap.sh-URL-Shortening-Service-API
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    Create a `config.env` file in the root directory and add the following:

    ```
    PORT=5000
    DATABASE_URL=mongodb://localhost:27017/Url_ShortenerDb
    JWT_SECRET=your_jwt_secret
    ```

4.  **Run the application:**

    ```bash
    npm run dev
    ```

The server will start on `http://localhost:5000`.