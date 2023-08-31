const Post = require("../models/postSchema");
const path = require('path');


const postUploadControl = async (req, res) => {
    try {
        const { title, code, hashtags } = req.body;
        const images = req.files.map(file => path.basename(file.path));
        const author = req.id
        const userName = req.userName;
        const profile_pic = req.profile_pic;
        const newPostUpload = new Post({
            author,
            userName,
            profile_pic,
            title,
            code,
            images,
            hashtags
        });
        await newPostUpload.save();
        // console.log(newPostUpload)
        res.status(200).json({ message: 'Code snippet uploaded successfully' });
    } catch (error) {
        console.error('Error uploading code snippet', error);
        res.status(500).json({ message: 'An error occurred while uploading the code snippet' });
    }
}

module.exports = postUploadControl