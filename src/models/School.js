const { Schema, model } = require('mongoose');

const schoolSchema = new Schema({
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
    shortened_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    logo: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

module.exports = model('School', schoolSchema);