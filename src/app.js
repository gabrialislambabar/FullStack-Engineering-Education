import express from "express";
import multer from "multer";
import uploadFile from "./services/storage.service.js";
import postModel from "./models/post.model.js";

// Saving server into a variable
const app = express();
// Saving multer middleware for reading 'form-data' into upload variable
const upload = multer({ storage: multer.memoryStorage() });
// Json reading middleware
app.use(express.json());

//-----------------------------------------------------------------------
// POST operation
// ---------------------------------------------------------------------

app.post("/create-post", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  console.log(req.file?.originalname);

  const buffer = req.file;
  const caption = req.body.caption;

  if (buffer === undefined) {
    return res.status(400).json({
      message: "Image cannot be found",
    });
  }

  if (caption === undefined) {
    return res.status(400).json({
      message: "Caption cannot be found",
    });
  }

  if (buffer && caption) {
    const result = await uploadFile(req.file.buffer, req.file.originalname);

    const post = await postModel.create({
      image: result.url,
      caption: req.body.caption,
    });

    res.status(201).json({
      message: "Post created successfully",
      post: post,
    });
  }
});

//-----------------------------------------------------------------------
// GET operation
// ----------------------------------------------------------------------

app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await postModel.findById(id);
    if (posts === null) {
      res.status(404).json({
        message: "404 not found",
      });
    } else {
      return res.status(200).json({
        message: "post fetched successfully",
        posts,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "404 Bad Request",
    });
  }
});

//-----------------------------------------------------------------------
// DELETE/posts/:id operation
// ----------------------------------------------------------------------

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const delPost = await postModel.findByIdAndDelete(id);
    if (delPost === null) {
      res.status(404).json({
        message: "404 not found",
      });
    } else {
      res.status(200).json({
        message: "post deleted successfully",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "404 Bad request",
    });
  }
});

//-----------------------------------------------------------------------
// PATCH/posts/:id operation
// ----------------------------------------------------------------------

app.patch("/posts/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const caption = req.body.caption;
    const updateData = { caption };
    const updatePost = await postModel.findByIdAndUpdate(id, updateData);

    if (updatePost === null) {
      res.status(404).json({
        message: "404 not found",
      });
    } else {
      res.status(200).json({
        message: "post updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "404 Bad request",
    });
  }
});

export default app;
