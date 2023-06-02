const { MongoClient } = require('mongodb')
const { config } = require('./config')
const client = new MongoClient(config.mongodb.url);
const db = {};

const initDB = async () => {
  if (db.client) return
  await client.connect()
  db.client = client.db(config.mongodb.dbName)
}

const insertWechat = async (wechat) => {
  const client = db.client 
  return await client.collection('wechat').insertOne(wechat)
}

const insertWechatBind = async (wechatBinds) => {
  const client = db.client 
  return await client.collection('wechat_bind').insertMany(wechatBinds)
}

const insertMember = async (members) => {
  const client = db.client 
  return await client.collection('member').insertMany(members)
}

module.exports = {
  initDB,
  insertWechat,
  insertWechatBind,
  insertMember
}

