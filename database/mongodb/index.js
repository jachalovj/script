/**
 * 数据库链接
 * */
const mongoose = require('mongoose');
const MONGODB = require('config').get('MONGODBS');

module.exports = (config) => {
    const mongoUrl = MONGODB[config];
    return mongoose.createConnection(mongoUrl, {
        maxPoolSize: 20,
        bufferCommands: true,
        autoIndex: false,
    });
};
