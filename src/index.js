require('dotenv').config( { path: '.env'} );
const { Client, IntentsBitField } = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

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
        // console.log("\n🔁 Attempting to connect to the database...");
        // mongoose.set('strictQuery', false);
        // await mongoose.connect(process.env.CONNECTION_STRING, { keepAlive: true });
        // console.log("✅ Successfully connected to the Sanctum Tower's database!");

        // Register Events
        console.log("\n🔁 Registering events...");
        await eventHandler(client);
        console.log("✅ Successfully registered the events!");

        // Log In
        console.log("\n🟢 Logging in...");
        client.login(process.env.TOKEN);
    } catch (error) {
        console.log("⛔ Unable to connect to the database...");
    }
})();