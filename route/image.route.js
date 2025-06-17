

import express from "express";

import { imageUpload } from "../controller/image.controller.js";



const router = express.Router();

router.post("/imageUpload", imageUpload);







export default router;