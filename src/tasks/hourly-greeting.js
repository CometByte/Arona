require('dotenv').config();
const dateExtras = require('../helper/DateExtras');
const aronaGreeting = require('../helper/aronaGreeting');
const ChannelType = require('../repository/enums/ChannelType');
const { getChannel, getHourlyChannels } = require('../repository/queries/MainQueries');
const { logError } = require('../helper/Logger');

module.exports = async (client) => {

    console.log("📋 hourly-greeting executed!");
    
    try {
        // get date and time
        const currentTime = dateExtras.getTime('Asia/Manila');
        const currentDate = dateExtras.getDate('Asia/Manila');
        const currentDay = dateExtras.getDay('Asia/Manila');

        // get greeting
        const greeting = aronaGreeting(currentDate, currentTime, currentDay);

        // get reminder channel
        const hourlyChannels = await getHourlyChannels();

        if (hourlyChannels) {
            hourlyChannels.forEach(async (hourlyChannel) => {
                try {
                    // get channel
                    const channel = await client.channels.fetch(hourlyChannel.hourly_id);

                    // validate channel
                    if (!channel) return;

                    // message
                    channel.send({
                        content: greeting
                    });
                } catch (error) {
                    console.log(`Error in sending hourly greeting in ${hourlyChannel.server_name}'s hourly channel`);
                    console.log(error);
                }
            });
        }
    } catch (error) {
        console.log('Erorr in running the task "hourly-greeting"...');
        logError("birthday-reminder", error);
    }
};


