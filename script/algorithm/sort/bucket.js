/**
 * 算法
 * 桶排序, 借助插入排序
 */

const { insertionSort } = require('./insertion');

//桶的初始化, 设置桶的默认数量为5
const bucketSort = (arr, bucketSize = 5) => {
    if (!arr.length) return arr;
    let minValue = arr[0];
    let maxValue = arr[0];
    for (let a of arr) {
        if (a < minValue) minValue = a;
        if (a > maxValue) maxValue = a;
    }
    let buckets = [];
    //利用映射函数将数据分配到各个桶中
    for (let a of arr) {
        let bIndex = Math.floor((a - minValue) / bucketSize);
        buckets[bIndex] ?
            buckets[bIndex].push(a) :
            buckets[bIndex] = [a];
    }
    arr.length = 0;
    for (let b of buckets) {
        if (!b?.length) continue;
        insertionSort(b);
        for (let bi of b) arr.push(bi);
    }
    return arr;
};

module.exports = {
    bucketSort,
};
