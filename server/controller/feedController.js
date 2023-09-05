const Post = require("../models/postSchema");

const feedController = async (req, res) => {
    try {
        let getfollowingId = req.rootUser
        const followingIds = getfollowingId.following.map(id => id.toString());
        
        const followersIds = getfollowingId.followers
            .filter(follower => follower.status === 'accepted')
            .map(follower => follower.user.toString());
            
        const posts = await Post.find({
            $or: [
                { user: { $in: followingIds } },
                { user: { $in: followersIds } },
                { author: { $in: req.id } },
                { author: { $ne: req.id } }
            ]
        }).sort({ createdAt: -1 });

        if (posts.length > 0) {
            res.json(posts);
            
        } else {
            const otherPosts = await Post.find({ author: { $ne: req.id } });
            res.json(otherPosts);
            
        }
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = feedController