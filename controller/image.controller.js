import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";

dotenv.config();

//........IMAGE UPLOAD.............
export const imageUpload = async (req, res) => {
  
  const { image } = req.body;
 
  try {
    const uploadedImage = await cloudinary.uploader.upload(image, {
      allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
    });

    res.status(200).json(uploadedImage);
  } catch (err) {
    console.log("Error",err);
    res.status(200).json({ message: "Image upload failed" });
  }
};
