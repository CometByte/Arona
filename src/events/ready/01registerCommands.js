const { testServer } = require('../../../config.json');
const getApplicationCommands = require('../../helper/getApplicationCommands');
const getLocalCommands = require('../../helper/getLocalCommands');
const areCommandsDifferent = require('../../helper/areCommandsDifferent');

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, testServer);

        console.log('\n🔁 Registering commands...');

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

        console.log('✅ Successfully registered the commands!')
    } catch (error) {
        console.log(`Command registry error: ${error}`);   
    }
};