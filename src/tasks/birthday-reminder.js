require('dotenv').config();
const { logError, log } = require('../helper/Logger');
const { getBirthdayChannels, getReminderChannels } = require('../repository/queries/MainQueries');
const { getStudentsWithBirthday, getStudentsUpcomingBirthday } = require('../repository/queries/StudentQueries');
const { Embed, EmbedBuilder } = require('discord.js');
const getSourceLogo = require('../helper/getSourceLogo');
const DateExtras = require('../helper/DateExtras');

module.exports = async (client) => {

    log("📋 birthday-reminder executed!");
    try {
        const birthdayChannels = await getBirthdayChannels();
        const reminderChannels = await getReminderChannels();

        const birthdayGirls = await getStudentsWithBirthday();
        const upcomingBirthdays = await getStudentsUpcomingBirthday();

        // Get students with birthday today
        var birthdayMessage;
        let birthdayEmbeds = [];
        if (birthdayGirls && birthdayGirls.length > 0) {
            let studentList = [];
            birthdayGirls.forEach((birthdayGirl) => {

                var embed = new EmbedBuilder()
                                .setColor(0x1accf0)
                                .setTitle(`${birthdayGirl.last_name} ${birthdayGirl.first_name}`)
                                .setImage(`${birthdayGirl.portrait ?? process.env.PORTRAIT_DEFAULT_IMG}`)
                                .setFooter({
                                    text: `Art by: ${birthdayGirl.portrait_artist ?? "-undefined-"}`,
                                    iconURL: getSourceLogo(birthdayGirl.portrait_source)
                                });
                
                studentList.push(birthdayGirl.first_name);
                birthdayEmbeds.push(embed);
            });
            
            birthdayMessage = "Sensei! Here are the students that has their birthday today!";
            if (studentList.length > 1) {
                let lastStudent = studentList.pop();
                
                birthdayMessage = `Sensei! Today is **${studentList.join(', ')} and ${lastStudent}'s** birthday! 🎉\nGreet them a Happy Birthday!`;
            }
            else
                birthdayMessage = `Sensei! Today is **${birthdayGirls[0].first_name}'s** birthday! 🎉\nGreet her a Happy Birthday!`;
        }

        // Get upcoming birthdays
        var upcomingEmbed = null;
        if (upcomingBirthdays && upcomingBirthdays.length > 0) {
            var fields = [];
            upcomingBirthdays.forEach((student) => {
                student.birth_date.setFullYear(new Date().getFullYear());
                fields.push({
                    name: student.first_name,
                    value: DateExtras.birthdayCountdown(student.birth_date)
                });
            });

            upcomingEmbed = new EmbedBuilder()
                            .setColor(0x1accf0)
                            .setTitle(`Upcoming Birthdays 🎉`)
                            .addFields(fields);
        }

        // Send birthday embed
        if (birthdayChannels && birthdayEmbeds.length > 0) {
            birthdayChannels.forEach(async (birthdayChannel) => {
                try {
                    // get channel
                    const channel = await client.channels.fetch(birthdayChannel.birthday_id);

                    // validate channel
                    if (!channel) return;

                    // send message
                    channel.send({
                        content: birthdayMessage,
                        embeds: birthdayEmbeds
                    });
                } catch (error) {
                    log(`Error in sending birthday cards in ${birthdayChannel.server_name}'s birthday channel`);
                    log(error);
                }
            });
        }

        // Send upcoming birthdays
        if (reminderChannels && upcomingEmbed) {
            reminderChannels.forEach(async (reminderChannel) => {
                try {
                    // get channel
                    const channel = await client.channels.fetch(reminderChannel.reminder_id);

                    // validate channel
                    if (!channel) return;

                    // send message
                    channel.send({
                        embeds: [upcomingEmbed]
                    });
                } catch (error) {
                    log(`Error in sending birthday reminder in ${reminderChannel.server_name}'s reminder channel`);
                    log(error);
                }
            });
        }   
    } catch (error) {
        log('Erorr in running the task "birthday-reminder"...');
        logError("birthday-reminder", error);
    }
};