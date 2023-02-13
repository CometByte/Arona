require('dotenv').config();
const dateExtras = require('../../helper/DateExtras');
const { ApplicationCommandOptionType, Embed, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'time',
    description: 'test time',
    devOnly: true,
    testOnly: true,
    // deleted: <true | false>
    options: [
        {
            name: 'time-zone',
            description: 'Set a timezone',
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'Philippines',
                    value: 'Asia/Manila'
                },
                {
                    name: 'Japan',
                    value: 'Asia/Tokyo'
                },
                {
                    name: 'Korea',
                    value: 'Asia/Seoul'
                },
                {
                    name: 'Indonesia',
                    value: 'Asia/Jakarta'
                },
            ]
        }
    ],

    callback: async (client, interaction) => {

        const timeZone = interaction.options.get('time-zone')?.value;

        const embed = new EmbedBuilder()
                    .setTitle('Time')
                    .setDescription(`Current Date and Time ${!timeZone ? "" : "in " + timeZone}`)
                    .setColor(0x1accf0)
                    .addFields(
                        {
                            name: 'Date and Time',
                            value: dateExtras.getDateTime(timeZone)
                        },
                        {
                            name: 'Date',
                            value: dateExtras.getDate(timeZone)
                        },
                        {
                            name: 'Day',
                            value: dateExtras.getDayName(timeZone)
                        },
                        {
                            name: 'Time',
                            value: dateExtras.getTime(timeZone)
                        },
                    );
        
        interaction.reply({embeds: [embed]});
    },
};