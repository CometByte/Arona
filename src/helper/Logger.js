require('dotenv').config();

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
            console.log("Unable to send error logs");
        }
    },
};