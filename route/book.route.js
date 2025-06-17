import express from "express";

import { deleteBook } from "../controller/book.controller.js";
// import { getFile } from "../controller/book.controller.js";


const router = express.Router();


router.delete("/delete/:id",deleteBook);








export default router;