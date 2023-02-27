const getLocalCommands = require('../helper/getLocalCommands');
const areCommandsDifferent = require('../helper/areCommandsDifferent');
const getApplicationCommands = require('./getApplicationCommands');
const { log } = require('./Logger');

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        await client.guilds.fetch();
        
        client.guilds.cache.forEach(async (guild) => {    
            const applicationCommands = await getApplicationCommands(client, guild.id);
            log(`🔁 Registering commands in ${guild.name}`);

            for (const localCommand of localCommands) {
                const { name, description, options } = localCommand;
                const existingCommand = await applicationCommands.cache.find(
                    (cmd) => cmd.name === name
                )
                
                if (existingCommand) {
                    if (localCommand.deleted) {
                        await applicationCommands.delete(existingCommand.id);
                        log(`❎ Deleted command "${name}."`);
                        continue;
                    }

                    if (areCommandsDifferent(existingCommand, localCommand)) {
                        await applicationCommands.edit(existingCommand.id, { description, options, })
                        log(`🔁 Edited command "${name}."`)
                    }
                } else {
                    if (localCommand.deleted) {
                        // log(`⏩ Skipping registering command "${name}" as it's set to delete`);
                        continue;
                    }

                    await applicationCommands.create( { name, description, options } );

                    log(`✅ Registered command "${name}"`);
                }
            }
        });    
    } catch (error) {
        log(`Command registry error: ${error}`); 
    }

};