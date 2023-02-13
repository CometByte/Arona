const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    version: {
        type: String,
    },
    japanese_name: {
        type: String,
    },
    school: {
        type: String,
    },
    year: {
        type: Number,
    },
    club: {
        type: String,
    },
    age: {
        type: Number,
        default: 0,
    },
    birth_day: {
        type: Number,
    },
    birth_month: {
        type: Number,
    },
    height_cm: {
        type: Number,
    },
    artist: {
        type: String,
    },
    seiyuu: {
        type: String,
    },
    hobbies: {
        type: [String],
    },
    likes: {
        type: [String],
    },
    playable: {
        type: Boolean,
        required: true,
    },
    icon: {
        type: String,
    },
    portrait: {
        type: String,
    },
});

module.exports = model('Student', studentSchema);