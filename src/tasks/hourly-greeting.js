require('dotenv').config();
const dateExtras = require('../helper/DateExtras');
const aronaGreeting = require('../helper/aronaGreeting');
const ChannelType = require('../repository/enums/ChannelType');
const { getChannel, getHourlyChannels } = require('../repository/queries/MainQueries');

module.exports = async (client) => {

    console.log("📋 hourly-greeting executed!");
    
    // get date and time
    const currentTime = dateExtras.getTime('Asia/Manila');
    const currentDate = dateExtras.getDate('Asia/Manila');
    const currentDay = dateExtras.getDay('Asia/Manila');

    // get greeting
    const greeting = aronaGreeting(currentDate, currentTime, currentDay);

    // Get all joined guilds
    // await client.guilds.fetch();

    // client.guilds.cache.forEach(async (guild) => {

    //     // fetch channel id
    //     const hourlyChannel = await getChannel(ChannelType.HOURLY, guild.id);

    //     // validations
    //     if (!hourlyChannel) return;

    //     if (!hourlyChannel.hourly_active) return;

    //     if (!hourlyChannel?.hourly_id) return;

    //     const channel = await client.channels.fetch(hourlyChannel.hourly_id);

    //     // validate channel
    //     if (!channel) return;

    //     // message
    //     channel.send({
    //         content: greeting
    //     });
    // });

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
};


