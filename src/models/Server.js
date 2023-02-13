const { Schema , model } = require('mongoose');
const { getDateTime } = require('../helper/DateExtras');

const serverSchema = new Schema({
    server_id: {
        type: String,
        required: true,
    },
    server_name: {
        type: String,
        required: true,
    },
    registry_date: {
        type: Date, 
        required: true,
        default: getDateTime('Asia/Manila')
    },
    owner: {
        type: String, 
        required: true, 
    },
    active: {
        type: Boolean,
        required: true,
    },
    welcome_id: {
        type: String,
    },
    welcome_active: {
        type: Boolean,
        default: false,
    },
    hourly_id: {
        type: String,
    },
    hourly_active: {
        type: Boolean,
        default: false,
    },
    reminder_id: {
        type: String,
    },
    reminder_active: {
        type: Boolean,
        default: false,
    },
    birthday_id: {
        type: String,
    },
    birthday_active: {
        type: Boolean,
        default: false,
    },
});

module.exports = model('Server', serverSchema);