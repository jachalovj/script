/**
 * 算法
 * 快速排序
 */

/**
 * 方法1
 */
const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

const partition = (arr, left ,right) => {     // 分区操作
    let pivot = left,                      // 设定基准值（pivot）
        index = pivot + 1;
    for (let i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index);
            index++;
        }
    }
    swap(arr, pivot, index - 1);
    return index - 1;
};

const quickSort = (arr, left, right) => {
    left = typeof left === 'number' ? left : 0,
    right = typeof right === 'number' ? right : arr.length - 1;
    if (left < right) {
        const partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
};

/**
 * 方法2
 */
const partition2 = (arr, low, high) => {
    let pivot = arr[low];
    while (low < high) {
        while (low < high && arr[high] > pivot) {
            --high;
        }
        arr[low] = arr[high];
        while (low < high && arr[low] <= pivot) {
            ++low;
        }
        arr[high] = arr[low];
    }
    arr[low] = pivot;
    return low;
};

const quickSort2 = (arr, left, right) => {
    left = typeof left === 'number' ? left : 0,
    right = typeof right === 'number' ? right : arr.length - 1;
    if (left < right) {
        const partitionIndex = partition2(arr, left, right);
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
};

module.exports = {
    quickSort,
    quickSort2,
};
