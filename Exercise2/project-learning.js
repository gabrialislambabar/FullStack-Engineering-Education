11. `DELETE /posts/:id`: delete a post, and return `404` if it doesn't exist.
/*
 * LEARNING NOTES: DELETE /posts/:id — Deleting a Post
 *
 * 1. ROUTE PARAMETERS
 * req.params.id extracts the post ID supplied in the URL.
 *
 * 2. DELETING WITH MONGOOSE
 * findByIdAndDelete(id) searches for a document by its _id and deletes
 * it if found. It returns the deleted document or null if no document
 * matches the supplied, validly formatted ID.
 *
 * 3. CHECKING THE RESULT
 * If the returned value is null, no matching post was found, so the API
 * should respond with HTTP 404 Not Found.
 * If a document is returned, the deletion succeeded and the API can
 * respond with HTTP 200 OK.
 *
 * 4. ASYNCHRONOUS OPERATIONS
 * await waits for the database operation to resolve before the route
 * checks its result and sends the response.
 *
 * 5. ERROR HANDLING
 * The try block contains the database operation that may throw an error.
 * The catch block handles exceptions, including invalid ID formats that
 * cause Mongoose to throw a CastError.
 * A malformed ID should generally receive HTTP 400 Bad Request.
 * Unexpected database or server errors should not be reported as 404.
 *
 * 6. EARLY RETURNS
 * Using return with res.status(...).json(...) exits the route handler
 * after sending the response and prevents accidental continuation.
 *
 * 7. REUSING PREVIOUS KNOWLEDGE
 * This route reuses the concepts learned in GET /posts/:id:
 * route parameters, Mongoose ID queries, null checks, await, and
 * try...catch. The main difference is that this operation deletes
 * the document instead of retrieving it.
 */
