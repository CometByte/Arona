require('dotenv').config();

module.exports = async (client) => {

    console.log("📋 global-reset executed!");
    // fetch channel id
    const channel = await client.channels.fetch(process.env.REMINDER_CHANNEL_ID);

    // validate channel
    if (!channel) return;

    // message
    channel.send({
        content: "Sensei! The day has been reset. Log in rewards are ready to be pick up."
    });
}