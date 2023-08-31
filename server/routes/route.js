const express = require("express");
const { register, signin, about } = require("../controller/auth");
const router = express.Router()
const path = require('path');
const authenticate = require("../middleware/authenticate");
const profilePicUpload = require("../controller/profilePicUpload");
const User = require("../models/userSchema");
const posterUpload = require("../controller/posterUpload");
const postUploadControl = require("../controller/postUploadControl");
const Post = require("../models/postSchema");

const multer = require('multer');
const PostImgesUpload = require("../controller/PostImgesUpload");
const { findFriends, followUser } = require("../controller/friendsController");
const feedController = require("../controller/feedController");


router.post("/register", register);
router.post("/signin", signin);
router.post('/uploadPost', authenticate, postUploadControl);

router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser)
})



router.get('/codesH', async (req, res) => {
  try {
    const codes = await Post.find().sort({ createdAt: -1 });
    // console.log(codes)
    res.send(codes)
  } catch (error) {
    console.error('Error uploading code snippet', error);
    res.status(500).json({ message: 'An error occurred while uploading the code snippet' });
  }
});

// router.post('/upload', upload.single('image'), (req, res) => {
//   const imagePath = req.file.path;

//   res.json({ imagePath });
// });

router.post('/uploadprofilepic', authenticate, profilePicUpload, async (req, res) => {
  const imagePath = req.file.path;
  const fileName = path.basename(imagePath);

  const id = req.rootUser._id
  const userSearch = await User.findById({ _id: id })
  try {
    userSearch.profile_pic = fileName;

    const userSaved = await userSearch.save()

    if (userSaved) {
      res.status(200).json({ messege: "Sucess" })
    } else {
      res.status(400).json({ messege: "Faild" })
    }
  } catch (err) {
    res.json(err)
  }

});

router.post('/uploadposter', authenticate, posterUpload, async (req, res) => {
  const imagePath = req.file.path;
  const fileName = path.basename(imagePath);

  const id = req.rootUser._id
  const userSearch = await User.findById({ _id: id })

  try {
    userSearch.poster_pic = fileName;

    const userSaved = await userSearch.save()

    if (userSaved) {
      res.status(200).json({ messege: "Sucess" })
    } else {
      res.status(400).json({ messege: "Faild" })
    }

  } catch (err) {
    res.json(err)
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie('jwtoken'); // Clear the JWT token cookie
  res.status(200).json({ message: 'Logout successful' });
})

router.post("/singlepost" , async(req , res) => {
  try{
    const id = req.body.paramId
    const response = await Post.findById({_id : id})
    res.status(200).send(response)
  }catch(err){
    res.status(500).json({message : err})
  }
})


router.post('/postupload', authenticate, PostImgesUpload, postUploadControl);
router.get('/users-not-followed' , authenticate , findFriends)
router.get("/feed" , authenticate , feedController)
router.post("/followuser" , authenticate , followUser)

module.exports = router