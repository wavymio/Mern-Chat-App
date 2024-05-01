const Conversation = require("../models/conservation.model")
const Message = require("../models/message.model")

const getMessage = async (req, res) => {
    try {
        const {id: userToChatId} = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages")

        if (!conversation) {
            return res.status(200).json([])
        }

        const { messages } = conversation

        res.status(200).json(messages)
    } catch (err) {
        console.log("Error in getMessage Controller", err.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // This will take longer
        // await conversation.save() 1sec to run
        // await newMessage.save() 1 sec to run
        // Do this instead because total 2 secs

        // this will run bot promises at the same time so it'll take a sec
        await Promise.all([conversation.save(), newMessage.save()])

        return res.status(201).json({ newMessage })

    } catch (err) {
        console.log("Error in sendMessage controller", err.message)
        res.status(500).json({error: "Internal server error"})
    }
}

module.exports = {
    sendMessage,
    getMessage,
}