const User = require("../models/userSchema");

const findFriends = async (req, res) => {
    try {
        const user = await User.findById(req.id);
        const followingIds = user.following.map(followedUser => followedUser.toString());
        const followersIds = user.followers.map(follower => follower.user.toString());

        const usersNotFollowed = await User.find({
            $and: [
                { _id: { $ne: req.id } },    // Exclude the current user
                { _id: { $nin: followingIds } },    // Exclude users you are following
                { _id: { $nin: followersIds } },    // Exclude users who are following you
            ]
        });

        res.json(usersNotFollowed);
        // console.log(usersNotFollowed)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const followUser = async (req, res) => {
    try {
        const id = req.body.id
        const userToFollow = await User.findById(id);

        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found' });
        } else {

            // req.rootUser.following.push(userToFollow._id);
            // userToFollow.followers.push({ user: req.user._id });
            // await req.rootUser.save();
            // await userToFollow.save();
            req.rootUser.following.forEach(element => {
                if (element.toString() === id.toString()) {
                    res.status(401).json({ message: 'Your are already following' })
                }
            });

            req.rootUser.followers.forEach(element => {
                if (element.toString() === id.toString()) {
                    res.status(401).json({ message: 'This User Already Following you' })
                }
            });

            req.rootUser.following.push(userToFollow._id);
            userToFollow.followers.push({ user: req.id });
            await req.rootUser.save();
            await userToFollow.save();
            // console.log(req.rootUser)
            // console.log(userToFollow)
            res.json({ message: 'Followed successfully' });
        }

    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const unfollowUser = async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.userId);
        if (!userToUnfollow) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user.following = req.user.following.filter(id => id.toString() !== req.params.userId);
        userToUnfollow.followers = userToUnfollow.followers.filter(follower => follower.user.toString() !== req.user._id.toString());
        await req.user.save();
        await userToUnfollow.save();
        res.json({ message: 'Unfollowed successfully' });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { findFriends, followUser, unfollowUser }