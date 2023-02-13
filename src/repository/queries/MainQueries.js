const Server = require('../../models/Server');

module.exports = {
    getServer: async (id) => {
        try {
            if (!id) return null;

            return getServer = await Server.findOne({ server_id: id }).exec();

        } catch (error) {
            console.log(`Error in "getServer" function`);
            console.log(error);
        }
    }
}