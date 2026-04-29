import cloudinary from "../configs/cloudinary.js";
import streamifier from "streamifier";

// helper upload từ buffer
const streamUpload = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// upload IMAGE
export const uploadImage = async (file) => {
  const res = await streamUpload(file.buffer, {
    folder: "articles/images",
  });

  return res.secure_url;
};

// upload FILE (workflow JSON)
export const uploadFile = async (file) => {
  const res = await streamUpload(file.buffer, {
    folder: "articles/workflows",
    resource_type: "raw",
    public_id: file.originalname.split(".")[0],
  });

  return res.secure_url;
};