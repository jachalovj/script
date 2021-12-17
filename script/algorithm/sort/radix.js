/**
 * 算法
 * 基数排序
 */
const radixSort = (arr) => {
    if (!arr.length) return arr;
    let mod = 10;
    let dev = 1;

    let maxDigit = 0;
    let max = arr[0];
    // 获取最大值
    for (let a of arr) {
        if (max < a) max = a;
    }
    // 获取最大位数
    while (max >= 1) {
        max /= mod;
        maxDigit++;
    }

    for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        // 初始化桶
        let counter = [];
        for (let a of arr) {
            const bucket = parseInt((a % mod) / dev);
            if(!counter[bucket]) counter[bucket] = [];
            counter[bucket].push(a);
        }
        let pos = 0;
        for (let c of counter) {
            if (!c) continue;
            for (let ci of c) {
                arr[pos++] = ci;
            }
        }
    }
    return arr;
};

module.exports = {
    radixSort,
};
