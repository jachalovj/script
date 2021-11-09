/**
 * 用户模型
 * */
const Sequelize = require('sequelize');

const db = require('../../database/mysql')('account');

module.exports = db.define('account', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
    },
    name: {
        type: Sequelize.STRING(32),
        allowNull: false,
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '用户状态: 0禁用, 1启用',
    },
});
