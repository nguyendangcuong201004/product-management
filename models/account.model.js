const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: String,
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
        type: Boolean.apply,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true
})

const Account = mongoose.model('Account', accountSchema , "accounts")

module.exports = Account;