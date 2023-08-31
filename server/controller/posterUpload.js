const multer = require('multer');
const path = require('path');
const fs = require("fs");

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    const userId = req.rootUser._id;
    const userDir = path.join(__dirname, `../../client/public/uploads/profiles/${userId}/profileelement`);
    
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    
    cb(null, userDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() +"profilePoster"+ req.rootUser._id + ".gif");
  },
});

const upload = multer({ storage });

module.exports = upload.single('posterimage');