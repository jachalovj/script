/**
 * 算法
 * 计数排序
 */

const countingSort = (arr) => {
    const bucket = [];
    let sortedIndex = 0;
    for (let item of arr) {
        bucket[item] = ++bucket[item] || 1;
    }
    for (let i = 0; i < bucket.length; i++) {
        let val = bucket[i];
        while (val) {
            arr[sortedIndex++] = i;
            val--;
        }
    }
    return arr;
};

module.exports = {
    countingSort,
};
