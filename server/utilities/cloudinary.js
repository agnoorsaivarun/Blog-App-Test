const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config()

cloudinary.config({
    cloud_name: process.env.cloudname,
    api_key: process.env.apikey,
    api_secret: process.env.apisecret,
  });
  
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: " blog-app-test",
    },
  });
  
  module.exports = { cloudinary, storage };