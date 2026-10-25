// 12. `PATCH /posts/:id`: update only the caption. Reuse the idea you learned in the Notes API about updating only the fields that were sent.

/*
 * LEARNING NOTES: PATCH /posts/:id — Update Only the Caption
 *
 * 1. PATCH VS. OTHER HTTP METHODS
 * PATCH is used to partially update an existing resource.
 * In this route, the requirement is to update only the caption while
 * preserving other fields, such as the image.
 *
 * 2. EXTRACTING THE ROUTE PARAMETER
 * req.params.id retrieves the post ID supplied in the URL.
 * The ID identifies which MongoDB document should be updated.
 * A MongoDB document ID is not an array index.
 *
 * 3. READING THE REQUEST BODY
 * req.body.caption retrieves the new caption sent by the client.
 * The new value comes from the incoming request, not from the existing
 * caption stored in MongoDB.
 *
 * 4. POSTMAN REQUEST CONFIGURATION
 * For this test, the request body must be configured as:
 * Body -> raw -> JSON.
 * The request body should contain valid JSON, for example:
 * { "caption": "My updated caption" }
 *
 * I initially forgot to select raw JSON in Postman.
 * This contributed to the problem because the request body was not
 * available in the expected format.
 * Selecting raw JSON and sending the caption correctly resolved the
 * request configuration issue.
 *
 * 5. EXPRESS JSON MIDDLEWARE
 * app.use(express.json()) parses incoming JSON request bodies so that
 * their data can be accessed through req.body.
 * This middleware must be registered before the routes that depend on it.
 * It does not parse every possible body format, such as multipart form data.
 *
 * 6. JAVASCRIPT VARIABLES
 * const caption = req.body.caption stores the incoming caption value
 * in a variable named caption.
 * The variable holds the new value that will be used in the update.
 *
 * 7. JAVASCRIPT OBJECTS AND PROPERTY SHORTHAND
 * const updateData = { caption: caption };
 * creates an object whose property name is caption and whose value is
 * the value stored in the caption variable.
 *
 * When the property name and variable name are identical, JavaScript
 * allows the shorter equivalent:
 * const updateData = { caption };
 *
 * The property name identifies which field should be updated.
 * The property value supplies the new value for that field.
 *
 * 8. UPDATING WITH MONGOOSE
 * postModel.findByIdAndUpdate(id, updateData) locates a document by ID
 * and applies the supplied update.
 * The ID identifies the document; the update object describes the change.
 * Since updateData contains only caption, the image field is not
 * intentionally changed by this update.
 *
 * By default, findByIdAndUpdate() returns the document as it existed
 * before the update, or null if no matching document was found.
 *
 * 9. HANDLING A MISSING POST
 * If the returned value is null, respond with HTTP 404 Not Found.
 * If the update succeeds, respond with HTTP 200 OK.
 *
 * 10. ERROR HANDLING WITH TRY...CATCH
 * The try block contains the database operation that may throw an error.
 * The catch block handles exceptions thrown during execution.
 * An invalid ID format may cause Mongoose to throw a CastError.
 * A malformed ID should generally receive HTTP 400 Bad Request.
 * Unexpected database or server errors should not be reported as 404.
 *
 * 11. DEBUGGING THROUGH TERMINAL OUTPUT
 * The terminal reported:
 * TypeError: Cannot read properties of undefined (reading 'caption')
 *
 * This indicated that req.body was undefined when the route attempted
 * to access req.body.caption.
 * Inspecting the stack trace helped identify the failing line.
 *
 * The important debugging lesson is to inspect the actual error,
 * verify the incoming request configuration, and investigate middleware
 * before rearranging statements without evidence.
 *
 * 12. ORDER OF EXECUTION AND DATA DEPENDENCIES
 * The caption must be obtained before constructing updateData.
 * updateData must exist before it is passed to findByIdAndUpdate().
 * The correct sequence is:
 * read the caption -> construct the update object -> execute the update.
 *
 * Moving statements around does not fix a missing or incorrectly parsed
 * request body.
 *
 * 13. INPUT VALIDATION — FUTURE IMPROVEMENT
 * Reject a missing or blank caption with HTTP 400 before updating.
 * Check whether the returned document is null before reporting success.
 * Refine catch handling to distinguish CastError from unexpected errors.
 *
 * 14. TESTING AND LESSON LEARNED
 * Test the route using:
 * - A valid ID and a valid caption.
 * - A valid-format ID that has no matching post.
 * - A malformed ID.
 * - A missing or blank caption.
 *
 * This exercise reinforced route parameters, request bodies, Express
 * middleware, object properties, asynchronous Mongoose operations,
 * partial updates, HTTP status codes, and practical debugging.
 */
