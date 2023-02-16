const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { setChannel } = require('../../repository/commands/MainCommands')

module.exports = {
    name: 'setchannel',
    description: 'Set the current channel as a reminder',
    // devOnly: <true | false>,
    // testOnly: <true | false>,
    options: [
        {
            name: 'reminder-type',
            description: 'Reminder type',
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'Hourly Greeting',
                    value: 'hourly',
                },
                {
                    name: 'Birthday',
                    value: 'birthday',
                },
                {
                    name: 'Reminders',
                    value: 'reminder',
                },
                {
                    name: 'Welcome',
                    value: 'welcome',
                },
            ]
        },
        {
            name: 'active',
            description: 'Remove the current channel as a reminder',
            type: ApplicationCommandOptionType.Boolean
        }
    ],
    permissionsRequired: [ PermissionFlagsBits.Administrator ],
    botPermissions: [ PermissionFlagsBits.Administrator ],

    callback: async (client, interaction) => {

        const reminderType = interaction.options.get('reminder-type').value;
        const isActive = interaction.options.get('active')?.value ?? true;

        await interaction.deferReply();

        const response = await setChannel(interaction.guild.id, interaction.channel.id, reminderType, isActive);

        await interaction.fetchReply();

        interaction.editReply({
            content: response
        });
    }
};