const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { once } = require('events');
const stringRandom = require('string-random');

const currDir = path.join(__dirname, 'files');
const bigFile = path.join(currDir, 'bigFile.txt');
const smailFile = path.join(currDir, 'smail');
const orderFile = path.join(currDir, 'orderFile.txt');

const maxLine = 500000;
let fileIndex = 1;
// let files = 0;
// const everyLine = () => {
//     return files && maxLine / files;
// };

/**
 * 生成大文件
 */
const genBigFile = async () => {
    fs.rmSync(bigFile, { recursive: true, force: true });
    fs.mkdirSync(currDir, { recursive: true });
    await Promise.all(new Array(100000).fill().map(() => {
        let str = '';
        for (let i = 0; i < 1000; i++) {
            str += `${stringRandom(9)}\n`;
        }
        fs.appendFileSync(bigFile, str);
    }));
};

/**
 * 归并排序
 */
// 融合两个有序数组，这里实际上是将数组 arr 分为两个数组
const mergeArray = (arr, first, mid, last, temp) => {
    let i = first;
    let m = mid;
    let j = mid + 1;
    let n = last;
    let k = 0;
    while (i <= m && j <= n) {
        if (arr[i] < arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    while (i <= m) {
        temp[k++] = arr[i++];
    }
    while (j <= n) {
        temp[k++] = arr[j++];
    }
    for (let l = 0; l < k; l++) {
        arr[first + l] = temp[l];
    }
    return arr;
};
// 递归实现归并排序
const mergeSort = (arr, first, last, temp) => {
    if (first < last) {
        let mid = Math.floor((first + last) / 2);
        mergeSort(arr, first, mid, temp);    // 左子数组有序
        mergeSort(arr, mid + 1, last, temp);   // 右子数组有序
        arr = mergeArray(arr, first, mid, last, temp);
    }
    return arr;
};

/**
 * 生成有序小文件
 */
const genOrderSmailFile = async () => {
    const fileRead = fs.createReadStream(bigFile);
    const rl = readline.createInterface({
        input: fileRead,
    });
    let fileArr = [];
    fs.mkdirSync(smailFile, { recursive: true, force: true });
    rl.on('line', (line) => {
        if (fileArr.length >= maxLine) {
            const currFileArr = mergeSort(fileArr, 0, fileArr.length - 1, []);
            fs.writeFileSync(path.join(smailFile, `${fileIndex++}.txt`), currFileArr.join(''));
            fileArr = [];
        }
        fileArr.push(`${line}\n`);

    });
    // 大文件读取完毕
    rl.on('close', () => {
        // 如果有没生成的小文件，生成
        if (fileArr.length) {
            const currFileArr = mergeSort(fileArr, 0, fileArr.length - 1, []);
            fs.writeFileSync(path.join(smailFile, `${fileIndex++}.txt`), currFileArr.join(''));
        }
        console.log('read file over');
    });
    await once(rl, 'close');
};

const oneline = (path, row, callback) => {
    let i = 0;
    let content = '';
    let rs = fs.createReadStream(path, {
        encoding: 'utf8',
        autoClose: false,
    }).on('error', (err) => {
        rs.destroy();
        callback(err, content);
    });
    path = null;
    try {
        readline.createInterface({
            input: rs,
            terminal: false,
        }).on('line', function(line) {
            ++i;
            if (+row === i) {
                try {
                    content = line;
                } catch (e) {
                    console.error(e);
                    this.close();
                }
            }
        }).on('close', () => {
            rs.destroy();
            callback(null, content);
        }).on('error', (err) => {
            rs.destroy();
            callback(err, content);
        });
    } catch (err) {
        console.error(err);
        callback(err, content);
    }
};

// 获取文件某行数据
const getLine = async (path, id, start) => {
    const res = await new Promise((resolve, reject) => {
        oneline(path, start, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
    return { id, str: res };
};

/**
 * 递归写文件
 */
const recursion = async (files = [], needRead = [], lines = [], writeLine = []) => {
    // 读文件
    const lineRead = await Promise.all(needRead.map((f) => getLine(f.path, f.id, f.start)));
    // 更新对比行
    lines = lines.concat(lineRead).filter((l) => l.str);
    // 获取最小行，最小文件id
    let minStr = lines[0].str;
    let minid = lines[0].id;
    lines.forEach((l) => {
        if (l.str <= minStr) {
            minStr = l.str;
            minid = l.id;
        }
    });
    // 排序写文件
    writeLine.push(minStr);
    console.log(writeLine.length);
    if (writeLine.length === maxLine) fs.appendFileSync(orderFile, writeLine.join('\n'));
    // 对比行中移除最小行
    lines = lines.filter((l) => l.id !== minid);
    // 最小文件读下一行
    const minfile = files.find((f) => f.id === minid);
    minfile.start++;
    needRead = minfile;
    if (!lines.length) {
        // 结束递归
        console.log('merge over');
        return fs.rmSync(smailFile, { recursive: true, force: true });
    }
    // 继续递归
    recursion(files, [needRead], lines, writeLine);
};

/**
 * 合并成大文件
 */
const mergeOrderFile = async () => {
    // 遍历文件
    const files = fs.readdirSync(smailFile).map((f, i) => ({path: path.join(smailFile, f), id: i, start: 1}));
    // 递归
    await recursion(files, files);
};

/**
 * 执行进程
 */
const main = async (genFile) => {
    // 生成大文件 耗时耗内存
    if (genFile) await genBigFile();
    // 生成有序小文件
    await genOrderSmailFile();
    // 合并成有序大文件
    await mergeOrderFile();
};

main(false);
