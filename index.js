import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import cloudinaryConnect from "./config/cloudinary.js"
import bookRoute from "./route/book.route.js";
import imageRoute from "./route/image.route.js"
import userRoute from "./route/user.route.js";
import fileroute from "./route/pdf.route.js"






const app = express();

app.use(cors());
app.use(cookieParser());
// app.use(express.json());
app.use("/files", express.static("files"));

// app.use("/files",express.static("files"));

dotenv.config();






const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;




// connect to mongoDB
try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}



// Only parse JSON for non-multipart routes
app.use((req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('multipart/form-data')) {
    next(); // skip parsing
  } else {
    bodyParser.json({ limit: '50mb' })(req, res, next);
  }
});





// cloudinaryyy....... ........................................................................................................

cloudinaryConnect();

// ..........................................................................................................................





                        

// defining routes .......................................
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/img", imageRoute);
app.use("/fileupload",fileroute);


app.get("/",(req,res)=>{
  return res.json({
    sucess:true,
    message:"sucessfully deployed"
  })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});