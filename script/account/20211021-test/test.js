const models = require('../../../schema/20211021-demo-account');

(async () => {
    const res = await models.Account.findOne();
    console.log(res);
})();
