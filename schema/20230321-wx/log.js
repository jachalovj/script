const { Schema } = require("mongoose");

module.exports = new Schema({
  method: String,
  api: {
    type: String,
    trim: true,
    index: true,
  },
  url: String,
  args: {},
  code: {
    type: String,
    index: true,
  },
  message: String,
  success: {
    type: Boolean,
    default: true,
    index: true,
  },
  data: {},
  request_time: String,
  response_time: String,

  ip: String,

  //请求耗时
  duration: {
    type: Number,
    default: 0,
  },

  //日志仅存储7天
  create_time: {
    type: Date,
    default: () => new Date(),
    expires: 3600 * 24 * 7, //string,以秒为单位
  },
  api_channel: String,

  //渠道，例如BOH
  channel: {
    type: String,
    default: "",
    trim: true,
  },
  package: String, //请求端的包名
  version: String, //请求端的版本号
  uuid: String, //请求端的设备唯一标识
  sn: String, //MDM获取到的设备SN码
  udid: String, //MDM获取到的udid值
  platform_version_name: String, //平台版本名称
  platform_version_code: String, //平台版本号
  operator: String,
  store_id: String,
  headers: String,
});
