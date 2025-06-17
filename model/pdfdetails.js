import mongoose from "mongoose";

const PdfDetailsSchema =  mongoose.Schema(
  {
  pdf: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  options:{
    type: String,
    required: true,
    trim: true,
  },
  
   url:{
    type:String,
    // required: true,
   },
   pdfurl:{
     type:String,
   }
},
{
  collection: "PdfDetails",
  timestamps: true, // adds createdAt & updatedAt fields
}

);

const PdfSchema=mongoose.model("pdfdetails", PdfDetailsSchema);
export default PdfSchema;