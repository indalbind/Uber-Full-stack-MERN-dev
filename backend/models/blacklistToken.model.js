const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '86400' // Automatically remove tokens after 24 hours ( we write in seconds)

    }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);