/*
 * LEARNING NOTES — dotenv and process.env
 *
 * Question 9:
 * dotenv is loaded in both server.js and db.js. Is it needed twice?
 *
 * 1. What dotenv does
 * - dotenv reads environment variables from a .env file.
 * - dotenv/config loads dotenv automatically when imported.
 * - The values become available through Node.js's process.env object.
 * - Example: process.env.MONGO_URI and process.env.IMAGEKIT_PRIVATE_KEY.
 *
 * 2. Why one import can be enough
 * - server.js is the application's entry point.
 * - Importing dotenv/config at startup loads the environment variables.
 * - Modules such as db.js and storage.service.js execute within the same
 *   Node.js process and can read the same process.env values.
 * - Environment variables are process-wide, not local to the module that
 *   loaded dotenv.
 *
 * 3. Why removing dotenv from server.js caused an error
 * - ImageKit reads its private key from process.env.
 * - Without loading the .env file, that variable may be undefined.
 * - The upload fails because ImageKit has not received the required key.
 * - The solution is to ensure environment variables are loaded before
 *   environment-dependent services are initialized.
 *
 * 4. ES module execution order
 * - Static ES module imports are evaluated before the importing module's
 *   ordinary body executes.
 * - Loading dotenv/config as an entry-point dependency makes environment
 *   variables available before the application starts its normal setup.
 * - Keep dotenv/config at the top of server.js for a clear startup sequence.
 *
 * 5. Application design
 * - server.js loads environment variables and starts the application.
 * - db.js reads the MongoDB connection string from process.env.
 * - storage.service.js reads the ImageKit private key from process.env.
 * - These modules do not need to load dotenv separately when server.js
 *   reliably loads it first.
 *
 * 6. Verification
 * - Remove the redundant dotenv import from db.js.
 * - Keep dotenv/config in server.js.
 * - Start the application and verify database connection and image upload.
 * - Successful tests confirm that the startup path supplies the required
 *   environment variables to both services.
 *
 * 7. Security reminder
 * - Keep .env out of version control using .gitignore.
 * - Never expose private keys in client-side code or public repositories.
 * - Rotate credentials if they have been exposed.
 */
