const pg = require('pg')
const { config } = require('./config')

const getDB = () => {
  return new pg.Pool(config.postgres)
}

const pgQuery = (sqlQuery, connection) => {
  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err, rows) => {
      if (err) return reject(err);
      return resolve(rows.rows || []);
    });
  });
}

const select = async (sqlSelect) => {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.connect(async (err, connection) => {
      if (err) {
        // 结束会话
        return reject(err);
      }
      let result = await pgQuery(sqlSelect, connection);
      // 结束会话
      return resolve(result);
    });
  });
}

module.exports = async () => {
  const result = await select('SELECT code, useful_credit FROM "public"."crm_customer_info" where useful_credit > 0')
  return result
}