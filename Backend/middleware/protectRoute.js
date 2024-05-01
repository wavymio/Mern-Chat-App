const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const protectRoute = async (req, res, next) => {
    try {
        const jwtToken = req.cookies.jwt

        if (!jwtToken) {
            return res.status(401).json({ error: "Unauthorised - No token provided" })
        }

        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET)

        if (!decoded) { 
            return res.status(401).json({ error: "Unauthorised - Invalid token" })
        }

        const user = await User.findById(decoded.userId).select("-password")
        
        if (!user) { 
            return res.status(404).json({ error: "User not found" })
        }

        req.user = user
        next()

    } catch (err) {
        console.log("Error in protectRoute middleware", err.message)
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = protectRoute