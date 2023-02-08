require('dotenv').config();

module.exports = {
    name: 'test',
    description: 'a command for testing features',
    devOnly: true,
    testOnly: true,
    // options: Object[],

    callback: async (client, interaction) => {
        const channel = await client.channels.fetch(process.env.WELCOME_CHANNEL_ID);

        channel.send({
            content: `Welcome, <@${interaction.user.id}>-sensei`
        });
    },
};