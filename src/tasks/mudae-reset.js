require('dotenv').config();

module.exports = async (client) => {

    console.log("mudae-reset executed");
    // fetch channel id
    const channel = await client.channels.fetch(process.env.REMINDER_CHANNEL_ID);

    // validate channel
    if (!channel) return;

    // message
    channel.send({
        content: "It's time for the daily mudae reset, Sensei!"
    });
}