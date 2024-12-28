import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {  
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);  //not a very good option to use the orginal name, as there can be many files with same name. Professionally we add a uniqueSuffix or uniqueId to it, so as to keep them with unique names
    }
  })
  
//   export const upload = multer({ storage: storage })   //since the key and value are the same, and we are in ES6, so we cam use the shorthand synatx provided by ES6
export const upload = multer({ storage, })