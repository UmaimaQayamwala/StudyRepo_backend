import express from "express";
// import fileUpload from "express-fileupload";

const router = express.Router();
// import { getFile } from "../controller/book.controller.js";
// import { uploadFile } from "../controller/book.controller.js";

import { getFile } from "../controller/fupload.controller.js";
import { uploadFile } from "../controller/fupload.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";

import path from "path";

import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });






router.post("/upload-files",authenticate , isAdmin, upload.single("file"),uploadFile);

router.get("/get-files",getFile);


export default router;