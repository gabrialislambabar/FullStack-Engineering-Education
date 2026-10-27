import axios from "axios";

const CreatePost = () => {
  
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submit handler executed");

  const formData = new FormData(e.target);

  axios.post("http://localhost:3000/create-post", formData)
    .then((res) => {
      console.log("Server response:", res.data);
    })
    .catch((err) => {
      console.error("Request failed:", err);
    });
};
  return (
    <section className='create-post-section'>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
      <input type="file" name="image" accept="image/*"/>
      <input type="text" name='caption' placeholder="Enter caption" required />
      <button  type='submit' >Submit</button>
      </form>
    </section>
  )
}
export default CreatePost;
