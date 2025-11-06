import express from "express";
import cors from "cors"
import helmet from "helmet";

import dbroute from "./routes/dbroute.js";
import employeeRoutes from "./routes/employeeRoutes.js"

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: false, // temporarily disable CSP
  })
);


app.use("/users", dbroute);
app.use("/employees", employeeRoutes)

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
