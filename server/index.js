import express from "express";
import connectDb from "./db/db.js";
import { PORT } from "./constants/constants.js";
import mainRouter from "./routes/url.routes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", mainRouter);
connectDb();

app.listen(PORT, () => {
  console.log(`Server is listening in  DopeMode on ${PORT}`);
});
