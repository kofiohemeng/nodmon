const mongoose = require('mongoose');

const connectionInstance  = mongoose.createConnection('mongodb://localhost:27017/customer');

connectionInstance.on('error', (err) => {
    if (err) {
        throw err;
    }
});

connectionInstance.once('open', () => {
    console.log(`MongoDb connected at ${new Date()}`);
});

module.exports = connectionInstance;

const logDebug = true;

mongoose.set('debug', logDebug);