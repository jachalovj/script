const wxHost = 'http://localhost:3030';

const BaseApi = require('../../utils/request')
const requestApi = new BaseApi(wxHost)

const removeJumpQrCode = async (prefix, index) => {
  console.log(index + '===', prefix);
   return requestApi.post({
    api: '/api/wxAppAuth/jump-qrcode/remove',
    data: {
      "appid": "wxe843109326acb65a",
      "public_appid": "wx1a8adbaeb452aae0",
      "prefix": prefix
    },
    headers: {
      "content-type": "application/json"
    }
   })
}


const removeArr = [
  {
    "prefix": "http://weixin.qq.com/q/02cZ_WslMAfTC10000007q",
    "path": "/pages/index/index?sid=3&desk=25",
    "state": 2,
    "debug_url": []
  },
  {
    "prefix": "http://weixin.qq.com/q/02f4r3tlMAfTC10000M07a",
    "path": "/pages/index/index?sid=3&desk=24",
    "state": 2,
    "debug_url": []
  },
  {
    "prefix": "http://weixin.qq.com/q/02RFMXtsMAfTC10000w07x",
    "path": "/pages/index/index?sid=3&desk=13",
    "state": 2,
    "debug_url": []
  },
  {
    "prefix": "http://weixin.qq.com/q/02j-48sSMAfTC10000007K",
    "path": "/pages/index/index?sid=3&desk=11",
    "state": 2,
    "debug_url": []
  },
  {
    "prefix": "http://weixin.qq.com/q/02dtkktVMAfTC10000w07e",
    "path": "/pages/index/index?sid=3&desk=08",
    "state": 2,
    "debug_url": []
  },
  {
    "prefix": "http://weixin.qq.com/q/024TY8tHMAfTC10000g07v",
    "path": "/pages/index/index?sid=3&desk=03",
    "state": 2,
    "debug_url": []
  }
]


const doTask = async () => {
  await Promise.allSettled(removeArr.map((item, index) => 
      removeJumpQrCode(item.prefix, index)
  ))
  console.log('done');
}

doTask()