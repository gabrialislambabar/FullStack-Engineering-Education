# Phase 3 - Authentication & Backend Setup

This document contains all project files created for Phase 3 (Authentication system with Express, MongoDB/Mongoose, JWT, and Cookie-Parser).

---

## 1. Root Configuration & Server

### `package.json`
**Path:** `package.json`
```json
{
  "name": "s---react",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Muazislam/FullStack-Engineering-Education.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "bugs": {
    "url": "https://github.com/Muazislam/FullStack-Engineering-Education/issues"
  },
  "homepage": "https://github.com/Muazislam/FullStack-Engineering-Education#readme",
  "dependencies": {
    "cookie-parser": "^1.4.7",
    "dotenv": "^18.0.9",
    "express": "^5.3.0",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.11.4",
    "nodemon": "^3.1.14"
  }
}
```

---

### `.gitignore`
**Path:** `.gitignore`
```gitignore
node_modules/
.env
```

---

### `.env`
**Path:** `.env`
```env
MONGO_URI=mongodb+srv://muazislambabar_db_user:cwcqf7lx6JKLgNtl@cluster0.l6iqnpu.mongodb.net/
JWT_SECRET=fb365e84766e73318f978836a4910e90
```

---

### `server.js`
**Path:** `server.js`
```javascript
import "dotenv/config"
import app from "./src/app.js"
import connectDB from "./src/db/db.js"


connectDB();

app.listen(3000, () => {
  message: "Port is running"
})
```

---

## 2. Application Setup (`src/`)

### `src/app.js`
**Path:** `src/app.js`
```javascript
import express from "express";
import authRoutes from  "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes)
export default app;
```

---

## 3. Database Connection (`src/db/`)

### `src/db/db.js`
**Path:** `src/db/db.js`
```javascript
import mongoose from "mongoose"

async function connectDB() {
   try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected")
  } catch (error) {
    console.error("Database connection error:", error)
  }
}

export default connectDB;
```

---

## 4. Models (`src/models/`)

### `src/models/user.model.js`
**Path:** `src/models/user.model.js`
```javascript
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("user", userSchema)

export default userModel;
```

---

## 5. Controllers (`src/controllers/`)

### `src/controllers/auth.controller.js`
**Path:** `src/controllers/auth.controller.js`
```javascript
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"

async function registerUser(req, res) {
      const { username, email, password } = req.body;


   // Creates a document that is saved in mongodb
  const user = await userModel.create({
  username, email, password,
  })

  const token = jwt.sign({
    id: user._id
  }, process.env.JWT_SECRET)

  res.cookie("token", token)

  res.status(201).json({
    message: "User registered successfully",
    user,

  })
}

export default {registerUser};
```

---

## 6. Routes (`src/routes/`)

### `src/routes/auth.routes.js`
**Path:** `src/routes/auth.routes.js`
```javascript
import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authController.registerUser

)
export default router;
```
