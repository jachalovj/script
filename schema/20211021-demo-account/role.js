/**
 * 角色管理
 * */
const Sequelize = require('sequelize');

const db = require('../../database/mysql')('account');

module.exports = db.define('role', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
    },
    desc: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.TINYINT,
        defaultValue: 1,
        allowNull: false,
        comment: '角色状态: 0禁用, 1启用',
    },
});

