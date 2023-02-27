require('dotenv').config();
const { getDateTime } = require('./DateExtras');

module.exports = {
    logError: async (message, stackTrace) => {
        try {
            const channel = await client.channels.fetch(process.env.ERROR_CHANNEL);

            // validate channel
            if (!channel) return;

            const errorMessage = message + "\n ```js\n" + stackTrace + "\n```";

            // send message
            channel.send({
                content: errorMessage
            });
        } catch (error) {
            module.exports.log("Unable to send error logs");
        }
    },
    log: (message = "") => {
        if (message !== "")
            console.log(`[${getDateTime('Asia/Manila')}] ${message}`);
    },
};