
## Learning Milestone: Backend API Integration with React

### What I built
- Created backend APIs for creating posts and retrieving posts from the database.
- Implemented image uploads and caption handling.
- Built a basic React frontend with a Create Post interface and a Feed interface.
- Used Axios to send HTTP requests from the frontend to the backend.
- Used `FormData` to submit an image file and caption together.
- Used React's `useState` to manage post data and `useEffect` to fetch posts when the Feed component mounts.
- Rendered posts dynamically using `.map()`, displaying each post's image and caption.
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
