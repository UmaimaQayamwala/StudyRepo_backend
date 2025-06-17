import mongoose from "mongoose";
// import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();




 const fileSchema = new mongoose.Schema({
    imageUrl: {
      type: String,
    },
  });
  
  // Creating a model (collection name will be `files` if you name it `File`)
  const File = mongoose.model("File", fileSchema);
  
  export default File;