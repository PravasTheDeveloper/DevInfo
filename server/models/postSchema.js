const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userName: {
        type: String,
        require: true
    },
    profile_pic: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    code: {
        type: String,
    },
    images: [
        {
            type: String,
        },
    ],
    videos: [
        {
            type: String,
        },
    ],
    hashtags:
    {
        type: Array,
    }
    ,
    shares: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        },
    ],
    likes: [
        {
            user: { type: mongoose.Schema.Types.ObjectId },
        },
    ],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
            username: { type: String },
            profile_pic: { type: String }
        },
    ],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
