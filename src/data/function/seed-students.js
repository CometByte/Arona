const mongoose = require('mongoose');
const Student = require('../../models/Student');
const students = require('../seed/students');
require('dotenv').config();

module.exports = async () => {

    console.log("\n🔁 Attempting to connect to the database...");
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true
    });
    console.log("✅ Successfully connected to the database!");
    
    const exists = await Student.findOne().exec();

    if (exists) {
        console.log('🗑 Deleting existing data...');
        await Student.deleteMany();
    }

    console.log('📝 Creating new records');
    await Student.create(students);
    console.log('✅ New records has been created successfully!');

    mongoose.disconnect();
};
