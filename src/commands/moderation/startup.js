const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, Interaction, Client } = require('discord.js');
const Server = require('../../models/Server');
const mongoose = require('mongoose');
const { getServer } = require('../../repository/queries/MainQueries');
const { inupServer } = require('../../repository/commands/MainCommands');
const { getDateTime } = require('../../helper/DateExtras');
require('dotenv').config()

module.exports = {
    name: 'startup',
    description: 'Wake me up... Note: Passwords are case sensitive, Sensei.',
    // devOnly: <true | false>,
    // testOnly: <true | false>,
    // deleted: <true | false>
    options: [
        {
            name: 'password-one',
            description: 'We Thirst For The Seven Wailings',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'password-two',
            description: 'We Bear The Koan Of Jericho',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    permissionsRequired: [ PermissionFlagsBits.Administrator ],
    botPermissions: [],
    
    callback: async (client, interaction) => {
        
        const passOne = interaction.options.get('password-one').value;
        const passTwo = interaction.options.get('password-two').value;

        await interaction.deferReply();
        await interaction.fetchReply();
        
        if (!(passOne === process.env.PASSWORD_ONE && passTwo === process.env.PASSWORD_TWO)) {
            
            interaction.editReply({
                content: 'Zzzz....',
            });

            return;
        }

        interaction.editReply({
            content: 'Oh! Sensei welcome back!',
        });

        // Check if server is existing
        const server = await getServer(interaction.guild.id);

        if (!server) {
            interaction.channel.send({
                content: `Sensei! It seems your club isn't registered in the database yet.\nAllow me too register your club in the database.`
            });

            const newServer = new Server({
                server_id: interaction.guild.id,
                server_name: interaction.guild.name,
                owner: interaction.guild.ownerId,
                active: true,
                registry_date: getDateTime('Asia/Manila')
            });

            const isRegistered = await inupServer(newServer);
            
            if (isRegistered) {
                interaction.channel.send({
                    content: 'Club registration success!\nYou now have command access, Sensei!'
                });
            } else {
                interaction.channel.send({
                    content: 'Sensei!! There seems to be a problem in registering your club.\nPlease try again later... Sorry >w< ...'
                });
            }
        } else {
            const updateServer = await inupServer(server);

            if (updateServer) {
                interaction.channel.send({
                    content: 'Your club has been updated sensei!'
                });
            } else {
                interaction.channel.send({
                    content: 'Sensei!! There seems to be a problem in updating your club.\nPlease try again later... Sorry >w< ...'
                });
            }
        }
    }
};