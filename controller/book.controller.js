
import PdfSchema from "../model/pdfdetails.js";
import { v2 as cloudinary } from "cloudinary";



export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params; // get ID from URL

    const pdf = await PdfSchema.findOne({ _id: id });
   
    const pdfurl = pdf.pdfurl;
    const imgurl = pdf.url;

    // pdfurl public id
    const parts = pdfurl.split("/");
    const fileNameWithExt = parts[parts.length - 1]; // sample.pdf
    const folder = parts[parts.length - 2]; // cloudinary-node-upload-pdf-demo
    const publicId = `${folder}/${fileNameWithExt.split(".")[0]}`; // cloudinary-node-upload-pdf-demo/sample

 
//  deleting pdf using public id
    const result = await cloudinary.uploader.destroy(publicId, {
      
    });

    console.log("✅ Delete result:", result);



    // image url public id
    const partsimg = imgurl.split("/");
    const fileWithExtension = partsimg[partsimg.length - 1]; // e.g., sample_image.jpg
    // const folderimg = partsimg[partsimg.length - 2]; // e.g., folder
    const fileName = fileWithExtension.split(".")[0];
    const publicIdimg = `${fileName}`;




    // deleting image from cloudinary using its public id
    const resultimg = await cloudinary.uploader.destroy(publicIdimg, {
      resource_type: "image",
    });
    console.log("Delete result:", resultimg);
  

    // deleting from db
    const deletedBook = await PdfSchema.findByIdAndDelete(id);
    
  

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });



  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting book", error });
  }
};

