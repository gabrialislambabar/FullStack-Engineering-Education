import express from "express"
import multer from "multer"
import uploadFile from "./services/storage.service.js"
import postModel from "./models/post.model.js"

// Saving server into a variable
const app = express()
// Saving multer middleware for reading 'form-data' into upload variable
const upload = multer({ storage: multer.memoryStorage() })
// Json reading middleware
app.use(express.json());

//-----------------------------------------------------------------------
// POST operation 
// ---------------------------------------------------------------------

app.post("/create-post", upload.single("image"), async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    
    const buffer = req.file;
    const caption = req.body.caption;

    if (buffer === undefined) {
        return res.status(400).json({
         message: "Image cannot be found"
        })
    }

    if (caption === undefined) {
        return res.status(400).json({
        message: "Caption cannot be found"
        })
     }

    if (buffer && caption) {
    const result = await uploadFile(req.file.buffer);

    const post = await postModel.create({
        image : result.url,
        caption : req.body.caption,
  })

  res.status(201).json({
    message: "Post created successfully",
    post: post
  })
  }
  
})

//-----------------------------------------------------------------------
// GET operation 
// ----------------------------------------------------------------------

app.get("/posts", async(req, res) => {
    const posts = await postModel.find() 

    return res.status(200).json({
      message: "post fetched successfully",
      posts
  })
})

export default app;
