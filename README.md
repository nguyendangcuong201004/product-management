# Product Management

A full-stack e-commerce web application built with Node.js and Express.js, using Server-Side Rendering (SSR) for the storefront and an admin panel for managing products, categories, accounts, roles, and settings. It also includes a real-time chat feature powered by Socket.io.

## Features

Client

- Product listing with search, filtering, pagination, and detailed product pages
- Shopping cart with quantity management and order checkout
- User registration, login, and password reset via email
- Real-time chat between users with Socket.io and chat rooms
- Global middleware for cart, user info, product categories, and settings on every page

Admin

- Dashboard with statistics
- Full CRUD for products, product categories, accounts, and roles
- Image upload to Cloudinary
- Authentication and role-based access control
- General settings management

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Runtime    | Node.js                             |
| Framework  | Express.js                          |
| Views      | Pug template engine                 |
| Database   | MongoDB (Mongoose ODM)              |
| Real-time  | Socket.io                           |
| File store | Cloudinary, Multer                  |
| Email      | Nodemailer                          |
| Deployment | Vercel (Serverless Functions)       |

## Architecture

```
.
├── index.js                  # Application entry point: Express app, Socket.io server
├── vercel.json               # Vercel deployment configuration
├── config/
│   ├── database.js           # MongoDB connection (Mongoose)
│   └── system.js             # System constants (admin route prefix)
├── routes/
│   ├── client/               # Storefront routes: home, products, cart, checkout,
│   │                         # user, chat, rooms-chat, search
│   └── admin/                # Admin panel routes: dashboard, auth, products,
│                             # categories, accounts, roles, settings
├── controllers/
│   ├── client/               # Request handlers for storefront features
│   └── admin/                # Request handlers for admin panel
├── models/                   # Mongoose schemas (Product, Cart, Order, Account,
│                             # Role, User, Chat, RoomsChat, ForgotPassword, ...)
├── middlewares/
│   ├── client/               # Category, cart, user, setting, auth middlewares
│   └── admin/                # Auth guard, Cloudinary upload middleware
├── validates/                # Request validation rules
├── helpers/                  # Utilities: tree builder, pagination, slug/slug
│                             # generation, email sender, Cloudinary upload
├── sockets/
│   └── client/               # Socket.io event handlers for chat
├── views/
│   ├── client/               # Pug templates for the storefront
│   └── admin/                # Pug templates for the admin panel
└── public/                   # Static assets: CSS, JS, images
```

Request flow:

```
Client request
    |
    v
Express app (index.js)
    |
    v
Routes --> Middlewares (auth, cart, category, setting) --> Validates
    |
    v
Controllers --> Models (Mongoose) --> MongoDB
    |
    v
Pug templates (views) --> HTML response
```

Real-time flow:

```
Browser <-- WebSocket --> Socket.io server (global._io) --> sockets/client handlers
```

## Getting Started

### Prerequisites

- Node.js v14 or higher
- A MongoDB database (MongoDB Atlas or local instance)
- A Cloudinary account (for image upload)
- A Gmail account with an App Password (for sending emails)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nguyendangcuong201004/product-management.git
cd product-management
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root:

```bash
touch .env
```

4. Add the following environment variables to `.env`:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_KEY=your_cloudinary_api_key
CLOUD_SECRET=your_cloudinary_api_secret
FROM_EMAIL=your_email_address
PASSWORD_APP=your_email_app_password
```

5. Start the development server:

```bash
npm start
```

6. Open the application:

- Client: http://localhost:3000
- Admin panel: http://localhost:3000/admin

## Deployment

The project is configured for deployment on Vercel via `vercel.json`, which builds `index.js` as a Serverless Function and routes all requests to it.

Notes:

- All environment variables listed above must also be set in Vercel under Settings -> Environment Variables.
- Socket.io real-time chat does not work reliably on serverless platforms because WebSocket connections are not persistent. For production use of the chat feature, consider hosting the app on a platform that supports long-lived connections or using a managed realtime service.
