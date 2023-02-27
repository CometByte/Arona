const cron = require('node-cron');
const { resolve } = require('path');
const { log } = require('../Logger');

module.exports = {
    initCrons: (client, config) => {
        Object.keys(config).forEach(key => {
            if (cron.validate(config[key].frequency)) {

                if (!config[key].active) return;
                
                log(`➕ Task "${config[key].path}" has been initialized...`);
                
                cron.schedule(config[key].frequency, () => {
                    const task = require(resolve('src/tasks/', config[key].path))
                    task(client);
                }, {
                    scheduled: true,
                    timezone: 'Asia/Manila'
                });
            }
        });    
    }
}