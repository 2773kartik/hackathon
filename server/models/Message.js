const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message : {
        type: String,
        required: true
    },
    recipient : {
        type: String,
        required: true
    },
});

module.exports = Message = mongoose.model('messages', MessageSchema);