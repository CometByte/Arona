const config = require('./../../helper/task/cron-config');
const scheduler = require('./../../helper/task/scheduler');

module.exports = (client) => {
    try {

        scheduler.initCrons(client, config);
        
    } catch (error) {
        console.log(`Task Initalization: Failed`);
        console.log(error);
    }
};