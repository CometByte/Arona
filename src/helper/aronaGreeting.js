module.exports = () => {
    let greeting = "Hi, Sensei!";
    const currentTime = new Date().toLocaleTimeString('it-IT');

    // 12am to 1am
    if (currentTime >= "00:00:00" && currentTime < "01:00:00")
        greeting = "Sensei, it's already late. Please have a good night rest";

    // 1am to 2am
    if (currentTime >= "01:00:00" && currentTime < "02:00:00")
        greeting = "Sensei, why are you still up?";

    // 2am to 3am
    if (currentTime >= "02:00:00" && currentTime < "03:00:00")
        greeting = "Sensei, It's already 2am. Please take a rest.";

    // 3am to 4am
    if (currentTime >= "03:00:00" && currentTime < "04:00:00")
        greeting = "Sensei, it's already 3am. Please think about your sleeping habits.";

    // 4am to 5am
    if (currentTime >= "04:00:00" && currentTime < "05:00:00")
        greeting = "Sensei, It will be morning in a few minutes... Did you take good rest?";

    // 5am to 6am
    if (currentTime >= "05:00:00" && currentTime < "06:00:00")
        greeting = "Good Morning, Sensei. Are you ready to go for work?";

    return greeting;
};