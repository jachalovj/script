const megalandmongo = require('./megalandmongo')
const megalandMysql = require('./megalandMysql')
const megalandpg = require('./megalandpg')
const _ = require('lodash')

const memberMap = {}
const repeatMemberMap = {}

megalandmongo.initDB()

const getUsers = () => {
  return megalandMysql()
}

// 同时生成 wx id, 给member
const createWechat = (wechat) => {
  return {
    unionid: wechat.unionid,
    headimgurl: wechat.headimgurl,
    nickname: wechat.nickname,
    sex: wechat.sex ? wechat.sex.toString() : '0',
    city: '',
    country: '',
    language: '',
    province: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

const createWechatBind = (wechat) => {
  return {
    unionid: wechat.unionid,
    openid: wechat.openid,
    app_id: 'wx88cbf450c35a8854',
    type: '2',
    subscribe: '1',
    subscribe_scene: 'ADD_SCENE_OTHERS',
    subscribe_time: new Date(),
    follow_user: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

/**
 * 
 * @param {*} userInfo 
 * {
 *  customid,
 *  customcode,
 *  name,
 *  mobile,
 *  sex,
 *  createTime,
 *  headimgurl
 * }
 */
const createMember = (userInfo) => {
  return {
    _id: userInfo.customid.toString(),
    tenancy_id: 'megaland',
    code: userInfo.customcode || '',
    name: userInfo.name || '',
    mobile: userInfo.mobile || '',
    sex: userInfo.sex ? userInfo.sex.toString() : '0',
    nation: '',
    birthday: '',
    lunar_birthday: '',
    birthday_type: '',
    birthday_modified: '0',
    channel: '1',
    source: '',
    store_id: '0',
    store_name: '超岛自选火锅合生汇店',
    province: '',
    city: '',
    district: '',
    address: '',
    email: '',
    income: '',
    marry: '',
    education: '',
    status: '1',
    remark: '',
    taboo: '',
    preference: '',
    growth_value: 0,
    total_points: +userInfo.point || 0,
    total_cost: 0,
    balance: 0,
    level: 2,
    level_name: '肚粉',
    member_without_mobile: '0',
    plate_numbers: [],
    vip: [],
    level_info: {},
    level_upgrade_date: new Date(),
    like_foods: [], 
    tags: [],  
    register_date: userInfo.createTime,
    createdAt: new Date(),
    updatedAt: new Date(),
    headimgurl: userInfo.headimgurl,
    wx: userInfo.wx,
    points: +userInfo.point || 0,
    work_weixin_subscribe: 1
  }
}

const insertWechat = (wechats) => {
  return megalandmongo.insertWechat(wechats)
}

const insertWechatBind = (wechats) => {
  return megalandmongo.insertWechatBind(wechats)
}

const insertMember = (members) => {
  return megalandmongo.insertMember(members)
}

const execute = async () => {
  const users = await getUsers()
  const points = await megalandpg()
  return Promise.all(_.chunk(users, 200).map(async (usersChunk) => {
    const wechatBinds = []
    const members = []
    console.log('开始执行数：', usersChunk.length);
    await Promise.all(usersChunk.map(async userItem => {
      console.log('执行到用户：', userItem.unionid);
      if(memberMap[userItem.customid]) {
        repeatMemberMap[userItem.customid] = userItem;
        return
      }
      memberMap[userItem.customid] = userItem;
      const wxProfile = userItem.wxprofile || {}
      const wechat = {
        unionid: userItem.unionid,
        openid: userItem.openid,
        headimgurl: wxProfile.avatarUrl || '',
        nickname: wxProfile.nickName || '',
        sex: wxProfile.gender || '',
      }
      const wechatInstance = createWechat(wechat)
      const wechatInfo = await insertWechat(wechatInstance)

      const wechatBindInstance = createWechatBind(wechat)
      wechatBinds.push(wechatBindInstance);

      const point = points.find((pointItem) => pointItem.code === userItem.customcode)

      const member = {
        customid: userItem.customid,
        customcode: userItem.customcode,
        name: wxProfile.nickName,
        mobile: userItem.tel,
        sex: wxProfile.gender,
        createTime: userItem.createTime,
        headimgurl: wxProfile.avatarUrl,
        wx: wechatInfo.insertedId,
        point: point?.useful_credit,
      }
      const memberInstance = createMember(member);
      members.push(memberInstance)
      console.log('插入wechat, unionid:', wechat.unionid);
      console.log('插入wechatBind, openid:', wechat.openid);
      console.log('插入member, mobile:', member.mobile);
    }))
    return await Promise.all([
      insertWechatBind(wechatBinds),
      insertMember(members),
    ])
  }))
}

execute().then(() => {
  console.log('执行完毕, 成功条数', Object.keys(memberMap).length)
  console.log('重复会员', JSON.stringify(repeatMemberMap))
})
