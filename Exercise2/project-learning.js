// 3. In `server.js`, why is `await connectDB()` before `app.listen`? Why is a top-level `await` allowed in this file? (Hint: look at `package.json`.)

/*
MY UNDERSTANDING: DATABASE CONNECTION AND SERVER STARTUP

1. await connectDB()
   - connectDB() establishes a connection with MongoDB.
   - await waits for the connection promise to resolve successfully.
   - This ensures the server doesn't start accepting requests before
     the database connection is ready.
   - If the connection fails and the error isn't handled, app.listen()
     won't execute.

2. app.listen()
   - Starts the HTTP server listening on the specified port.
   - It allows the server to begin accepting incoming requests.

3. Why connectDB() comes first
   - Database-dependent requests could fail if the server starts
     before MongoDB is ready.
   - Connecting first helps ensure the database is available
     when requests arrive.

4. Top-level await
   - package.json contains "type": "module".
   - This tells Node.js to treat .js files as ES modules.
   - ES modules support top-level await outside an async function.
   - Therefore, server.js can use await connectDB() directly.
*/
