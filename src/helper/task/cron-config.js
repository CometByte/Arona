module.exports = {
    hourly_greeting: {
        frequency: "0 * * * *",
        path: "hourly-greeting",
        active: true,
    },
    mudae_reset: {
        frequency: "49 * * * *",
        path: "mudae-reset",
        active: true,
    },
    job_test: {
        frequency: "* * * * *",
        path: "job-test",
        active: false,
    }
}