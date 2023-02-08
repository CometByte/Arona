module.exports = {
    name: 'ping',
    description: 'check ping',
    devOnly: true,
    // testOnly: <true | false>,
    // options: Object[],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        await interaction.fetchReply();

        interaction.editReply(`Server's latency is at **${client.ws.ping}ms**, Sensei!`);
    },
};