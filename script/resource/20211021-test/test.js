const models = require('../../../schema/20211021-demo-resource');

(async () => {
    const res = await models.Resource.findOne();
    console.log(res);
})();
