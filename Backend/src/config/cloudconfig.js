const cloudinary = require('cloudinary').v2;
const streamifier = require("streamifier");
require("dotenv").config();
const fs=require("fs");
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDAPI_KEY,
    api_secret:process.env.API_SECRET
})
const uploadcloudinary = (buffer) => {

  return new Promise((resolve, reject) => {

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto"
      },

      (error, result) => {

        if (error) { 
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);

  });

};
module.exports={uploadcloudinary};