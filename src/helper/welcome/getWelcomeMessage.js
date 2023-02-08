module.exports = (client, member) => {
    let welcomeMessage = "";

    welcomeMessage = `Welcome to SCHALE, <@${member.user.id}>-sensei`;

    return welcomeMessage;
};