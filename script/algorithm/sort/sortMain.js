const bubble = require('./bubble');
const selection = require('./selection');
const insertion = require('./insertion');
const shell = require('./shell');
const merge = require('./merge');
const quick = require('./quick');
const heap = require('./heap');
const counting = require('./counting');
const bucket = require('./bucket');
const radix = require('./radix');

const arr = [
    3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48,
];

const sortFun = {
    bubble: bubble.bubbleSort,
    selection: selection.selectionSort,
    insertion: insertion.insertionSort,
    shell: shell.shellSort,
    merge: merge.mergeSort,
    quick: quick.quickSort,
    quick2: quick.quickSort2,
    heap: heap.heapSort,
    counting: counting.countingSort,
    bucket: bucket.bucketSort,
    radix: radix.radixSort,
};

const getRunTime = async (fun) => {
    const start = new Date().getTime();
    let end = 0;
    const res = await sortFun[fun](arr);
    end = new Date().getTime();
    return { res: res.join(), time: end - start };
};



(async () => {
    console.log('bubble   ', await getRunTime('bubble'));
    console.log('selection', await getRunTime('selection'));
    console.log('insertion', await getRunTime('insertion'));
    console.log('shell    ', await getRunTime('shell'));
    console.log('merge    ', await getRunTime('merge'));
    console.log('quick    ', await getRunTime('quick'));
    console.log('quick2   ', await getRunTime('quick2'));
    console.log('heap     ', await getRunTime('heap'));
    console.log('counting ', await getRunTime('counting'));
    console.log('bucket   ', await getRunTime('bucket'));
    console.log('radix    ', await getRunTime('radix'));
})();
