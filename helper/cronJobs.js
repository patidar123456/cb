const cron = require('node-cron');

// Define your cron job
const testCron = cron.schedule('* * * * *', () => {
    // This function will run every minute (change the cron expression as needed)

    // Your task logic goes here
    console.log('Cron job is running...');
});

module.exports = {
    testCron
};