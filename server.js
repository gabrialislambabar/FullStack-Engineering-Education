import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

await connectDB();

app.listen(3000, () => {
  console.log("Port is running");
});
