
// 1. Trace `POST /create-post` step by step, from the request arriving to the response leaving. Name each file it passes through.



/*

MY UNDERSTANDING OF POST /create-post

1. console.log(req.body) and console.log(req.file)
   - These are used for debugging.
   - req.body gives us information about the text data, such as the caption.
   - req.file gives us information about the uploaded image, including its name and buffer.
   - This information helps us understand what data we have received and makes debugging and further code writing easier.

2. req.file.buffer
   - The buffer contains the actual bytes of our uploaded image.
   - We pass this buffer to the uploadFile() function so that the image can be uploaded to ImageKit.
   - We imported the uploadFile function from our ImageKit storage service file.

3. const result = await uploadFile(req.file.buffer)
   - The image is uploaded to ImageKit through the uploadFile function.
   - After the upload, the returned data is stored in the result variable.
   - We can access the uploaded image's URL using result.url.

4. postModel.create()
   - We have already created the Post schema and model in a separate model file.
   - The model provides methods such as create(), find(), findByIdAndDelete(),
     and findByIdAndUpdate() for database operations.
   - postModel.create() creates and saves a post document in MongoDB.
   - The image field receives result.url, and the caption field receives
     req.body.caption.
   - The image itself is stored on ImageKit, while its URL is stored in MongoDB.

5. const post
   - The created post is assigned to the post variable.
   - The post contains the document created through postModel.create().

6. res.status(201).json()
   - We send a response with status code 201 and a success message.
   - The post is included in the response so that Postman receives the
     created post as JSON.
   - We are sending the already-created post, not creating it again.
*/
