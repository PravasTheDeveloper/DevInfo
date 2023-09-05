const User = require("../models/userSchema")

const notificationControll = async (req, res) => {
    const id = req.id
    const allNotification = await User.findById(id)
    // console.log()
    res.status(200).send(allNotification.notifications)
}

const notificationControllTrue = async (req, res) => {
    const id = req.body.notificationId
    const userId = req.id

    try {
        const userInfo = await User.findById(userId);

        if (!userInfo) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userNotification = userInfo.notifications.find((data) => data._id.toString() === id);

        if (!userNotification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        userNotification.read = true;

        await userInfo.save();

        res.status(200).json(userNotification);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = { notificationControll, notificationControllTrue }