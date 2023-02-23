const Server = require('../../models/Server');

module.exports = {
    inupServer: async (request) => {
        try {

            const existing = await Server.findOne({ server_id: request.server_id });

            if (!existing) 
                await Server.create(request);
            else {
                existing.server_name = request.server_name;
                existing.owner = request.owner;
                await existing.save();
            }

            return true;
        } catch (error) {
            console.log('Error in "inupServer" function...');
            return false;
        }
    },

    setChannel: async (guildId, channelId, reminderType, isActive = true) => {
        try {
            
            const existing = await Server.findOne({ server_id: guildId });
            let response = "Zzz...."

            if (!existing)
                return "It seems your club isn't registered yet, Sensei...\nPlease do **/startup** to register your club...";
            
            switch (reminderType) {
                case 'hourly':
                    existing.hourly_id = channelId
                    existing.hourly_active = isActive;
                    response = `Hourly channel has been ${isActive ? "set" : "removed"}!`; 
                    break;
    
                case 'birthday':
                    existing.birthday_id = channelId
                    existing.birthday_active = isActive;             
                    response = `Birthday channel has been ${isActive ? "set" : "removed"}!`; 
                    break;
            
                case 'reminder':
                    existing.reminder_id = channelId
                    existing.reminder_active = isActive;
                    response = `Reminder channel has been ${isActive ? "set" : "removed"}!`; 
                    break;
    
                case 'welcome':
                    existing.welcome_id = channelId
                    existing.welcome_active = isActive;
                    response = `Welcome channel has been ${isActive ? "set" : "removed"}!`; 
                    break;
            }

            await existing.save();

            return response;

        } catch (error) {
            console.log('Error in "setChannel" function...');
            return "There seems to have an issue connecting to the Sanctum Tower, Sensei...\nPlease try again later...\nSorry >_<";
        }
    },
}