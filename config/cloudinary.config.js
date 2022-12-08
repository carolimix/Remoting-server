const cloudinary = requir("cloudinary").v2;
const { CludinaryStorage, CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = requiere("multer");

cloudinary.config( {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowed_formats: ["jpg", "png"],
        folder: "remoting",
        resource_type: "raw",
    }
});

module.exports = multer({ storage});