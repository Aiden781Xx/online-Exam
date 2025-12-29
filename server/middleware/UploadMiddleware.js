
import multer from multer;
import path from path;

//configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {   
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => { 
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${Date.now()}-${file.originalname}`);
    } 
});

//file Filter 

const fileFilter = (req, file, cb) => {
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

    if (allowedTypes.includes(file.mimetype)) {
       cb(null, true);
    }
    else{
          return cb(new Error('Only image files are allowed!'), false);
    }
   
};

const upload = multer({storage,  fileFilter});
module.exports = upload;