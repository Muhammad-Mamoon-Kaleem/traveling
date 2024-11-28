import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage
}).array('images', 3); // Ensure this field name matches the name in the form

const uploadSingle = multer({
  storage: storage
}).single('image');

export {upload,uploadSingle} 
