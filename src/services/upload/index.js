import multer from 'multer';
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });
export { upload };
