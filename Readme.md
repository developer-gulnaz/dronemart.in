Project: Dronemart – E-commerce platform for drones and accessories
Stack: Node.js, Express.js, MongoDB, Mongoose, HTML/CSS/JS, Bootstrap

1. Overview

Dronemart is a full-stack e-commerce application designed to support:

User account management, wishlist, cart, orders

Session-based authentication

Admin dashboard for managing users and products

Product catalog and checkout system

This README is structured for future development and easy extension.

2. Features
2.1 User

Register / Login / Logout (session-based)

View / Edit profile

Change password

Manage wishlist & cart

View orders

Delete account

2.2 Admin

Dashboard with user and order statistics

View recent users

Manage users (CRUD)

Manage products (CRUD)

Protected admin-only routes

2.3 Product / Order Management

Products: CRUD operations

Orders: View user orders

Wishlist & Cart: Add, remove, view items

3. Architecture
backend/
├─ config/
│  └─ db.js               # MongoDB connection
├─ controllers/
│  ├─ authController.js
│  └─ userController.js
├─ models/
│  ├─ User.js
│  ├─ Order.js
│  └─ ... other models
├─ routes/
│  ├─ auth.js
│  └─ users.js
├─ server.js              # Express server setup
public/
├─ index.html
├─ login.html
├─ account.html
└─ ... other frontend assets
admin/
├─ index.html
└─ ... admin frontend

4. API Endpoints (RESTful)
4.1 Authentication
Method	Endpoint	Description
POST	/api/auth/userLogin	Login user
POST	/api/auth/logout	Logout user
4.2 Users
Method	Endpoint	Description
GET	/api/users/profile	Get logged-in user profile
PUT	/api/users/me	Update profile
DELETE	/api/users/me	Delete account
GET	/api/users/recent	Admin: recent users
GET	/api/users/dashboard/status	Admin: dashboard stats
4.3 Products
Method	Endpoint	Description
GET	/api/products	Fetch all products
POST	/api/products	Add new product
PUT	/api/products/:id	Update product
DELETE	/api/products/:id	Delete product
4.4 Orders
Method	Endpoint	Description
GET	/api/orders/my	Get logged-in user orders
4.5 Cart & Wishlist
Method	Endpoint	Description
GET	/api/cart	Get cart
POST	/api/cart	Add to cart
DELETE	/api/cart/:id	Remove from cart
GET	/api/wishlist	Get wishlist
POST	/api/wishlist	Add to wishlist
DELETE	/api/wishlist/:id	Remove from wishlist
5. Setup

Clone repository:

git clone <repo-url>


Install backend dependencies:

cd backend
npm install


Create .env file:

MONGO_URI=<mongodb_connection_string>
SESSION_SECRET=<your_session_secret>
PORT=5000


Run server:

node server.js
# or with nodemon
nodemon server.js


Open frontend pages via browser or local server.

6. Session & Auth Notes

Uses express-session; cookies with credentials: "include" required for frontend fetch calls.

Admin routes require adminId in session.

User routes require userId in session.

Session cookie config:

cookie: {
  httpOnly: true,
  maxAge: 24*60*60*1000, // 1 day
  sameSite: 'lax',
  secure: false
}


7. Future Development / Updates

 Payment gateway integration

 Advanced order management & status updates

 Admin analytics charts

 Unit tests and API testing