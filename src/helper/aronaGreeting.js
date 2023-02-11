module.exports = (currentDate, currentTime, currentDay) => {
    
    let greeting = "Sensei?";

    // 12a.m. to 1a.m.
    if (currentTime >= "00:00:00" && currentTime < "01:00:00")
        greeting = "Sensei, It's already 12a.m., better to have some rest.";

    // 1a.m. to 2a.m.
    if (currentTime >= "01:00:00" && currentTime < "02:00:00")
        greeting = "Sensei, It's already 1a.m.";

    // 2a.m. to 3a.m.
    if (currentTime >= "02:00:00" && currentTime < "03:00:00")
        greeting = "Sensei, It's already 2a.m.";

    // 3a.m. to 4a.m.
    if (currentTime >= "03:00:00" && currentTime < "04:00:00")
        greeting = "Sensei, It's already 3a.m.";

    // 4a.m. to 5a.m.
    if (currentTime >= "04:00:00" && currentTime < "05:00:00")
        greeting = "Sensei, It's already 4a.m.";

    // 5a.m. to 6a.m.
    if (currentTime >= "05:00:00" && currentTime < "06:00:00")
        greeting = "Good morning, Sensei! It's already 5a.m..\nRemember to fix your bed before you go.";

    // 6a.m. to 7a.m.
    if (currentTime >= "06:00:00" && currentTime < "07:00:00")
        greeting = "Sensei, It's already 6a.m..\nAre you ready to go to work?";

    // 7a.m. to 8a.m.
    if (currentTime >= "07:00:00" && currentTime < "08:00:00")
        greeting = "Sensei, It's already 7a.m.";

    // 8a.m. to 9a.m.
    if (currentTime >= "08:00:00" && currentTime < "09:00:00")
        greeting = "Sensei, It's already 8a.m.";

    // 9a.m. to 10a.m.
    if (currentTime >= "09:00:00" && currentTime < "10:00:00")
        greeting = "Sensei, It's already 9a.m.";

    // 10a.m. to 11a.m.
    if (currentTime >= "10:00:00" && currentTime < "11:00:00")
        greeting = "Sensei, It's already 10a.m.";

    // 11a.m. to 12p.m.
    if (currentTime >= "11:00:00" && currentTime < "12:00:00")
        greeting = "Sensei, It's already 11a.m.";

    // 12p.m. to 1p.m.
    if (currentTime >= "12:00:00" && currentTime < "13:00:00")
        greeting = "Sensei, It's 12p.m.. It's lunch time. Go grab something to eat!";

    // 1p.m. to 2p.m.
    if (currentTime >= "13:00:00" && currentTime < "14:00:00")
        greeting = "Sensei, It's already 1p.m.";

    // 2p.m. to 3p.m.
    if (currentTime >= "14:00:00" && currentTime < "15:00:00")
        greeting = "Sensei, It's already 2p.m.";

    // 3p.m. to 4p.m.
    if (currentTime >= "15:00:00" && currentTime < "16:00:00")
        greeting = "Sensei, It's already 3p.m.";

    // 4p.m. to 5p.m.
    if (currentTime >= "16:00:00" && currentTime < "17:00:00")
        greeting = "Sensei, It's already 4p.m.";

    // 5p.m. to 6p.m.
    if (currentTime >= "17:00:00" && currentTime < "18:00:00")
        greeting = "Sensei, It's already 5p.m.";

    // 6p.m. to 7p.m.
    if (currentTime >= "18:00:00" && currentTime < "19:00:00")
        greeting = "Sensei, It's already 6p.m.";

    // 7p.m. to 8p.m.
    if (currentTime >= "19:00:00" && currentTime < "20:00:00")
        greeting = "Sensei, It's already 7p.m.";

    // 8p.m. to 9p.m.
    if (currentTime >= "20:00:00" && currentTime < "21:00:00")
        greeting = "Sensei, It's already 8p.m.";

    // 9p.m. to 10p.m.
    if (currentTime >= "21:00:00" && currentTime < "22:00:00")
        greeting = "Sensei, It's already 9p.m.";

    // 10p.m. to 11p.m.
    if (currentTime >= "22:00:00" && currentTime < "23:00:00")
        greeting = "Sensei, It's already 10p.m.";

    // 11p.m. to 12a.m.
    if (currentTime >= "23:00:00" && currentTime < "24:00:00")
        greeting = "Sensei, It's already 11 p.m. It's better to finish your work.";

    return greeting;
};