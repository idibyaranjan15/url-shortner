import mongoose from "mongoose";
import { DB_NAME, MONGODB_URI } from "../constants/constants.js";

const connectDb = async () => {
  try {
    const connectionInstanace = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `DB Connected Successfully !!! ${connectionInstanace.connection.host}`
    );
  } catch (error) {
    console.log(`Error Coonecting with Database !!!`, error);
  }
};
export default connectDb;
