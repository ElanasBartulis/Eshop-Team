# 🛒 Eshop-Team 

## 📌 Project Overview

The Eshop-Team project was developed by a team of students at the Baltic Technology Institute as a final challenge to apply everything we've learned and build something complex. It’s an online eShop where users can browse, purchase products, and interact with their accounts, while admins manage product listings and user data.

The main purpose of this eShop was to serve as a comprehensive learning experience for our team. After almost completing our studies, we wanted to build a large-scale application that incorporated features we hadn’t covered in lectures, making it a perfect opportunity to challenge ourselves.

Although it's our first big project, we managed to implement several essential e-commerce features like user authentication, a shopping cart, product ratings, and even admin management tools.

## 🌟 Unique Features

- 🎨 **Solid Design**: The design strikes a balance between clean aesthetics and functionality, ensuring an easy-to-use experience for both users and admins.
- 🔑 **Comprehensive User and Admin Features**: Users can register, rate products, manage wish lists, view purchase histories, and more. Admins have control over product listings, user data, and can add discounts or delete products when necessary.

## 👤 How It Works (from a user's perspective)

### Users can:

- 🔐 Register and manage accounts
- 🔍 Browse products, filter by price or rating, and sort product lists
- 🛍️ Add products to their cart or wish list
- 💳 Proceed with simulated purchases, create a purchase history
- ⚙️ View and edit personal information and passwords in the user panel

### Admins can:

- 🛠️ Add, edit, or delete products, including managing product details and images
- 👥 View the user list and edit user account information when necessary

## 👨‍💻 Team Members & Contributions

- **Žilvinas Stanius**: 📝 Focused on the User Panel, product ratings, and the wishlist system.
- **Elanas Bartulis**: 🖼️ Handled the admin panel, especially the image-uploading functionality for products.
- **Erika Suseke**: 🎨 Responsible for the cart functionality, page responsiveness, and overall design adjustments.

Though each member had a primary area of responsibility, we collaborated closely on all aspects of the project to ensure everything came together cohesively.

## 🛠️ Technologies Used

### ⚙️ Backend

- 🖥️ **Express.js** for the server-side application
- 🗄️ **MySQL** as the database
- 🔄 **Sequelize** for database interaction
- 🔍 **Zod** for input validation
- 🛎️ **Sessions** for user activity tracking and authentication
- 📂 **Multer** for file uploads

### 🎨 Frontend

- ⚛️ **React (with Vite)** for building the user interface
- 🏗️ **Material UI** for pre-designed components
- 🎨 **Tailwind CSS** for styling
- 🎭 **Framer Motion** for smooth animations
- 🚦 **React Router** for page navigation

### 🛠️ Tools

- 🌐 **Nginx** to handle server-side configurations for both frontend and backend

## 🔑 Key Features

### 👤 User Features:

- 🔐 User registration and login
- 📊 Product sorting (by price, rating, etc.)
- 🛍️ Add products to the wishlist and cart
- 📜 View purchase history
- ⚙️ Change account settings and passwords

### 🛠️ Admin Features:

- 🏷️ Product management (add, update, delete products)
- 👥 User management (view, edit, delete users)
- 💰 Product discount and image handling

## 🚀 Setup and Installation

### 📌 Prerequisites

- ⚙️ Node.js and npm for backend setup
- 🗄️ MySQL for the database
- 🌐 Nginx to configure the server
- 📂 Clone the repository to get started

### 🛠️ Installation Steps

1. 📥 Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. 📦 Install dependencies for both frontend and backend:

   ```bash
   npm install
   ```

3. 📝 Create a `.env` file in the `backEnd` folder and add your database connection details (check `.env.example` for the structure).

4. ⚙️ Set up Nginx to work with both frontend and backend services.

5. ▶️ Start the backend and frontend services:

   - Backend: `npm run dev`
   - Frontend: `npm run dev` (in the frontend directory)

6. 🌍 Visit the application on your local machine.

## 🌎 Deployment

The eShop is deployed on a VPS server provided by Hostinger. You can access the live version here: [Eshop](http://srv701413.hstgr.cloud/).

## 🛍️ User Interaction

Users can register, browse products, rate them, and add them to their cart or wishlist. Upon making a purchase, they can view the history in their user panel. Admins can manage the entire store, including product listings, discounts, and user accounts.

## 🏗️ Coding Practices & Project Management

As this was our first large-scale project, we began with a general plan, but as the project grew, we learned the importance of detailed planning. In the future, we would focus on more specific and refined task assignments from the start.

## 📜 License

The project is hosted on Hostinger using a VPS server and secured with **Certbot** for HTTPS.

## ⚠️ Usage Restrictions

To prevent misuse, the admin panel is not publicly accessible. If someone wishes to test the admin functionality, they can contact us via LinkedIn, and we will provide them with a test account.

## 🚀 Future Features & Improvements

In the future, we plan to add:

- 📦 **Order Tracking**: Allow admins to track pending and completed orders.
- 🔧 **Advanced Admin Features**: Enhance product and user management.
- 💳 **Payment Gateway Integration**: Implement real payments for a complete shopping experience.

## 🙌 Acknowledgments

This project provided valuable learning experiences, allowing us to explore new technologies and develop skills that will benefit us in our future careers.
