const Account = require('./account');
const Group = require('./group');
const Menu = require('./menu');
const Role = require('./role');

// 用户角色
Account.belongsToMany(Role, { through: 'account_roles' });
// 用户分组
Account.belongsToMany(Group, { through: 'account_groups' });
// 部门权限
Group.belongsToMany(Menu, { through: 'group_menus' });
// 角色权限
Role.belongsToMany(Menu, { through: 'role_menus' });

module.exports = {
    Menu,
    Group,
    Account,
    Role,
};
