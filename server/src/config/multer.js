import multer from "multer";

const storageIcon = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/icons/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

const storageAvatar = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/avatars/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

const storageCV = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/cv/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

// const fileFilter = (req, file, cb) => {
//   const allowFile = ["image/jpg", "image/png"];

//   if (allowFile.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Chi duoc upload file hinh anh"), false);
//   }
// };


const icon = multer({ storage: storageIcon, limits: { fileSize: 5 * 1024 * 1024 } }); // Giới hạn kích thước tệp là 5MB
const avatar = multer({ storage: storageAvatar, limits: { fileSize: 5 * 1024 * 1024 } }); // Giới hạn kích thước tệp là 5MB
const cv = multer({ storage: storageCV, limits: { fileSize: 5 * 1024 * 1024 } });

export {
    icon,
    avatar,
    cv
}