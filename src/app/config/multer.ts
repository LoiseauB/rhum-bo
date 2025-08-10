import multer from 'multer';
import path from 'path';

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (file.mimetype.startsWith('image/') && allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error('Only images are allowed!'));
    }
  },
});

export default upload;
