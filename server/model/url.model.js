import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
});

const Url = mongoose.model("Url", urlSchema);
export default Url;
