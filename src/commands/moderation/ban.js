const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans a member from the server.',
    // devOnly: <true | false>,
    // testOnly: <true | false>,
    options: [
        {
            name: 'target-user',
            description: 'The user to ban.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The reason for banning.',
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [ PermissionFlagsBits.Administrator ],
    botPermissions: [ PermissionFlagsBits.Administrator ],

    callback: async (client, interaction) => {

        const targetUser = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason').value;

        const member = await interaction.guild.members.fetch(targetUser);

        const embed = new EmbedBuilder()
                .setTitle(`🔨 Ban hammer strikes`)
                .setDescription(`**${member.user.tag}** was banned from the server`)
                .setColor(0xFF0000)
                .addFields(
                    {
                        name: 'Reason',
                        value: `${reason}`
                    }
                );
                
        interaction.reply( { embeds: [embed] } );
    }
};