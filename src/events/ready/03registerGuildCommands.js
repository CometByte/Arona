const registerGuildCommands = require("../../helper/registerGuildCommands")

module.exports = async (client) => {
    await registerGuildCommands(client);
}