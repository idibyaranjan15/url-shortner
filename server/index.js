import express from "express";
import connectDb from "./db/db.js";

const app = express();
app.use(express.json());
connectDb();
app.listen("/", () => {
  console.log(`Server is listening in  DopeMode on ${PORT}`);
});
