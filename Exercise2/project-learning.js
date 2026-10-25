// 10. `GET /posts/:id`: return one post. Handle both a missing post (`404`) and an invalid id format. What does Mongoose do with an invalid id?

/*
 *
 * LEARNING NOTES: GET /posts/:id — Fetching a Single Post
 *
 * 1. ROUTE PARAMETERS
 * Express stores dynamic URL parameters in req.params.
 * For GET /posts/:id, req.params.id contains the ID supplied in the URL.
 *
 * 2. QUERYING WITH MONGOOSE
 * postModel.findById(id) searches for a document using its MongoDB _id.
 * Unlike find(), findById() returns one document or null, not an array.
 * Because the query is asynchronous, await waits for its result.
 *
 * 3. HANDLING A MISSING DOCUMENT
 * A validly formatted ID may not match any document.
 * In that case, findById() returns null without throwing an error.
 * An if statement checks for null, and the API should return HTTP 404.
 *
 * 4. HANDLING AN INVALID ID
 * An ID that cannot be cast to MongoDB's expected ID format can cause
 * Mongoose to throw a CastError when the query executes.
 * The try...catch structure allows the route to handle that exception.
 * A malformed client-supplied ID should generally receive HTTP 400.
 *
 * 5. TRY...CATCH
 * The try block contains code that might throw an exception.
 * If an exception occurs, execution moves to the catch block.
 * The catch block can inspect the error and send an appropriate response.
 *
 * 6. HTTP STATUS CODES
 * 200 OK: The post was found and returned successfully.
 * 400 Bad Request: The supplied ID is malformed.
 * 404 Not Found: No post exists for a validly formatted ID.
 *
 * 7. RETURNING FROM A ROUTE HANDLER
 * return res.status(...).json(...) sends the response and exits the
 * current route-handler function, preventing subsequent code from running.
 *
 * 8. TESTING
 * Testing with Postman helped verify the three main outcomes:
 * an existing post, a missing post, and an invalid ID.
 *
 * FUTURE IMPROVEMENT:
 * Inspect the caught error and handle CastError specifically instead of
 * returning 400 for every possible exception. Unexpected database or
 * server errors should not be misreported as client errors.
 */
