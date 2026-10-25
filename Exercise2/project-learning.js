/*
 * LEARNING NOTES — Required fields, undefined, and Express responses
 *
 * Problem:
 * A post could be created without a caption. The task is to make the
 * caption required and return HTTP 400 when the request is invalid,
 * rather than allowing invalid data or crashing the route.
 *
 * 1. req.body and req.file
 * - req.body contains the text fields parsed from the request, such as
 *   req.body.caption.
 * - req.file is populated by Multer's upload.single("image") middleware
 *   when a file is uploaded.
 * - If no image is uploaded, req.file is undefined.
 *
 * 2. Accessing object properties
 * - req.body.caption accesses the caption property of the req.body object.
 * - req.file.buffer accesses the buffer property of the file object.
 * - A Buffer is a Node.js object representing binary data. It is not a
 *   primitive type such as a string, number, or boolean, but its properties
 *   can still be accessed normally.
 *
 * 3. Why accessing req.file.buffer can crash
 * - If no file is uploaded, req.file is undefined.
 * - Evaluating req.file.buffer then throws a TypeError because JavaScript
 *   cannot access a property on undefined.
 * - Therefore, check whether req.file exists BEFORE accessing req.file.buffer.
 *
 * 4. Checking for undefined
 * - If a request has no caption, req.body.caption will commonly be undefined.
 * - `req.body.caption === undefined` checks whether the value is undefined.
 * - `caption === false` is not an equivalent check: undefined is not false.
 * - `if (!req.body.caption)` also catches other falsy values, such as an
 *   empty string. For required text, checking that the string is non-empty
 *   after trimming is more robust.
 *
 * 5. Truthy and falsy values
 * - JavaScript objects, including Buffer objects, are truthy—even an empty
 *   Buffer object.
 * - undefined, null, false, 0, and an empty string are falsy.
 * - A value being an object does not mean it cannot be checked in a condition.
 * - To check for an uploaded file, checking req.file directly is clearer
 *   than trying to compare its buffer with false.
 *
 * 6. Why the request kept loading / why return matters
 * - Sending res.status(400).json(...) sends an error response to the client.
 * - It does not automatically stop the remaining JavaScript in the handler.
 * - Use `return res.status(400).json(...)` for validation failures so the
 *   handler exits immediately and does not continue into upload or database
 *   creation logic.
 * - `break` exits a loop or switch; it does not exit an ordinary route handler.
 *
 * 7. Validation order
 * - Validate that req.file exists before accessing req.file.buffer.
 * - Validate that the caption exists and is non-empty before uploading or
 *   saving the post.
 * - If either required field is missing, return HTTP 400.
 * - Only continue to upload and create the database document after both
 *   validations pass.
 *
 * 8. Mongoose schema validation
 * - A schema defines the expected shape and validation rules for documents.
 * - Marking caption as required makes Mongoose reject documents without a
 *   valid caption when the document is created or saved.
 * - Schema validation is important, but route-level validation lets the API
 *   return a clear HTTP 400 response instead of exposing an unhandled error.
 *
 * Debugging lesson:
 * - Observe req.body and req.file in the terminal.
 * - Test the request with both fields, without the image, and without the
 *   caption.
 * - Follow the execution order: an error can happen before a later `if`
 *   statement is reached.
 */
