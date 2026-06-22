# InkSphere Backend

A RESTful Blogging Platform Backend built using Node.js, Express.js, MongoDB, JWT Authentication, and Cloudinary image uploads.

## Features

### Authentication

* User Registration
* User Login
* User Logout
* JWT Authentication using HTTP-only Cookies
* Password Hashing with bcrypt

### User Management

* Get User Profile
* Update Profile
* Upload Profile Picture
* View Other User Profiles
* User Bio Support

### Blog Management

* Create Blog
* Update Blog
* Delete Blog
* Get All Blogs
* Get Single Blog
* Get Blogs by User
* Get Latest Blogs
* Blog Categories

### Social Features

* Like / Unlike Blogs
* Comment on Blogs
* Delete Comments
* Bookmark Blogs
* View Saved Bookmarks

### Search

* Search Blogs by Title
* Search Blogs by Content
* Search Authors

### Security

* JWT Authentication
* Helmet Security Middleware
* Password Hashing (bcrypt)
* Input Validation
* Rate Limiting
* Protected Routes

### Media Uploads

* Cloudinary Integration
* Multer File Uploads
* Blog Cover Images
* Profile Pictures

### Testing

* Jest
* Supertest
* API Endpoint Testing

---

# Tech Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB

## Authentication

* JSON Web Token (JWT)
* Cookie Parser
* bcrypt

## Media Storage

* Cloudinary
* Multer

## Validation

* Express Validator

## Security

* Helmet
* Express Rate Limit

## Logging & Optimization

* Morgan
* Compression

## Testing

* Jest
* Supertest

---

# Project Structure

```text
backend
│
├── src
│   │
│   ├── Controllers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── blogController.js
│   │
│   ├── DB
│   │   └── db.js
│   │
│   ├── Middleware
│   │   ├── auth.middleware.js
│   │   ├── upload.middleware.js
│   │   ├── login.rate.limiter.js
│   │   ├── register.rate.limiter.js
│   │   └── comment.rate.limiter.js
│   │
│   ├── Model
│   │   ├── userSchema.js
│   │   ├── BlogSchema.js
│   │   └── commentSchema.js
│   │
│   ├── Routes
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   └── blog.routes.js
│   │
│   ├── Validator
│   │   ├── auth.validation.js
│   │   └── validation.error.js
│   │
│   ├── Utils
│   │   └── cloudinaryUpload.js
│   │
│   ├── config
│   │   └── cloudinary.js
│   │
│   └── app.js
│
├── server.js
├── .env
├── .env.example
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

------

# Installation

Clone the repository

```bash
git clone https://github.com/your-username/inksphere-backend.git
cd inksphere-backend
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

```env

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```

---

# Running the Server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

Server URL:

```text
http://localhost:3000
```

---

# API Endpoints

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| POST   | /api/auth/logout   |

---

## User

| Method | Endpoint                 |
| ------ | ------------------------ |
| GET    | /api/user/profile        |
| PUT    | /api/user/updateprofile  |
| PUT    | /api/user/upload-profile |
| GET    | /api/user/profilepicture |
| GET    | /api/user/profile/:id    |

---

## Blogs

| Method | Endpoint                          |
| ------ | --------------------------------- |
| POST   | /api/blog/create                  |
| GET    | /api/blog/blogs                   |
| GET    | /api/blog/blog/:id                |
| PUT    | /api/blog/updateblog/:id          |
| DELETE | /api/blog/blogdelete/:id          |
| GET    | /api/blog/blogsonprofile/:id      |
| GET    | /api/blog/blog/latestblog         |
| GET    | /api/blog/blog/category/:category |

---

## Likes

| Method | Endpoint                        |
| ------ | ------------------------------- |
| POST   | /api/blog/blog/like/:blogId     |
| GET    | /api/blog/blog/bloglike/:blogId |

---

## Comments

| Method | Endpoint                              |
| ------ | ------------------------------------- |
| POST   | /api/blog/blog/comment/:blogId        |
| GET    | /api/blog/blog/allcomment/:blogId     |
| DELETE | /api/blog/blog/comment/dlt/:commentId |

---

## Bookmarks

| Method | Endpoint                           |
| ------ | ---------------------------------- |
| PUT    | /api/blog/blog/bookmark/:blogId    |
| GET    | /api/blog/blog/allbookmark/:blogId |

---

## Search

| Method | Endpoint                                   |
| ------ | ------------------------------------------ |
| GET    | /api/blog/blog/search/search?query=keyword |

---

# Security Features

* JWT Authentication
* HTTP-only Cookies
* Password Hashing using bcrypt
* Helmet Security Middleware
* Request Validation
* Rate Limiting
* Protected Routes

---

# Testing

Run all tests:

```bash
npm test
```

Run a specific file:

```bash
npm test auth.test.js
```

```bash
npm test blog.test.js
```

```bash
npm test user.test.js
```

---

