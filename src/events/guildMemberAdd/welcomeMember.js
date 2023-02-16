const getWelcomeMessage = require('../../helper/welcome/getWelcomeMessage');
const ChannelType = require('../../repository/enums/ChannelType');
const { getChannel } = require('../../repository/queries/MainQueries');

require('dotenv').config();

module.exports = async (client, member) => {

    try {
        // fetch guild id
        const guildId = member.guild.id;

        // fetch channel id
        const welcomeChannel = await getChannel(ChannelType.WELCOME, guildId);

        // validations
        if (!welcomeChannel) return;

        if (!welcomeChannel.welcome_active) return;

        if (!welcomeChannel?.welcome_id) return;

        const channel = await client.channels.fetch(welcomeChannel.welcome_id);

        // validate channel
        if (!channel) return;

        // welcome the new member
        channel.send({
            content: getWelcomeMessage(client, member)
        });

    } catch (error) {
        console.log("Error in welcoming a new member...");
        console.log(error);
    }
};