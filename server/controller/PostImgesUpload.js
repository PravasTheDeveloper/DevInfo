const multer = require('multer');
const path = require('path');
const fs = require("fs");

const generateRandomString = (length) => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.rootUser._id;
        const userDir = path.join(__dirname, `../../client/public/uploads/profiles/${userId}/postUpload`);

        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }

        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "uploadPost" + req.rootUser._id + generateRandomString(30)+".gif");
    }
});


const upload = multer({ storage: storage });

const PostImagesUpload = upload.array('images', 10);

module.exports = PostImagesUpload;