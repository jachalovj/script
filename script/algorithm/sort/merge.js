/**
 * 算法
 * 归并排序
 */

// 有序小组合并
const merge = (left, right) => {
    const result = [];
    while (left.length && right.length) {
        left[0] <= right[0] ?
            result.push(left.shift()) :
            result.push(right.shift());
    }
    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());
    return result;
};

const mergeSort = (arr) => {  // 采用自上而下的递归方法
    const len = arr.length;
    if(len < 2) return arr;
    const middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
};

module.exports = {
    mergeSort,
};
