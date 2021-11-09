/**
 * 用户组织管理
 * */
const Sequelize = require('sequelize');

const db = require('../../database/mysql')('account');

module.exports = db.define('group', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
    },
    label: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
    },
    parent: {
        type: Sequelize.INTEGER,    // 上级部门：顶级部门上级部门为0
        defaultValue: 0,
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '组织状态: 0禁用, 1启用',
    },
});
