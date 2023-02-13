const { Schema, model } = require('mongoose');

const clubSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    japanese_name: {
        type: String,
    },
    alternative_name: {
        type: String,
    },
    school: {
        type: String,
    },
    description: {
        type: String,
    },
    leader: {
        type: [String],
    },
    members: {
        type: [String],
    },
    active: {
        type: Boolean,
        default: true,
    },
});

module.exports = model('Club', clubSchema);