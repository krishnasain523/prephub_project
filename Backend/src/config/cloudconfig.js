const cloudinary = require('cloudinary').v2;

require("dotenv").config();
const fs=require("fs");
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDAPI_KEY,
    api_secret:process.env.API_SECRET
})
const uploadcloudinary=async(localfilepath)=>{
    try {
         if(!localfilepath)
   {
    throw new expresserr(404,"file not found");
   }
    const response=await cloudinary.uploader.upload(localfilepath,{resource_type:"auto"});
    console.log("the file upload successfully");
    await fs.unlinkSync(localfilepath);
 return response;

    } catch (error) {
        console.log(error)
    }
   
    
}
module.exports={uploadcloudinary};