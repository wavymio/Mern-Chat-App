const bcrypt = require('bcryptjs')
const User = require("../models/user.model")
const generateTokenAndSetCookie = require('../utils/generateToken')

const signUp = async (req, res) => {
    try {
        const  { fullName, username, password, confirmPassword, gender } = req.body
        console.log({fullName, username, password, confirmPassword, gender})
        if (password !== confirmPassword) {
            return res.status(400).json({error: "Passwords do not match"})
        }

        const user = await User.findOne({username: username})

        if (user) {
            return res.status(400).json({error: "Username already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword, 
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            return res.status(400).json({error: "Invalid User Data"})
        }
    } catch (err) {
        console.log("Error in signup controller", err.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')
        
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid Credentials"})
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })
    } catch (err) {
        console.log("Error in login controller", err.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie("jwt")
        res.status(200).json({message: "Logged out successfully"})
    } catch (err) {
        console.log("Error in logout controller", err.message)
        res.status(500).json({error: "Internal server error"})
    }
}

module.exports = {
    loginUser,
    signUp,
    logout
}