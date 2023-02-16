const registerCommands = require("../../helper/registerCommands")

module.exports = async (client, guild) => {
    await registerCommands(client, guild);
}