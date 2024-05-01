const mongoose = require('mongoose')

const conversationSchemna = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages',
        default: []
    }]
}, {timestamps: true})

const Conversation = mongoose.model("Conversations", conversationSchemna)

module.exports = Conversation