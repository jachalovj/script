/**
 * 菜单管理模型
 * */
const Sequelize = require('sequelize');

const db = require('../../database/mysql')('account');

module.exports = db.define('menu', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(32), // 菜单名称
        allowNull: false,
    },
    type: {
        type: Sequelize.ENUM('D', 'M', 'A'),    // 菜单类型 【D: 目录, M: 菜单, A: 按钮】
        defaultValue: 'M',
    },
    path: {
        type: Sequelize.STRING, // 菜单path
    },
    component: {
        type: Sequelize.STRING, // 菜单对应的页面组件路径
    },
    permission: {
        type: Sequelize.STRING, // 权限标识
        unique: true,
    },
    icon: {
        type: Sequelize.STRING,
    },
    sort: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    parent: {
        type: Sequelize.STRING,    // 上级菜单：根菜单上级为''
        defaultValue: '',
    },
    hidden: {
        type: Sequelize.BOOLEAN,    // 菜单是否可见
        defaultValue: false,
    },
});
