// 6. Send `POST /create-post` with **no image** and read the error in your terminal. What exactly crashes? Make it return `400` with a clear message.

/*
MY LEARNINGS: req, req.file, OBJECTS, AND BUFFERS

1. Understanding req and res
   - req stands for request, which carries information from the client
     (such as Postman or a browser) to the server.
   - res stands for response, which the server uses to send data back
     to the client.
   - Express provides req and res to the route handler.

2. How req.file is created
   - When I use upload.single("image"), Multer processes the uploaded
     file before my route handler executes.
   - If a file is uploaded successfully, Multer attaches its file
     information to req.file.
   - req.file is an object containing related properties, such as
     originalname, mimetype, size, and buffer.
   - If no file is uploaded, req.file is undefined.

3. Understanding objects and dot notation
   - An object groups related data under named properties.
   - Dot notation lets me access a property's value.
   - req.file accesses the entire file-information object.
   - req.file.originalname accesses the filename.
   - req.file.size accesses the file size.
   - req.file.buffer accesses the Buffer containing the file's bytes.

4. Understanding Buffer
   - A Buffer is a special Node.js object that holds a sequence of bytes.
   - It is not a string, integer, or boolean.
   - The numbers displayed in the terminal represent byte values.
   - For an uploaded image, the Buffer contains the image's binary data.

5. Why I access req.file.buffer
   - Multer provides the uploaded file's Buffer through req.file.buffer.
   - I access it to pass the image's binary data to uploadFile().
   - The storage service converts the Buffer to a Base64 string
     for the ImageKit upload operation.

6. Understanding truthy and falsy values
   - JavaScript evaluates values in an if condition as truthy or falsy.
   - undefined, null, 0, and an empty string are falsy.
   - Objects, including Buffer objects, are truthy.
   - Therefore, if (buffer) checks whether buffer contains a truthy value,
     but checking req.file directly is clearer when verifying that
     Multer supplied a file object.

7. Why accessing req.file.buffer can throw an error
   - If no image is uploaded, req.file is undefined.
   - Accessing req.file.buffer then throws a TypeError because
     JavaScript cannot read a property from undefined.
   - The error is not stored inside the buffer variable.
   - The assignment fails before the program reaches the if statement.
   - Therefore, I must check whether req.file exists before accessing
     req.file.buffer.

8. Optional chaining
   - req.file?.buffer safely accesses buffer only if req.file exists.
   - If req.file is undefined, the expression evaluates to undefined
     instead of throwing a TypeError.
*/
