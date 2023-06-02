const db = require('../../database/mongodb')('log');
const logSchema = require('./log');

const Log = db.model('Log', logSchema);

module.exports = {
    Log,
};
