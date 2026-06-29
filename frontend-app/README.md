# InkSphere Frontend

## Core Features

### Authentication

* Register
* Login
* Logout

### User Features

* User Profile
* Edit Profile
* Profile Picture
* User Bio
* View User's Published Blogs

### Blog Features

* Create Blog
* Edit Blog
* Delete Blog
* View Blog
* Rich Text Editor
* Blog Cover Image

### Categories

* Tech
* Travel
* Lifestyle
* Education

### Engagement

* Like Blog
* Comment
* Bookmark

### Discovery

* Search Blogs
* Trending Blogs
* Category Filter

## Additional Features

### Advanced Rich Text Editor

* Bold Formatting
* Italic Formatting
* Strikethrough
* Heading Support (H1, H2, H3)
* Ordered Lists
* Unordered Lists
* Blockquotes
* Code Blocks
* Image Embedding via URL
* Hyperlink Support
* Table Support

### Blog Experience

* Reading Time Estimation
* Blog View Counter
* Detailed Blog Page
* Blog Description Support
* Cover Image Preview

### UI & UX

* Fully Responsive Design
* Mobile-Friendly Layout
* Sticky Navigation Bar
* React Select Category Dropdown
* Search Dropdown Interface
* Clean Blog Cards
* Modern Form Design
* Custom Error Handling
* Interactive Buttons & Icons

### Navigation

* React Router Based Navigation
* Dynamic Blog Routes
* Edit Blog Routes
* Profile Routes
* Trending Page
* Not Found (404) Page

## Tech Stack

* React.js
* Vite
* React Router DOM
* React Icons
* React Select
* TipTap Editor
* CSS3

## Project Structure

frontend-app/
├── src/
│ ├── components/
│ │ ├── BlogCard.jsx
│ │ ├── Categories.jsx
│ │ ├── Footer.jsx
│ │ ├── HeroSection.jsx
│ │ ├── Navbar.jsx
│ │ └── RichTextEditor.jsx
│ │
│ ├── data/
│ │ └── blogs.js
│ │
│ ├── pages/
│ │ ├── BlogDetails.jsx
│ │ ├── CreateBlog.jsx
│ │ ├── EditBlog.jsx
│ │ ├── Home.jsx
│ │ ├── Login.jsx
│ │ ├── NotFound.jsx
│ │ ├── Profile.jsx
│ │ ├── Register.jsx
│ │ └── Trending.jsx
│ │
│ ├── routes/
│ │ └── AppRoutes.jsx
│ │
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx