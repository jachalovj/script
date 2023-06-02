module.exports = {
mysql: {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'megalandUser'
},

mongodb: {
  url: 'mongodb://localhost:27017',
  dbName: 'chaodaobeta'
},

postgres: {
  user: "postgres",
  database: "megalanddb",
  password: "Bn87551166",
  host: "120.26.75.160",
  port: 5432, // 扩展属性
  max: 20, // 连接池最大连接数
  // 连接最大空闲时间 3s
  idleTimeoutMillis: 3000
}

}