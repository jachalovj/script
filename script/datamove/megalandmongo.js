const { MongoClient } = require("mongodb");
const { config } = require("./config/config");
const client = new MongoClient(config.mongodb.url);
const db = {};

const initDB = async () => {
  if (db.client) return;
  await client.connect();
  db.client = client.db(config.mongodb.dbName);
};

const insertWechat = async (wechat) => {
  return db.client.collection("wechat").insertOne(wechat);
};

const insertWechatBind = async (wechatBinds) => {
  return db.client.collection("wechat_bind").insertMany(wechatBinds);
};

const insertMember = async (members) => {
  return db.client.collection("member").insertMany(members);
};

const getMembersByMobile = async (mobiles) => {
  return db.client
    .collection("member")
    .find({ mobile: { $in: mobiles } })
    .toArray();
};

const bulkMember = async (bulk) => {
  return db.client.collection("member").bulkWrite(bulk);
};

const getWechat = async (openids) => {
  return db.client
    .collection("wechat_bind")
    .find({ openid: { $in: openids } })
    .toArray();
};

module.exports = {
  initDB,
  insertWechat,
  insertWechatBind,
  insertMember,
  getMembersByMobile,
  bulkMember,
  getWechat
};
