import express from "express";
import cors from "cors";
import posts from "./routes/posts.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.json({ limit: '2mb' }));
// parameterLimit: 2000? 
app.use(express.urlencoded({ limit: '2mb', extended: true }));
app.use("/post", posts);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});