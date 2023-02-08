const getWelcomeMessage = require('../../helper/welcome/getWelcomeMessage');

require('dotenv').config();

module.exports = async (client, member) => {

    // fetch welcome channel id
    const channel = await client.channels.fetch(process.env.WELCOME_CHANNEL_ID);

    // check if there's a channel set up
    if (!channel) return;

    // welcome the new member
    channel.send({
        content: getWelcomeMessage(client, member)
    });
};