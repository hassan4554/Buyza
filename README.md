# E-commerce Multi Vendor

## Live Demo
Check out the live demo of **E-commerce Multi Vendor**: 👉 [E-commerce Multi Vendor](https://your-demo-link.com/)

## Introduction / Overview

**E-commerce Multi Vendor** is a robust platform designed to facilitate online buying and selling for multiple vendors. It streamlines the management of products, orders, payments, shops, users, and more. The system provides dedicated dashboards for **Admin**, **Sellers**, and **Customers**, enabling efficient communication, order management, and real-time updates across the marketplace ecosystem.

The platform leverages modern web technologies and a scalable database schema to ensure security, performance, and ease of use for all stakeholders.

---


## Goals of the Project

- Centralize and digitize e-commerce operations (product management, orders, payments, reviews)
- Enable role-based access and workflows for admin, sellers, and customers
- Provide updates and notifications
- Ensure secure data management and privacy
- Offer a user-friendly, responsive interface for all users

---

## Architecture Overview

- **Frontend**: React.js (Vite), Tailwind CSS, Redux
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB (Mongoose ORM)
- **Deployment**: Vercel (frontend), Render/Atlas (backend/database)

---

### Frontend
- Built with **React.js** (Vite)
- Modular, role-based dashboards
- **Tailwind CSS** for styling
- **Redux** for state management
- Responsive and accessible UI

### Backend
- **Node.js** and **Express.js** for server-side logic
- **Mongoose ORM** for database access
- Organized code: `controller/`, `model/`, `routes/`, `middleware/`, `utils/`
- Secure role-based route protection

### Database
- **MongoDB** via **Mongoose**
- Models: User, Shop, Product, Order, Coupon, Event, Message, Conversation, Review, Payment
- Relational schema with references and enums

---

## Key Features

### Customer Features
- Browse products, shops, and events
- Place orders and make payments
- View order history and track status
- Write reviews and ratings
- Receive notifications and offers

### Seller Features
- Manage shop profile and products
- View and process orders
- Create coupons and events
- Communicate with customers (messages)
- Analyze sales and performance

### Admin Features
- Full CRUD for all entities (users, shops, products, orders, etc.)
- Manage platform-wide settings, events, and coupons
- Oversee transactions and refunds
- Role and access management

---

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Redux
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Other**: Cloudinary (media), JWT (authentication), Stripe (payments), ESLint, PostCSS

---

## Database Design (ERD)

| Model        | Key Fields                                                      |
|-------------|-----------------------------------------------------------------|
| User        | id, name, email, password, role, address, orders[], shopId      |
| Shop        | id, name, ownerId, products[], orders[], coupons[], events[]    |
| Product     | id, name, price, stock, shopId, reviews[], category, images[]   |
| Order       | id, products[], userId, shopId, status, paymentInfo, total      |
| Coupon      | id, code, discount, shopId, expiryDate                          |
| Event       | id, title, description, startTime, endTime, shopId              |
| Message     | id, senderId, receiverId, content, conversationId, date         |
| Conversation| id, participants[], messages[], lastMessage                     |
| Review      | id, rating, comment, productId, userId, date                    |
| Payment     | id, orderId, userId, amount, status, method                     |

![ER Diagram](https://drive.google.com/file/d/1il_GTpacT5bM1R1-EuIWzkwS-5oKL-au/view?usp=sharing)

---

## User Journey & Flow Diagram

### Customer Flow
Sign Up → Login → Browse Products/Shops → Place Order → Make Payment → Track Order → Write Review

### Seller Flow
Login → Manage Shop/Products → View Orders → Process Orders → Create Coupons/Events → Communicate with Customers

### Admin Flow
Login → Manage All Entities → Oversee Platform Data → Manage Events/Coupons/Refunds

![FlowChart Diagram](https://drive.google.com/file/d/16GxFlaj24BlCfP5i_cmIOqh6s4ER9BgU/view?usp=sharing)

---

## Best Practices

- Secure authentication and role-based access (JWT)
- Passwords and sensitive data never stored in frontend
- Modular, maintainable code structure
- RESTful API conventions
- Responsive, accessible UI (Tailwind CSS)
- Type safety and validation (Mongoose, ESLint)
- Version control (GitHub)

---

##  Author

**Hassan Mehmood**  
Full-Stack Developer | MERN Stack | Next.js | Scalable Web Apps

- ✉️ hassanmehmood.here@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/hassanmehmood1098/)  
- 💻 [GitHub](https://github.com/hassan4554)
---

##  License

This project is licensed under the [MIT License](./LICENSE).