const models = require('../../schema/20230321-wx/index')
(async () => {
  const res = await models.Log.findOne({headers: {$exists: 1}});
  console.log(res);
})();