require('dotenv').config();
const ChannelType = require('../repository/enums/ChannelType');
const { logError } = require('../helper/Logger');
const { getChannel, getReminderChannels } = require('../repository/queries/MainQueries');


module.exports = async (client) => {

    console.log("📋 global-reset executed!");
    try {
        // get reminder channel
        const reminderChannels = await getReminderChannels();

        if (reminderChannels) {
            reminderChannels.forEach(async (reminderChannel) => {
                try {
                    // get channel
                    const channel = await client.channels.fetch(reminderChannel.reminder_id);

                    // validate channel
                    if (!channel) return;

                    // send message
                    channel.send({
                        content: "Sensei! The day has been reset. Log in rewards are ready to be pick up."
                    });
                } catch (error) {
                    console.log(`Error in sending reset reminder in ${reminderChannel.server_name}'s reminder channel`);
                    console.log(error);
                }
            });
        }
    } catch (error) {
        console.log('Error in running the task "global-reset"...');
        logError("global-reset", error);
    }

    
}