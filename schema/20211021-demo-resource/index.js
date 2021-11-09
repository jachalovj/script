const db = require('../../database/mongodb')('resource');
const ResourceSchema = require('./resource');

const Resource = db.model('Resource', ResourceSchema);

module.exports = {
    Resource,
};
