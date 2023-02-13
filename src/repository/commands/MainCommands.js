const Server = require('../../models/Server');

module.exports = {
    inupServer: async (request) => {
        try {

            const existing = await Server.findOne({ server_id: request.server_id })

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
    }
}