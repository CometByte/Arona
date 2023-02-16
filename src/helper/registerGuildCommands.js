const getLocalCommands = require('../helper/getLocalCommands');
const areCommandsDifferent = require('../helper/areCommandsDifferent');
const getApplicationCommands = require('./getApplicationCommands');

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        await client.guilds.fetch();
        
        client.guilds.cache.forEach(async (guild) => {    
            const applicationCommands = await getApplicationCommands(client, guild.id);
            console.log(`\n🔁 Registering commands in ${guild.name}`);

            for (const localCommand of localCommands) {
                const { name, description, options } = localCommand;
                const existingCommand = await applicationCommands.cache.find(
                    (cmd) => cmd.name === name
                )
                
                if (existingCommand) {
                    if (localCommand.deleted) {
                        await applicationCommands.delete(existingCommand.id);
                        console.log(`❎ Deleted command "${name}."`);
                        continue;
                    }

                    if (areCommandsDifferent(existingCommand, localCommand)) {
                        await applicationCommands.edit(existingCommand.id, { description, options, })
                        console.log(`🔁 Edited command "${name}."`)
                    }
                } else {
                    if (localCommand.deleted) {
                        console.log(`⏩ Skipping registering command "${name}" as it's set to delete`);
                        continue;
                    }

                    await applicationCommands.create( { name, description, options } );

                    console.log(`✅ Registered command "${name}"`);
                }
            }
        });    
    } catch (error) {
        console.log(`Command registry error: ${error}`); 
    }

};