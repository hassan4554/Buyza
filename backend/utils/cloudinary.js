const cloudinary = require("cloudinary");

const uploadBulkImages = async (images, bucket_name) => {
  const uploadPromises = images.map((image) => {
    return cloudinary.v2.uploader.upload(image, {
      folder: bucket_name,
    });
  });

  const result = await Promise.all(uploadPromises);
  return result.map((img) => {
    return {
      public_id: img.public_id,
      url: img.secure_url,
    };
  });
};

const uploadSingleImage = async (image, bucket_name) => {
  const myCloud = await cloudinary.v2.uploader.upload(image, {
    folder: bucket_name,
  });
  return {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };
};

const deleteSingleImage = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
  } catch (err) {
    console.log("Deletion failed:", err);
  }
};

const deleteBulkImages = async (images) => {
  const deletePromises = images.map((image) => {
    return cloudinary.uploader.destroy(image.public_id);
  });

  await Promise.all(deletePromises);
};

module.exports = {
  uploadBulkImages,
  uploadSingleImage,
  deleteSingleImage,
  deleteBulkImages,
};
