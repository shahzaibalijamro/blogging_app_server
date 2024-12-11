import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image
const uploadImageToCloudinary = async (localPath) => {
    if (!localPath) return console.log("No file found");
    try {
        const uploadResult = await cloudinary.uploader
            .upload(
                localPath, {
                resource_type: "auto",
            }
            )
            return uploadResult.url;
    } catch (error) {
        console.log(error);
        return null;
    }
    console.log(uploadResult);
}

export {uploadImageToCloudinary}