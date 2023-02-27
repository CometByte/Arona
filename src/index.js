require('dotenv').config( { path: '.env'} );
const { Client, IntentsBitField } = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');
const { log } = require('./helper/Logger');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

(async () => {
    try {
        // Connect to MongoDB
        log("🔁 Attempting to connect to the database...");
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.CONNECTION_STRING, { keepAlive: true });
        log("✅ Successfully connected to the Sanctum Tower's database!");

        // Register Events
        log("🔁 Registering events...");
        await eventHandler(client);
        log("✅ Successfully registered the events!");

        // Log In
        log("🟢 Logging in...");
        client.login(process.env.TOKEN);
    } catch (error) {
        log("⛔ Unable to connect to the database...");
    }
})();