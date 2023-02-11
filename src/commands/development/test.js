const aronaGreeting = require('../../tasks/hourly-greeting');

require('dotenv').config();

module.exports = {
    name: 'test',
    description: 'a command for testing features',
    devOnly: true,
    testOnly: true,
    // deleted: <true | false>
    // options: Object[],

    callback: async (client, interaction) => {
        await interaction.deferReply();
        await interaction.fetchReply();

        aronaGreeting(client);

        interaction.editReply("Test executed successfully!");
    },
};