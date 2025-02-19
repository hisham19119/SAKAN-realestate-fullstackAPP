// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = path.join(__dirname, "../uploads");
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     const mimetype = filetypes.test(file.mimetype);
//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb(
//         "Error: File upload only supports the following filetypes - " +
//           filetypes
//       );
//     }
//   },
// });

// module.exports = upload;

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");
const streamifier = require("streamifier");
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Middleware (Stores files in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to Upload Files to Cloudinary
const uploadToCloudinary = async (req, res, next) => {
  console.log("🚀 req.files before Cloudinary:", req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  try {
    const uploadPromises = Object.keys(req.files).map(async (key) => {
      const files = req.files[key];

      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "uploads" }, // Cloudinary Folder
              (error, result) => {
                if (error) {
                  console.error("Cloudinary Upload Error:", error);
                  reject(error);
                } else {
                  resolve(result.secure_url); // Cloudinary URL
                }
              }
            );

            streamifier.createReadStream(file.buffer).pipe(stream);
          });
        })
      );

      req.files[key] = uploadedFiles; // Replace with Cloudinary URLs
    });

    await Promise.all(uploadPromises);
    console.log("✅ Uploaded files:", req.files); // Debugging
    next();
  } catch (error) {
    return res.status(500).json({ message: "Cloudinary upload failed", error });
  }
};

module.exports = { upload, uploadToCloudinary };
