const Server = require('../../models/Server');
const ChannelType = require('../enums/ChannelType');

module.exports = {
    getServer: async (id) => {
        try {
            if (!id) return null;

            return getServer = await Server.findOne({ server_id: id }).exec();

        } catch (error) {
            console.log(`Error in "getServer" function`);
            console.log(error);
        }
    },
    getChannel: async (channelType, guildId) => {
        try {

            switch (channelType) {
                case ChannelType.HOURLY:
                    return await Server.findOne({ server_id: guildId }).select('hourly_id hourly_active').exec();
    
                case ChannelType.BIRTHDAY:
                    return await Server.findOne({ server_id: guildId }).select('birthday_id birthday_active').exec();
            
                case ChannelType.REMINDER:
                    return await Server.findOne({ server_id: guildId }).select('reminder_id reminder_active').exec();
    
                case ChannelType.WELCOME:
                    return await Server.findOne({ server_id: guildId }).select('welcome_id welcome_active').exec();

                default:
                    return null;
            }
            
        } catch (error) {
            console.log(`Error in "getChannel" function`);
            console.log(error);
            return null;
        }
    },
    getBirthdayChannels: async () => {
        try {
            return await Server.find({ "birthday_active": true, "birthday_id": {$ne : null}}, 'server_name birthday_id');
        } catch (error) {
            console.log(`Error in "getBirthdayChannels" function`);
            console.log(error);
            return null;
        }
    },
    getReminderChannels: async () => {
        try {
            return await Server.find({ "reminder_active": true, "reminder_id": {$ne : null} }, 'server_name reminder_id' );
        } catch (error) {
            console.log(`Error in "getReminderChannels" function`);
            console.log(error);
            return null;
        }
    },
    getHourlyChannels: async () => {
        try {
            return await Server.find({ "hourly_active": true, "hourly_id": {$ne : null}}, 'server_name hourly_id');
        } catch (error) {
            console.log(`Error in "getHourlyChannels" function`);
            console.log(error);
            return null;
        }
    },
}