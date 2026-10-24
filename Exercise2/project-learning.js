// 2. Why does Multer use `memoryStorage()`, and what is `req.file.buffer`? Why does `storage.service.js` call `.toString("base64")`?

/*
MY UNDERSTANDING: MULTER BUFFER AND BASE64

1. memoryStorage()
   - Multer stores uploaded file contents in server RAM.
   - It makes the file's binary data available through req.file.buffer.

2. req.file.buffer
   - This is a Node.js Buffer containing the original file bytes.
   - req.file also contains metadata such as the filename, MIME type, and size.

3. buffer.toString("base64")
   - Converts the buffer's bytes into a Base64-encoded string.
   - It does not decode the data or recreate the image.
   - The original buffer remains unchanged.

4. Why Base64?
   - The ImageKit SDK's upload method accepts Base64 input.
   - We convert the buffer into the format expected by that method.
   - Base64 increases the encoded data size by roughly 33%.

5. The key distinction
   - buffer: original binary data.
   - encodedImage: a Base64 text representation of that data.
*/
