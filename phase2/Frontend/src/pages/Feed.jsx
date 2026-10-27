import { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      _id: "1",
      image:
        "https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg",
      caption: "cowboy",
    },
  ]);

useEffect(() => {
  axios
    .get("http://localhost:3000/posts")
    .then((res) => {
      console.log("API response:", res.data);
      setPosts(res.data.posts);
    })
    .catch((error) => {
      console.error("Failed to fetch posts:", error);
    });
}, []);
  return (
    <section className="feed-section">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <img src={post.image} alt={post.caption} />
            <p>{post.caption}</p>
          </div>
        ))
      ) : (
        <h1>No post available yet</h1>
      )}
      <h1>Feed</h1>
    </section>
  );
};

export default Feed;
