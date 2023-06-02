const { createConnection } = require('mysql2')
const { config } = require('./config')

const getDB = () => {
  return createConnection(config.mysql)
}

const select = async (sqlSelect) => {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.query(sqlSelect, (err, result) => {
      if (err) {
        // 结束会话
        return reject(err);
      }
      // 结束会话
      return resolve(result);
    })
  })
}
module.exports = async () => {
  const result = await select('select * from user')
  return result
}