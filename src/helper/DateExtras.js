module.exports = {
    getDateTime: (timeZone = null) => {
        var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: timeZone };
        let datetime;

        if (!timeZone)
            datetime = new Date().toLocaleString('sv-SE').replace('lördag, ', '');
        else 
            datetime = new Date().toLocaleString('sv-SE', options).replace('lördag, ', '');
            
        return datetime;
    },
    getDate: (timeZone = null) => {
        var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: timeZone };
        let datetime;

        if (!timeZone)
            datetime = new Date().toLocaleDateString('sv-SE').replace('lördag, ', '');
        else 
            datetime = new Date().toLocaleDateString('sv-SE', options).replace('lördag, ', '');
            
        return datetime;
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
    }
}