import { v2 as cloudinary } from 'cloudinary';

const ConnectCloudinary = async () => {
  try {
    // console.log('CLOUDINARY_NAME:', process.env.CLOUDINARY_NAME);
    // console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
    // console.log('CLOUDINARY_SECRET_KEY:', process.env.CLOUDINARY_SECRET_KEY);

    await cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY
    });
    console.log("Cloudinary Connected");
  } catch (error) {
    console.log("Cloudinary Configuration Failed", error);
  }
};

export default ConnectCloudinary;
