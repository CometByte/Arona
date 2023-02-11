const config = require('./../../helper/task/cron-config');
const scheduler = require('./../../helper/task/scheduler');

module.exports = (client) => {
    try {
        console.log("\n🔁 Initializing tasks...")
        scheduler.initCrons(client, config);
        console.log("✅ Task initalization successful!")
    } catch (error) {
        console.log(`\n⛔ Task initalization failed!`);
        console.log(error);
    }
};