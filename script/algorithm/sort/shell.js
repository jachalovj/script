/**
 * 算法
 * 希尔排序
 */

function shellSort(arr) {
    let len = arr.length,
        temp,
        gap = 1;
    while(gap < len / 3) gap = gap * 3 + 1;          //动态定义间隔序列
    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
        for (let i = gap; i < len; i++) {
            temp = arr[i];
            let j = i - gap;
            for (j; j >= 0 && arr[j] > temp; j -= gap) arr[j + gap] = arr[j];
            arr[j + gap] = temp;
        }
    }
    return arr;
}

module.exports = {
    shellSort,
};
