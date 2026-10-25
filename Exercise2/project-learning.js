4. What does `postModel.find()` return when called with no arguments? What would change if you passed `{ caption: "hello" }`?


/*
MY UNDERSTANDING: TWO API BEHAVIOURS AND THEIR CAUSES

1. POST /create-post — Submitting only the caption

   Error:
   TypeError: Cannot read properties of undefined (reading 'buffer')

   Why it happens:
   - Multer's upload.single("image") middleware processes the uploaded file.
   - If I submit only the caption without an image, req.body.caption
     may exist, but req.file is undefined.
   - Accessing req.file.buffer therefore causes a TypeError because
     req.file does not exist.

   How to handle it:
   - Check whether req.file exists before accessing req.file.buffer.
   - If the image is missing, return HTTP 400 (Bad Request) with a
     clear JSON message.
   - Only upload the image to ImageKit when a file is provided.

2. GET /posts — Receiving an empty array

   Response:
   {
     message: "post fetched successfully",
     posts: []
   }

   Why it happens:
   - postModel.find() with no arguments searches for all documents
     in the collection associated with the model.
   - If the collection contains no matching documents, it returns
     an empty array: [].
   - An empty array is a valid result, not an error.
   - The message indicates that the route returned a successful response,
     but it does not mean that any posts exist.

   What if I pass { caption: "hello" }?
   - postModel.find({ caption: "hello" }) searches for documents whose
     caption field matches the string "hello".
   - It returns an array of all matching documents.
   - If no documents match, it returns [].
*/
