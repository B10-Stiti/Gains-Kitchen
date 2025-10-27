# 🍽️ GainsKitchen – Gym Recipe Sharing App  

**GainsKitchen** is a full-stack **MERN** application that allows fitness enthusiasts to **share, discover, and save healthy recipes**.  
Users can create accounts, post their gym recipes with images, explore recipes from others, and manage their personal profiles — all through a clean, responsive interface built with **Tailwind CSS**.  

---

## Features  

### 👤 Authentication  
- Secure **JWT-based authentication** with **HTTP cookies**  
- Register, login, and maintain sessions safely  

### 🏠 Home Page  
- Browse all recipes shared by users  
- Search and filter recipes by **recipe type**, or **fitness goal**

### 🍳 Share Recipes  
- Create and publish recipes with:  
  - Title, description, and image  
  - Ingredients list  
  - Step-by-step instructions  
  - Fitness goal (e.g., bulking, cutting, maintenance)

### ❤️ Favorites  
- Save your favorite recipes from other users  
- Access them easily on your **Favorites page**

### 👤 Profile Page  
- View all your shared recipes  
- Edit your personal information  
- See your profile stats (e.g., number of recipes shared, favorites, etc.)

---

## 🛠️ Tech Stack  

| Layer | Technology |
|-------|-------------|
| **Frontend** | React + Tailwind CSS |
| **Backend** | Node.js + Express |
| **Database** | MongoDB |
| **Authentication** | JWT + HTTP Cookies |

---

## 📹 Demo
<a href="https://drive.google.com/file/d/1SB9-NPBrWLUgj3lQ7Pml-BWrpnQQqPYv/view?usp=sharing">
  <img src="https://github.com/user-attachments/assets/3c93a240-4114-4f9a-81c6-26093df95e17" width="500" />
</a>



---

## 🧩 Future Improvements  

- 💬 **Comments & reactions** on recipes  
- 🌙 **Dark mode** support  
- 🔥 **More nutrition details** (calories, macros, etc.)  
- ⏳ **Pagination / Load more** feature for performance optimization  
- 🧠 **Personalized recommendations** based on user goals  

---

## ⚙️ Setup Instructions  

1. **Clone the repository**  

   ```bash
   git clone https://github.com/B10-Stiti/Gains-Kitchen
   cd gainskitchen
   ```
2. **Install dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
3. Configure environment variables
   Create a .env file in the server/ folder and add:
   ```env
    PORT=5001
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    JWT_EXPIRES_IN=1d
   ```
4. Run the app
 - Start the backend
   ```bash
   cd server
   npm run start
   ```
 - Start the frontend
   ```bash
   cd client
   npm run dev
   ```

