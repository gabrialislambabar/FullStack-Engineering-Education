/*
 * LEARNING NOTES — Dynamic filenames and communication between modules
 *
 * Question 8:
 * Why is using the same hardcoded fileName for every upload a problem?
 * How can the filename come from the uploaded file instead?
 *
 * 1. Hardcoded vs. dynamic values
 * - A hardcoded filename is a fixed value written directly in the source code.
 * - If every upload uses the same hardcoded filename, different uploads may
 *   share the same name, making files harder to distinguish and organize.
 * - A dynamic filename is obtained at runtime from the current uploaded file.
 * - Multer provides the client's original filename through req.file.originalname.
 *
 * 2. Responsibilities of app.js
 * - Express handles incoming HTTP requests.
 * - upload.single("image") is Multer middleware that processes the uploaded
 *   file from multipart form data.
 * - When a file is uploaded successfully, Multer makes its metadata and
 *   contents available through req.file.
 * - req.file.buffer contains the file's binary data.
 * - req.file.originalname contains the original filename supplied by the client.
 *
 * 3. Passing data between modules
 * - app.js calls the uploadFile function exported by storage.service.js.
 * - Function arguments pass the required values from the route to the service.
 * - The first argument, req.file.buffer, is received as buffer.
 * - The second argument, req.file.originalname, is received as originalname.
 * - The parameter names inside the function do not have to match the argument
 *   expressions in app.js; their positions determine which values they receive.
 *
 * 4. Responsibilities of storage.service.js
 * - This module configures the ImageKit SDK and handles file uploads.
 * - buffer.toString("base64") converts the binary Buffer into a Base64 string
 *   for the file value sent to ImageKit.
 * - fileName: originalname supplies the filename received from app.js.
 * - The service does not need direct access to Express's req object because
 *   the required data is passed to it as function arguments.
 *
 * 5. Understanding async and await
 * - async allows the function to return a Promise.
 * - await waits for the ImageKit upload Promise to settle and provides its result.
 * - await does not transport the arguments between modules; the function call
 *   passes the arguments, while await waits for the asynchronous operation.
 *
 * 6. Important debugging lessons
 * - JavaScript is case-sensitive: Multer uses originalname, not originalName.
 * - A missing req.file can cause an error when accessing req.file.buffer.
 * - Validate that the file exists before reading its properties.
 * - If a function expects two arguments, pass both the buffer and filename.
 *
 * 7. Result
 * - The filename is no longer fixed in the source code.
 * - Each upload can use the original filename supplied with that file.
 * - This demonstrates dynamic data handling and separation of responsibilities
 *   between the Express route and the storage service.
 *
 * Note:
 * - Original filenames are not guaranteed to be unique or trustworthy.
 * - A production system may generate unique storage filenames to avoid naming
 *   collisions while keeping the original filename as metadata.
 */
