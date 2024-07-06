const Queue = require('bull');

const messageQueue = new Queue('message-queue', {
    redis: {
        host: 'bull-api-redis',
        port: 6379
    }
});

module.exports = messageQueue;
