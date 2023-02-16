require('dotenv').config();
const ChannelType = require('../repository/enums/ChannelType');
const { getChannel } = require('../repository/queries/MainQueries');


module.exports = async (client) => {

    console.log("📋 global-reset executed!");

    // Get all joined guilds
    await client.guilds.fetch();

    client.guilds.cache.forEach(async (guild) => {

        // fetch channel id
        const reminderChannel = await getChannel(ChannelType.REMINDER, guild.id);

        // validations
        if (!reminderChannel) return;

        if (!reminderChannel.reminder_active) return;

        if (!reminderChannel?.reminder_id) return;

        const channel = await client.channels.fetch(reminderChannel.reminder_id);

        // validate channel
        if (!channel) return;

        // message
        channel.send({
            content: "Sensei! The day has been reset. Log in rewards are ready to be pick up."
        });
    });
}