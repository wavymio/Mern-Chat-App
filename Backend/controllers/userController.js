const User = require("../models/user.model")

const getUsersForSideBar = async (req, res) => {
    try {
        console.log("Received")
        const loggedInUserId = req.user._id
        console.log(loggedInUserId)
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')
        res.status(200).json(filteredUsers)
    } catch (err) {
        console.error("Error in getUsersForSidebar controller: ", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { getUsersForSideBar }