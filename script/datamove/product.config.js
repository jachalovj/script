module.exports = {
  mysql: {
    host: 'rm-bp1km93h8j29yb5451o.mysql.rds.aliyuncs.com',
    port: 3306,
    user: 'megaland',
    password: 'yyNYJCRhYkGBcB86',
    database: 'megaland'
  },
  
  mongodb: {
    url: 'mongodb://root:banu%4020202020@dds-bp1d69274b1615a41128-pub.mongodb.rds.aliyuncs.com:3717,dds-bp1d69274b1615a42174-pub.mongodb.rds.aliyuncs.com:3717/?replicaSet=mgset-41913317&authSource=admin',
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