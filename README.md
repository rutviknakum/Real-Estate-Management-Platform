# RealEstateGo - Real Estate Management Platform

## 📌 Overview
RealEstateGo is a powerful real estate management platform that allows users to **buy, sell, and manage properties** seamlessly. Originally developed using the **MERN stack**, the backend has been migrated to **Go** for enhanced performance and scalability.

---

## 🚀 Features
- 🔐 **Secure Authentication** - JWT-based login & password hashing.
- 🏡 **Property Management** - Add, update, delete, and view properties with details.
- 🔍 **Search & Filtering** - Advanced filtering based on location, price, and type.
- ⚡ **Optimized Backend** - High-performance API using Go (Gin framework).
- 💻 **Modern Frontend** - Built with React.js & Tailwind CSS.
- 📊 **Analytics Dashboard** - Insights on property listings and user interactions.

---

## 📁 Project Structure
```
realestatego/
│── backend/          # Go backend
│── frontend/         # React.js frontend
│── .env.example      # Environment variables example
│── README.md         # Documentation
```

---

## 🛠️ Installation & Setup
### Prerequisites
Ensure the following are installed:
- ✅ **Go** (1.19+)
- ✅ **MongoDB** (Local or Cloud Atlas)
- ✅ **Node.js** (v18+) & **npm**

### Backend Setup (Go)
```sh
git clone https://github.com/rutviknakum/Real-Estate-Management-Platform.git
cd realestatego/backend
go mod tidy
cp .env.example .env
nano .env  # Configure environment variables
go run main.go
```

### Frontend Setup (React.js)
```sh
cd ../frontend
npm install
cp .env.example .env
nano .env  # Configure frontend environment variables
npm start
```



---

## 🛠️ Technologies Used
- **Frontend**: React.js (v18), Tailwind CSS
- **Backend**: Go (v1.19+, Gin framework)
- **Database**: MongoDB (v6.0+)
- **Authentication**: JWT-based authentication
- **Containerization**: Docker & Docker-Compose (Optional)

---

## 📜 License
Licensed under the **MIT License**.

---

## 🔗 Resources
- [Gin Framework Docs](https://gin-gonic.com/docs/)
- [MongoDB Official Site](https://www.mongodb.com/)
- [React.js Docs](https://react.dev/)

---

