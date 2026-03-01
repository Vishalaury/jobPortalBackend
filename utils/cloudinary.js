// import {v2 as cloudniary} from "cloudinary"
// import dotenv from "dotenv"
// dotenv.conform();

// cloudniary.config({
//     cloud_name:process.env.CLOUD_NAME,
//     api_key:process.env.API_KEY,
//     api_secret:process.env.API_SECRET
// });
// export default cloudniary;


import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // correct

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinary;
