/**
 * 数据库链接
 * */
const Sequelize = require('sequelize');
const MYSQL = require('config').get('MYSQL');

module.exports = ((config) => {
    const DB = MYSQL[config];
    return new Sequelize(DB.database, DB.username, DB.password, {
        host: DB.host,
        port: DB.port,
        dialect: DB.dialect,
        dialectOptions: {
            charset: 'utf8mb4',
            supportBigNumbers: true,
            bigNumberStrings: true,
        },
        pool: {
            max: 50,
            min: 0,
            idle: 30000,
        },
        timezone: '+08:00',      // 矫正时区
    });
});


