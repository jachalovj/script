// 根据分钟获取经历时间
const getDuringStrByMinute = (minute) => {
  let day = parseInt(minute / 60 / 24);
  let hour = parseInt(minute / 60 % 24);
  let min = parseInt(minute % 60);
  let sec = parseFloat(minute % 1).toFixed(2) * 60;
  let StatusStr = '';
  if (day > 0) {
      StatusStr = day + '天';
  }
  if (hour > 0) {
      StatusStr += hour + '小时';
  }
  if (min > 0) {
      StatusStr += min + '分钟';
  }
  if (sec > 0) {
      StatusStr += sec + '秒'
  }

  //三元运算符 传入的分钟数不够一分钟 默认为0分钟，else return 运算后的StatusMinute
  return StatusStr == '' ? '0分钟': StatusStr;
}

// console.log(getDuringStr( 35222.3 ));

// 数值转经历时间
/**
 *  默认保留两位小数
 * @param {Number} num
 * @param {String} type  'ms'毫秒，'s'秒，'m'分， 'h'时， 'D'天, 'M'月, 'Y'年
 * @param {String} format  'ms'毫秒，'s'秒，'m'分， 'h'时， 'D'天, 'M'月, 'Y'年  like: Y年M月D天 / D天h小时m分 / M-D-h-m-s
 */
const getDuring = (num, type = 's', format = '') => {

}
