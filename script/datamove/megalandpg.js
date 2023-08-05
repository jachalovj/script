const pg = require("pg");
const { config } = require("./config/config");

const getDB = () => {
  return new pg.Pool(config.postgres);
};

const pgQuery = (sqlQuery, connection) => {
  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err, rows) => {
      if (err) return reject(err);
      return resolve(rows.rows || []);
    });
  });
};

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
};

const getCustomer = () => {
  return select(
    'SELECT code, useful_credit FROM "public"."crm_customer_info" WHERE useful_credit > 0'
  );
};

const getCustomerByStore = () => {
  return select(
    `SELECT id, code, name, useful_credit, store_id, birthday, mobil, sex, remark, applets_openid FROM "public"."crm_customer_info" WHERE store_id IN ('3', '13', '14')`
  );
};

const getWXMember = (openids) => {
  const openidFilter = `'${openids.join("','")}'`;
  return select(
    `SELECT openid, nickname, head_img_url, unionid FROM "public"."wx_member" WHERE openid IN (${openidFilter})`
  );
};

module.exports = {
  getCustomer,
  getCustomerByStore,
  getWXMember,
};
