const { getDate, dateAdd, dateBetweener } = require('../../helper/DateExtras');
const Student = require('../../models/Student');
const { checkDays } = require('../../configs/config.json');

module.exports = {
    getStudent: async (name = null) => {
        try {
            let students = null;

            if (!name)
                students = await Student.findOne(`{"query_name": /${name}/i}`);

            return students;
        } catch (error) {
            console.log(`Error in "getStudent" function`);
            console.log(error);
            return null;
        }
    },
    queryStudents: async (name = null) => {
        try {
            let students;

            if (!name)
                students = await Student.find();
            else
                students = await Student.find( `{ $or: [ {"query_name": /${name}/i}, {"first_name": /${name}/i} , { "last_name": /${name}/i } ] }` );

            return students;
        } catch (error) {
            console.log(`Error in "queryStudents" function`);
            console.log(error);
            return null;
        }
    },
    getStudentsWithBirthday: async () => {
        try {
            let birthdayStudents = null;

            var dateToday = getDate('Asia/Manila');
            var dayToday = parseInt(dateToday.substring(8, 10));
            var monthToday = parseInt(dateToday.substring(5, 7));

            birthdayStudents = await Student.find({"birth_day": dayToday, "birth_month": monthToday, "version": null}, "first_name last_name portrait portrait_artist portrait_source ").sort({"birth_day": 1});
            
            // test query
            // birthdayStudents = await Student.find({"birth_month": monthToday, "version": null}, "first_name last_name portrait portrait_artist portrait_source ").sort({"birth_day": 1});
            
            // uncomment for debugging
            // console.log(birthdayStudents);

            return birthdayStudents;
        } catch (error) {
            console.log(`Error in "getStudentsWithBirthday" function`);
            console.log(error);
            return null;
        }
    },
    getStudentsUpcomingBirthday: async () => {
        try {
            let upcomingBirthday = null;

            var dateToday = getDate('Asia/Manila');
            var dayToday = parseInt(dateToday.substring(8, 10));
            var monthToday = parseInt(dateToday.substring(5, 7));

            var dateCheck = dateBetweener(dayToday, monthToday, 2020, checkDays);
            upcomingBirthday = await Student.find({"birth_date": {"$gte": dateCheck.dateStart, "$lt": dateCheck.dateEnd }, "version": null}, "first_name last_name birth_day birth_month birth_date").sort({"birth_date": 1});
            
            // test query
            // var dateCheck2 = dateBetweener(1, 3, 2020, 30);
            // upcomingBirthday = await Student.find({"birth_date": {"$gte": dateCheck2.dateStart, "$lt": dateCheck2.dateEnd }, "version": null }, "first_name last_name birth_day birth_month birth_date").sort({"birth_date": 1});

            return upcomingBirthday;
        } catch (error) {
            console.log(`Error in "getStudentsUpcomingBirthday" function`);
            console.log(error);
            return null;
        }
    },
}