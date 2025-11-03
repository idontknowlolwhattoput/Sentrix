import express from "express";
import dbroute from "./routes/dbroute.js";
import cors from "cors"

const app = express();
const port = 5000;

app.use(cors())
app.use("/users", dbroute);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
