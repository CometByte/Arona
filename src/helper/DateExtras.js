module.exports = {
    getDateTime: (timeZone = null) => {
        var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: timeZone };
        let datetime;

        if (!timeZone)
            datetime = new Date().toLocaleString('sv-SE');
        else 
            datetime = new Date().toLocaleString('sv-SE', options);

        return datetime.substring(datetime.length - 19);
    },
    getDate: (timeZone = null) => {
        var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', timeZone: timeZone };
        let datetime;

        if (!timeZone)
            datetime = new Date().toLocaleDateString('sv-SE');
        else 
            datetime = new Date().toLocaleDateString('sv-SE', options);

        return datetime.substring(datetime.length - 10);
    },
    getTime: (timeZone = null) => {
        if (!timeZone)
            return new Date().toLocaleTimeString('sv-SE');
        else
            return new Date().toLocaleTimeString('sv-SE', { timeZone: timeZone });
    },
    getDay: (timeZone = null) => {
        return new Date(module.exports.getDate(timeZone)).getDay();
    },
    getDayName: (timeZone = null) => {
        const day = module.exports.getDay(timeZone);
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return dayNames[day];
    },
    dateAdd: (day, month, year, count = 0) => {

        var date = new Date(new Date().getFullYear(), month - 1, day);
        date.setDate(date.getDate() + count);
        return { day: date.getDate(), month: date.getMonth() + 1 };
    },
    dateBetweener: (day, month, year, count = 0) => {
        var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'Asia/Manila' };

        var start = new Date(year, month - 1, day);
        var end = new Date(year, month - 1, day);
        end.setDate(end.getDate() + count);

        start = start.toLocaleDateString('sv-SE', options);
        end = end.toLocaleDateString('sv-SE', options);

        return { dateStart: start.substring(start.length - 10), dateEnd: end.substring(end.length - 10) };
    },
    dateDifference: (dateEnd, dateStart = null) => {
        if (!dateStart)
            dateStart = new Date();
            
        // To calculate the time difference of two dates
        var dateDiff = dateEnd.getTime() - dateStart.getTime();
            
        // To calculate the no. of days between two dates
        return Math.trunc(dateDiff / (1000 * 3600 * 24));
    },
    dateToWord: (date = new Date) => {
        var day = module.exports.numberSuffixer(date.getDate());
        var month = module.exports.getMonthName(date.getMonth() + 1);

        return `${month} ${day}`;
    },
    getMonthName: (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', {
            month: 'long',
        });  
    },
    numberSuffixer: (number = 0) => {
        let suffix = "th";
        if (number == 0) suffix = "";
        if (number % 10 == 1 && number % 100 != 11) suffix = "st";
        if (number % 10 == 2 && number % 100 != 12) suffix = "nd";
        if (number % 10 == 3 && number % 100 != 13) suffix = "rd";
         
        return number + suffix;
    },
    birthdayCountdown: (birthDate) => {
        var dateName = module.exports.dateToWord(birthDate) 
        var daysLeft = module.exports.dateDifference(birthDate)
        return dateName + " - " + (daysLeft < 1 ? "few hours left 🕑" : daysLeft + ` day${daysLeft > 1 ? "s" : ""} left 🗓`)
    }
}