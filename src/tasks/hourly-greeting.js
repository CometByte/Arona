require('dotenv').config();
const dateExtras = require('../helper/DateExtras');
const aronaGreeting = require('../helper/aronaGreeting');

module.exports = async (client) => {

    console.log("📋 hourly-greeting executed!");
    // fetch channel id
    const channel = await client.channels.fetch(process.env.HOURLY_CHANNEL_ID);

    // validate channel
    if (!channel) return;

    const currentTime = dateExtras.getTime('Asia/Manila');
    const currentDate = dateExtras.getDate('Asia/Manila');
    const currentDay = dateExtras.getDay('Asia/Manila');
    const greeting = aronaGreeting(currentDate, currentTime, currentDay);

    // message
    channel.send({
        content: greeting
    });
};


