const path = require('path');
const PORT = process.env.NODE_PORT || 9001;

module.exports = {
    PORT,

    MONGODBS: {
        resource: 'mongodb://127.0.0.1:27017/cm-resource',
        cgs: 'mongodb://127.0.0.1:27017/cgs',
        scp_v2: 'mongodb://127.0.0.1:27017/scp_v2',
        log: 'mongodb://zhmd@banu-mongodb-primary-pub.mongodb.rds.aliyuncs.com:3717/wx,banu-mongodb-secondary-pub.mongodb.rds.aliyuncs.com:3717/wx?replicaSet=mgset-36799365&authSource=admin&'
    },
    MYSQL: {
        account: {
            dialect: 'mysql', // 数据库类型
            host: 'localhost',
            username: 'root',
            password: 'a123456',
            port: 3306,
            database: 'cm-account',
        },
    },

    logPath: path.join(__dirname, '../logs'),
};
