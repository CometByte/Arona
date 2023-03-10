const mongoose = require('mongoose');
const Student = require('../../models/Student');
const students = require('../seed/students');
require('dotenv').config();

module.exports = async () => {

    console.log("\nš Attempting to connect to the database...");
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true
    });
    console.log("ā Successfully connected to the database!");
    
    const exists = await Student.findOne().exec();

    if (exists) {
        console.log('š Deleting existing data...');
        await Student.deleteMany();
    }

    console.log('š Creating new records');
    await Student.create(students);
    console.log('ā New records has been created successfully!');

    mongoose.disconnect();
};
