module.exports = {
    hourly_greeting: {
        frequency: "0 * * * *",
        path: "hourly-greeting",
        active: true,
    },
    mudae_reset: {
        frequency: "49 * * * *",
        path: "mudae-reset",
        active: false,
    },
    job_test: {
        frequency: "* * * * *",
        path: "job-test",
        active: false,
    },
    birthday_reminder: {
        frequency: "0 8 * * *",
        path: "birthday-reminder",
        active: true,
    },
    global_reset: {
        frequency: "0 3 * * *",
        path: "global-reset",
        active: true,
    }
}