import express from "express";
import connectDb from "./db/db.js";
import cors from "cors";
import path from "path";
import { PORT } from "./constants/constants.js";
import mainRouter from "./routes/url.routes.js";

import staticRouter from "./routes/static.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/api/v1", mainRouter);
app.use("/", staticRouter);

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Start the server
app.listen(PORT, () => {
  connectDb();
  console.log(`Server is listening in DopeMode on ${PORT}`);
});
