const megalandmongo = require("../megalandmongo");
const megalandpg = require("../megalandpg");
const _ = require("lodash");

const memberMap = {};

const sexMap = {
  man: "1",
  woman: "2",
  unknown: "0",
};

const storeMap = {
  3: "丰科万达店",
  13: "龙德广场店",
  14: "石景山万达店",
};

const getTZXMemberList = async () => {
  return megalandpg.getCustomerByStore();
};

const getMemberMap = async (filterKey, resultKey, source, method) => {
  if (
    !filterKey ||
    !resultKey ||
    !source ||
    !source.length ||
    typeof method !== "function"
  )
    return {};
  const filter = source
    .map((sourceItem) => sourceItem[filterKey])
    .filter((item) => item);
  const members = await method(filter);
  return members.reduce((result, memberItem) => {
    result[memberItem[resultKey]] = memberItem;
    return result;
  }, {});
};

const getTZXWxMemberList = async (users) => {
  return getMemberMap("remark", "openid", users, megalandpg.getWXMember);
};

const getMembersByMobile = async (users) => {
  return getMemberMap(
    "mobil",
    "mobile",
    users,
    megalandmongo.getMembersByMobile
  );
};

const getWechat = (users) => {
  return getMemberMap(
    "applets_openid",
    "openid",
    users,
    megalandmongo.getWechat
  );
};

const insertWechat = (wechats) => {
  return megalandmongo.insertWechat(wechats);
};

const insertWechatBind = (wechats) => {
  if (!wechats || !wechats.length) return;
  return megalandmongo.insertWechatBind(wechats);
};

const insertMember = (members) => {
  if (!members || !members.length) return;
  return megalandmongo.insertMember(members);
};

const bulkMember = (bulkMembers) => {
  if (!bulkMembers || !bulkMembers.length) return;
  return megalandmongo.bulkMember(bulkMembers);
};

// 同时生成 wx id, 给member
const createWechat = (wechat) => {
  return {
    unionid: wechat.unionid,
    headimgurl: "",
    nickname: wechat.nickname,
    sex: wechat.sex,
    city: "",
    country: "",
    language: "",
    province: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const createWechatBind = (wechat) => {
  return {
    unionid: wechat.unionid,
    openid: wechat.openid,
    app_id: "wx88cbf450c35a8854",
    type: "2",
    subscribe: "1",
    subscribe_scene: "ADD_SCENE_OTHERS",
    subscribe_time: new Date(),
    follow_user: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

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
    temp_vip: "1",
    _id: userInfo.customid.toString(),
    tenancy_id: "megaland",
    code: userInfo.customcode || "",
    name: userInfo.name || "",
    mobile: userInfo.mobile || "",
    sex: userInfo.sex,
    nation: "",
    birthday: userInfo.birthday || "",
    lunar_birthday: "",
    birthday_type: userInfo.birthday ? "1" : "",
    birthday_modified: userInfo.birthday ? "1" : "0",
    channel: "1",
    source: "",
    store_id: userInfo.store_id,
    store_name: userInfo.store_name,
    province: "",
    city: "",
    district: "",
    address: "",
    email: "",
    income: "",
    marry: "",
    education: "",
    status: "1",
    remark: "",
    taboo: "",
    preference: "",
    growth_value: 0,
    total_points: +userInfo.point || 0,
    total_cost: 0,
    balance: 0,
    level: 2,
    level_name: "肚粉",
    member_without_mobile: "0",
    plate_numbers: [],
    vip: [],
    level_info: {},
    level_upgrade_date: new Date(),
    like_foods: [],
    tags: [],
    register_date: userInfo.createTime,
    createdAt: new Date(),
    updatedAt: new Date(),
    headimgurl: "",
    wx: userInfo.wx,
    points: +userInfo.point || 0,
    work_weixin_subscribe: 1,
  };
};

const execute = async () => {
  console.time("task");
  await megalandmongo.initDB();
  const users = await getTZXMemberList();
  console.log(`开始执行总数：${users.length}`);
  return Promise.all(
    _.chunk(users, 500).map(async (usersChunk, chunkIndex) => {
      const bulkMembers = [];
      const wechatBinds = [];
      const newMembers = [];
      console.log(`${chunkIndex} 当前执行数：${usersChunk.length}`);
      const [tzxWXMembers, alreadyMembers, alreadWechat] = await Promise.all([
        getTZXWxMemberList(usersChunk),
        getMembersByMobile(usersChunk),
        getWechat(usersChunk),
      ]);

      await Promise.all(
        usersChunk.map(async (userItem, itemIndex) => {
          console.log(
            `${chunkIndex}-${itemIndex} 执行到用户：${userItem.mobil}`
          );
          // 重复用户去除
          if (memberMap[userItem.id]) return;
          memberMap[userItem.id] = 1;

          const alreadyMemberInfo = alreadyMembers[userItem.mobil] || null;
          // 已注册用户，累计积分
          if (alreadyMemberInfo) {
            if (+userItem.useful_credit <= 0) return;
            return bulkMembers.push({
              updateOne: {
                filter: { mobile: userItem.mobil },
                update: { $inc: { points: +userItem.useful_credit } },
              },
            });
          }
          const tzxWXMemberInfo = tzxWXMembers[userItem.remark] || {};
          // 未注册用户，重新注册
          const wechat = {
            unionid: tzxWXMemberInfo.unionid,
            openid: userItem.applets_openid,
            nickname: tzxWXMemberInfo.nickname,
            sex: sexMap[userItem.sex] || sexMap.unknown,
          };
          if (wechat.unionid && !alreadWechat[userItem.applets_openid]) {
            const wechatInstance = createWechat(wechat);
            const wechatInfo = await insertWechat(wechatInstance);
            wechat.insertedId = wechatInfo.insertedId;
            const wechatBindInstance = createWechatBind(wechat);
            wechatBinds.push(wechatBindInstance);
          }
          const member = {
            customid: userItem.id,
            customcode: userItem.code,
            name: wechat.nickName || userItem.name,
            mobile: userItem.mobil,
            sex: wechat.sex,
            createTime: new Date(),
            wx: wechat.insertedId,
            point: userItem.useful_credit,
            store_id: userItem.store_id,
            store_name: storeMap[userItem.store_id],
            birthday: userItem.birthday,
          };
          const memberInstance = createMember(member);
          newMembers.push(memberInstance);
        })
      );
      await Promise.all([
        bulkMember(bulkMembers),
        insertWechatBind(wechatBinds),
        insertMember(newMembers),
      ]);
      console.log(`${chunkIndex} 修改积分： ${bulkMembers.length}`);
      console.log(`${chunkIndex} 新增会员: ${newMembers.length}`);
      console.log(`${chunkIndex} 执行完成`);
    })
  );
};

execute().then(() => {
  console.timeEnd("task");
  console.log("执行完毕, 成功条数", Object.keys(memberMap).length);
});
