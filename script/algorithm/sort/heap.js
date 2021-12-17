/**
 * 算法
 * 堆排序
 */

let len;    // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量

const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

const heapify = (arr, i) => {     // 堆调整
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;
    if (left < len && arr[left] > arr[largest]) largest = left;
    if (right < len && arr[right] > arr[largest]) largest = right;
    if (largest !== i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
};

const heapSort = (arr) => {
    // 建立大顶堆
    len = arr.length;
    for (let i = Math.floor(len / 2); i >= 0; i--) heapify(arr, i);
    // 堆调整
    for (let i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    return arr;
};

module.exports = {
    heapSort,
};
