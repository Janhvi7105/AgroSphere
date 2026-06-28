# 🌾 AgroSphere – Smart Agriculture Marketplace Platform

AgroSphere is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to connect farmers and buyers through a secure digital marketplace. It enables farmers to list agricultural products, buyers to purchase them using Razorpay, and administrators to manage the platform efficiently through an approval workflow.

Built as a final-year project, AgroSphere focuses on digitizing agricultural commerce with features such as product approval, crop guidance, weather updates, AI assistance, community interaction, and order management.

---

## 🚀 Features

### 👨‍🌾 Farmer Module
- User Registration & Login
- JWT Authentication
- Farmer Dashboard
- Add / Edit / Delete Products
- Product Status Tracking (Pending / Approved / Rejected)
- My Products
- Order Management
- Profile Management

### 🛒 Marketplace
- Browse Approved Products
- Product Details Page
- Search Products
- Category Filter
- Price Sorting
- Quantity Selection
- Real-time Stock Management

### 💳 Payment & Orders
- Razorpay Payment Gateway Integration
- Secure Order Placement
- Purchase History
- Delivery Address
- Payment Status
- Order Status Tracking

### 👨‍💼 Admin Module
- Admin Dashboard
- User Management
- Product Approval Workflow
- Pending Products Management
- Crop Guide Management
- Government Schemes Management
- Community Post Management
- Order Analytics
- Revenue Dashboard

### 🌾 Crop Guide
- Crops
- Vegetables
- Fruits
- Flowers
- Soil Information
- Fertilizer Recommendations
- Disease Identification
- Treatment Suggestions
- Seed Price Information
- Video Tutorials

### 🌦 Weather Module
- Live Weather Information
- Location-based Forecast

### 🏛 Government Schemes
- Agricultural Scheme Listings
- Eligibility Information
- Benefits
- Official Resources

### 👥 Community Module
- Create Posts
- Share Farming Knowledge
- Community Feed

### ⭐ Reviews & Ratings
- Product Reviews
- Product Ratings
- Average Rating Display

### 🤖 AI Assistant
- Gemini AI Integration
- Agriculture-related Query Assistance

---

# 🏗️ System Architecture

```
                Admin
                  │
 ┌────────────────────────────────────┐
 │ Dashboard                          │
 │ Users                              │
 │ Products                           │
 │ Pending Approvals                  │
 │ Orders                             │
 │ Crop Guide                         │
 │ Government Schemes                 │
 └────────────────────────────────────┘
                  │
           MongoDB Database
                  │
 ┌────────────────────────────────────┐
 │ Users                              │
 │ Products                           │
 │ Orders                             │
 │ Crops                              │
 │ Government Schemes                 │
 │ Community Posts                    │
 │ Reviews                            │
 └────────────────────────────────────┘
                  │
         React Frontend (Farmer)
```

---

# 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- CSS
- JavaScript (ES6)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication

- JWT
- bcryptjs

### Payment Gateway

- Razorpay

### AI

- Google Gemini API

### APIs

- OpenWeather API

---

# 📂 Project Structure

```
AgroSphere/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│
├── package.json
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AgroSphere.git

cd AgroSphere
```

---

## Backend Setup

```bash
cd backend

npm install

npm start
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm start
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

RAZORPAY_KEY_ID=your_key

RAZORPAY_SECRET=your_secret

GEMINI_API_KEY=your_api_key
```

---

# 👨‍💻 User Roles

## Farmer

- Register/Login
- Manage Products
- View Orders
- Track Product Status
- Update Profile

---

## Buyer

- Browse Marketplace
- Purchase Products
- Razorpay Payment
- View Purchase History
- Rate & Review Products

---

## Admin

- Manage Users
- Approve Products
- Manage Orders
- Manage Crop Guide
- Manage Government Schemes
- Platform Analytics

---

# 🔄 Application Workflow

```
Farmer
   │
Upload Product
   │
Pending Approval
   │
Admin Approves
   │
Marketplace
   │
Buyer Purchases Product
   │
Razorpay Payment
   │
Order Created
   │
Stock Updated
   │
Purchase History
   │
Review Product
```

---

# 📸 Screenshots

Add screenshots here after deployment.

Example:

```
Home Page

Marketplace

Farmer Dashboard

Admin Dashboard

Crop Guide

Product Details

Payment Page

Order Dashboard
```

---

# 🔒 Security Features

- JWT Authentication
- Protected Routes
- Role-based Authorization
- Password Hashing using bcrypt
- Secure REST APIs

---

# 📈 Future Enhancements

- AI Voice Assistant
- Product Recommendations
- Push Notifications
- Mobile Application
- Multi-language Support
- Inventory Analytics

---

# 🎯 Learning Outcomes

- MERN Stack Development
- REST API Design
- MongoDB Database Modeling
- JWT Authentication
- Payment Gateway Integration
- Admin Approval Workflow
- Full Stack Deployment
- Responsive UI Design

---

# 👩‍💻 Developed By

**Janhvi**

B.Tech Student

Department of Computer Science & Engineering

---

# ⭐ If you found this project helpful

Please consider giving it a ⭐ on GitHub.