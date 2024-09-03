const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const roomsChatSchema = new mongoose.Schema({
    title: String,
    // avatar: String,
    typeRoom: String,
    // status: String,
    users: [
        {
            user_id: String,
            role: String,
        }
    ],
    deleted: {
        type: Boolean,
        default: false,
    },
    deleteAt: Date,
}, {
    timestamps: true,
})

const RoomsChat = mongoose.model('RoomsChat', roomsChatSchema , "rooms-chat")

module.exports = RoomsChat;