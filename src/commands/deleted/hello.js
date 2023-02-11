const getAronaGreeting = require('../../helper/aronaGreeting');

module.exports = {
    name: 'hello',
    description: 'Greet Arona',
    // devOnly: <true | false>,
    // testOnly: <true | false>,
    deleted: true,
    // options: Object[],
    permissionsRequired: [],
    botPermissions: [],
    
    callback: (client, interaction) => {
        interaction.reply({
            content: getAronaGreeting()
        });
    }
};