import multer from "multer";

// Multer memory storage setup
const storage = multer.memoryStorage();

// Middleware to handle file upload
export const singleUpload = (req, res, next) => {
  const upload = multer({ storage }).single("avatar"); // "avatar" should match the frontend key for file upload

  // Apply the upload middleware
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, message: "Error uploading file" });
    }
    // If no file is uploaded, make sure req.file is set to null to avoid breaking the request
    if (!req.file) {
      req.file = null;
    }
    next(); // Proceed to the next middleware/controller function
  });
};
