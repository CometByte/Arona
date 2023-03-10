const getApplicationCommands = require('../helper/getApplicationCommands');
const getLocalCommands = require('../helper/getLocalCommands');
const areCommandsDifferent = require('../helper/areCommandsDifferent');

module.exports = async (client, guildId) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, guildId);

        console.log('\nš Registering commands...');

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;
            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            )

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`ā Deleted command "${name}."`);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, { description, options, })
                    console.log(`š Edited command "${name}."`)
                }
            } else {
                if (localCommand.deleted) {
                    console.log(`ā© Skipping registering command "${name}" as it's set to delete`);
                    continue;
                }

                await applicationCommands.create( { name, description, options } );

                console.log(`ā Registered command "${name}"`);
            }
        }

        console.log('ā Successfully registered the commands!')
    } catch (error) {
        console.log(`Command registry error: ${error}`);   
    }
}