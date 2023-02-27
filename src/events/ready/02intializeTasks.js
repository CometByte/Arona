const config = require('./../../configs/cron-config');
const scheduler = require('./../../helper/task/scheduler');
const { log } = require('./../../helper/Logger'); 

module.exports = (client) => {
    try {
        log("🔁 Initializing tasks...")
        scheduler.initCrons(client, config);
        log("✅ Task initalization successful!")
    } catch (error) {
        log(`⛔ Task initalization failed!`);
        log(error);
    }
};