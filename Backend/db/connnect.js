const mongoose = require('mongoose')

const connectToMongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to mongodb")
    } catch (err) {
        console.log("Error connecting to database", err)
    }
}

module.exports = connectToMongodb