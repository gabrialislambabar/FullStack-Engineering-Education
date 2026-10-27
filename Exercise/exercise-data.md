## Quick check before you start (5 minutes)

Trace `POST /create-post` out loud: request → Multer → ImageKit upload → save to MongoDB → response. If you get stuck on a step, practice that step before the exercises.

## Skipped for now

#8, #9, #13, #14, #15, #16, #18, and #19. You can come back when a real project needs them, and I can give you those later if you ask.

## How to work

- Test every exercise with a failing case as well as a working one.
- Send me your code after #7, then again after #12, and I'll review it before you start auth.

Start with #5 and #6. Send me your attempt when ready.

---

# Project Codebase Files

This section contains all code scanned from project files across their respective directories.

---

## 1. Root Directory (`/`)

### File: `try-catch-learning.js`
**Directory:** `/`
```javascript
try {
  nonExistentFunction();
} catch (error) {
  console.error(error);
  // Expected output: ReferenceError: nonExistentFunction is not defined
  // (Note: the exact output may be browser-dependent)
}

try {
  tryStatments; // The statment to be executed
} catch (exceptionVar) {
  catchStatments; // Statment that is executed if an exception is thrown in the `try` block.
} finally {
  finallyStatments; // These statments are executed regardless of whether an exception was thrown or caught.
}

try {
  throw new Error("My exception");
} catch (e) {
  logMyErrors(e);
}

try {
  myRouting();
} catch (e) {
  if (e instanceof TypeError) {
    // statments to handle TypeError
  } else if (e instanceof RangeError) {
    // statments to handle RangeError exceptions
  } else if (e instanceof EvalError) {
    // statments to handle EvalError exceptions
  } else {
    // statments to handle any specified exceptions

    logMyErrors(e); // pass exception object to error handler
  }
}
```

---

## 2. Backend Directory (`Backend/`)

### File: `Backend/package.json`
**Directory:** `Backend/`
```json
{
  "name": "s---react",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
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
    "@imagekit/nodejs": "^7.13.0",
    "cors": "^2.8.6",
    "dotenv": "^18.0.9",
    "express": "^5.3.0",
    "mongoose": "^9.11.4",
    "multer": "^2.5.0"
  }
}
```

### File: `Backend/.gitignore`
**Directory:** `Backend/`
```
node_modules/
.env
```

### File: `Backend/server.js`
**Directory:** `Backend/`
```javascript
import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

await connectDB();

app.listen(3000, () => {
  console.log("Port is running");
});
```

### File: `Backend/src/db/db.js`
**Directory:** `Backend/src/db/`
```javascript
import mongoose from "mongoose"

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI)

    console.log("Connected to DB")
}

export default connectDB;
```

### File: `Backend/src/models/post.model.js`
**Directory:** `Backend/src/models/`
```javascript
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image: String,
  caption: String,
});

const postModel = mongoose.model("post", postSchema);

export default postModel;
```

### File: `Backend/src/services/storage.service.js`
**Directory:** `Backend/src/services/`
```javascript
import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function uploadFile(buffer, originalname) {
  const result = await imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName: originalname,
  });
  return result;
}

export default uploadFile;
```

### File: `Backend/src/app.js`
**Directory:** `Backend/src/`
```javascript
import express from "express";
import multer from "multer";
import uploadFile from "./services/storage.service.js";
import postModel from "./models/post.model.js";
import cors from "cors";

// Saving server into a variable
const app = express();
// Saving multer middleware for reading 'form-data' into upload variable
const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("INVALID_FILE_TYPE"));
    }
  },
});
// Json reading middleware
app.use(express.json());
// cors middleware for establishing communication between frontend and backend
app.use(cors())

//-----------------------------------------------------------------------
// POST operation
// ---------------------------------------------------------------------

app.post("/create-post", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  console.log(req.file?.originalname);

  const buffer = req.file;
  const caption = req.body.caption;

  if (buffer === undefined) {
    return res.status(400).json({
      message: "Image cannot be found",
    });
  }

  if (caption === undefined) {
    return res.status(400).json({
      message: "Caption cannot be found",
    });
  }

  if (buffer && caption) {
    const result = await uploadFile(req.file.buffer, req.file.originalname);

    const post = await postModel.create({
      image: result.url,
      caption: req.body.caption,
    });

    res.status(201).json({
      message: "Post created successfully",
      post: post,
    });
  }
});

//-----------------------------------------------------------------------
// GET operation
// ----------------------------------------------------------------------

app.get("/posts", async (req, res) => {

  try {
    const posts = await postModel.find();
    if (posts === null) {
      res.status(404).json({
        message: "404 not found",
      });
    } else {
      return res.status(200).json({
        message: "post fetched successfully",
        posts,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "404 Bad Request",
    });
  }
});

//-----------------------------------------------------------------------
// DELETE/posts/:id operation
// ----------------------------------------------------------------------

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const delPost = await postModel.findByIdAndDelete(id);
    if (delPost === null) {
      res.status(404).json({
        message: "404 not found",
      });
    } else {
      res.status(200).json({
        message: "post deleted successfully",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "404 Bad request",
    });
  }
});

//-----------------------------------------------------------------------
// PATCH/posts/:id operation
// ----------------------------------------------------------------------

app.patch("/posts/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const caption = req.body.caption;
    const updateData = { caption };
    const updatePost = await postModel.findByIdAndUpdate(id, updateData);

    if (updatePost === null) {
      res.status(404).json({
        message: "404 not found",
      });
    } else {
      res.status(200).json({
        message: "post updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "404 Bad request",
    });
  }
});

export default app;
```

---

## 3. Frontend Directory (`Frontend/`)

### File: `Frontend/package.json`
**Directory:** `Frontend/`
```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.20.0",
    "react": "^19.3.1",
    "react-dom": "^19.3.1",
    "react-router-dom": "^7.18.4"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.2",
    "eslint": "^10.13.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.7",
    "globals": "^17.13.0",
    "vite": "^8.3.4"
  }
}
```

### File: `Frontend/vite.config.js`
**Directory:** `Frontend/`
```javascript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

### File: `Frontend/eslint.config.js`
**Directory:** `Frontend/`
```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
```

### File: `Frontend/index.html`
**Directory:** `Frontend/`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>frontend</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### File: `Frontend/.gitignore`
**Directory:** `Frontend/`
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

### File: `Frontend/src/main.jsx`
**Directory:** `Frontend/src/`
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### File: `Frontend/src/App.jsx`
**Directory:** `Frontend/src/`
```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Feed from "./pages/Feed";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  );
};

export default App;
```

### File: `Frontend/src/index.css`
**Directory:** `Frontend/src/`
```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  color: #222;
}

.create-post-section {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.create-post-section h1 {
  font-size: 22px;
  margin-bottom: 16px;
  text-align: center;
}

.create-post-section form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.create-post-section input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.create-post-section input[type="file"] {
  font-size: 14px;
}

.create-post-section button {
  padding: 10px;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.create-post-section button:hover {
  background: #444;
}

.feed-section {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  justify-content: start;
}

.feed-section h1 {
  font-size: 22px;
  margin-bottom: 16px;
  text-align: center;
}

.feed-section .post-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 16px;
  overflow: hidden;
}

.feed-section .post-card img {
  display: block;
  width: 100%;
  height: auto;
}

.feed-section .post-card p {
  padding: 12px;
  font-size: 14px;
}
```

### File: `Frontend/src/pages/Feed.jsx`
**Directory:** `Frontend/src/pages/`
```jsx
import { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      _id: "1",
      image:
        "https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg",
      caption: "cowboy",
    },
  ]);

useEffect(() => {
  axios
    .get("http://localhost:3000/posts")
    .then((res) => {
      console.log("API response:", res.data);
      setPosts(res.data.posts);
    })
    .catch((error) => {
      console.error("Failed to fetch posts:", error);
    });
}, []);
  return (
    <section className="feed-section">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <img src={post.image} alt={post.caption} />
            <p>{post.caption}</p>
          </div>
        ))
      ) : (
        <h1>No post available yet</h1>
      )}
      <h1>Feed</h1>
    </section>
  );
};

export default Feed;
```

### File: `Frontend/src/pages/CreatePost.jsx`
**Directory:** `Frontend/src/pages/`
```jsx
import axios from "axios";

const CreatePost = () => {
  
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submit handler executed");

  const formData = new FormData(e.target);

  axios.post("http://localhost:3000/create-post", formData)
    .then((res) => {
      console.log("Server response:", res.data);
    })
    .catch((err) => {
      console.error("Request failed:", err);
    });
};
  return (
    <section className='create-post-section'>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
      <input type="file" name="image" accept="image/*"/>
      <input type="text" name='caption' placeholder="Enter caption" required />
      <button  type='submit' >Submit</button>
      </form>
    </section>
  )
}
export default CreatePost;
```

---

## 4. Exercise Directory (`Exercise/`)

### File: `Exercise/package.json`
**Directory:** `Exercise/`
```json
{
  "name": "exercise2",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "dotenv": "^18.0.9",
    "express": "^5.3.0",
    "mongoose": "^9.11.4",
    "multer": "^2.5.0"
  }
}
```

### File: `Exercise/server.js`
**Directory:** `Exercise/`
```javascript
// File is empty
```

### File: `Exercise/project-learning.js`
**Directory:** `Exercise/`
```javascript
/*
## Learning Milestone: Backend API Integration with React

### What I built
- Created backend APIs for creating posts and retrieving posts from the database.
- Implemented image uploads and caption handling.
- Built a basic React frontend with a Create Post interface and a Feed interface.
- Used Axios to send HTTP requests from the frontend to the backend.
- Used `FormData` to submit an image file and caption together.
- Used React's `useState` to manage post data and `useEffect` to fetch posts when the Feed component mounts.
- Rendered posts dynamically ing `.map()`, displaying each post's image and caption.
- Used `key={post._id}` to provide React with a stable identifier for each rendered post.
- Practiced debugging frontend/backend integration issues using browser DevTools, console logs, and API responses.

### Concepts encountered
- React functional components and JSX.
- `useState` and `useEffect`.
- Event handling with `onSubmit` and `e.preventDefault()`.
- Axios requests with `.then()` and `.catch()`.
- `FormData` for multipart form submissions.
- Rendering arrays of objects with `.map()`.
- Displaying API response data in the UI.
- Matching frontend API requests with backend routes and response structures.

### Learning decision
I am postponing deeper React study until I complete my current backend learning phase. My immediate priorities are authentication with JWT, token-based authorization, and building a more substantial backend project inspired by Spotify.

I will return to React in a dedicated learning phase to understand the syntax, component architecture, hooks, state management, and rendering behavior properly.

**Current status:** Built and integrated a basic frontend for testing backend APIs; React fundamentals are encountered but not yet fully studied.
*/
```
