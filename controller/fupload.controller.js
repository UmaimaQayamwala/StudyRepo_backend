import PdfSchema from "../model/pdfdetails.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


export const uploadFile = async (req, res) => {
  
  const url = req.body.url;
  const filePath = req.file.path;
  const title = req.body.title;
  const fileName = req.file.filename;
  const options = req.body.options;

 
 
  try {
  
  
    // uploading in cloudinary
    const pdfcloud = await cloudinary.uploader.upload(filePath, {
      folder: "cloudinary-node-upload-pdf-demo",
      use_filename: true,
      unique_filename: false,
    });
    console.log("clouddd-------------", pdfcloud.url);


  // making entry in db
      const pdf = await PdfSchema.create({
      title: title,
      pdf: fileName,
      options: options,
      url: url,
      pdfurl:pdfcloud.url
    });
   


    // delete from temporary memory
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("Temp file deleted.");
      }
    });

    res.send({ status: "ok" });
  } catch (error) {
    console.log("error",error)
    res.json({ status: error, message: error });
  }




};




export const getFile = async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
};
