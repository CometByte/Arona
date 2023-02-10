require('dotenv').config();

module.exports = async (client) => {

    console.log("hourly-greeting executed");
    // fetch channel id
    const channel = await client.channels.fetch(process.env.HOURLY_CHANNEL_ID);

    // validate channel
    if (!channel) return;

    const currentTime = new Date().toLocaleTimeString('it-IT', { timeZone: 'Asia/Manila' });
    let greeting = "Hello, Sensei!";

    console.log(`CurrentTime: ${currentTime}`);

    // 5am to 12pm - Morning
    if (currentTime >= "05:00:00" && currentTime < "12:00:00")
        greeting = "Good morning, Sensei!";

    // 12pm - Noon
    if (currentTime == "12:00:00")
        greeting = "Good noon, Sensei! Have you eaten lunch yet?";

    // 1pm to 5pm - Afternoon
    if (currentTime >= "13:00:00" && currentTime < "16:00:00")
        greeting = "Good afternoon, Sensei!";

    // 6pm to 10pm - Evening
    if (currentTime >= "18:00:00" && currentTime < "21:00:00")
        greeting = "Good evening, Sensei!";

    // 10pm to 12am - Night
    if (currentTime >= "22:00:00" && currentTime < "24:00:00")
        greeting = "Good night, Sensei! Time to rest.";

    // 12am to 5am - Midnight-Dawn
    if (currentTime >= "00:00:00" && currentTime < "04:00:00")
        greeting = "Sensei, Are you still up?";

    // message
    channel.send({
        content: greeting
    });
};


