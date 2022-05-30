let ex1 = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 3,
            left: null,
            right: null,
        },
        right: null,
    },
    right: {
        val: 4,
        left: null,
        right: {
            val: 5,
            left: null,
            right: null,
        },
    },
};
let ex2 = {
    val: 1,
    left: {
        val: 2,
    },
};


// function maxLength( arr ) {
//     // write code here
//     let res = [];
//     let temp = [];
//     for (let i in arr) {
//         let a = arr[i];
//         if (temp.includes(a))  temp = temp.slice(temp.indexOf(a) + 1);
//         temp.push(a);
//         if (temp.length > res.length) res = temp;
//     }
//     return res.length;
// }

// let arr = [1,2,3,1,2,3,2,2];
// let res =  maxLength(arr);
// console.log(res);


// function solve( str ) {
//     // write code here
//     let arr = str.split('');
//     let res = '';
//     while (arr.length) res += arr.pop();
//     return res;
// }
// let res = solve('abcd');
// console.log(res);

// function Permutation( str ) {
//     // write code here
//     let arr = [];
//     if (!str) return arr;

// }
// let res = Permutation('abc');
// console.log(res);

// function gcd( a ,  b ) {
//     // write code here
//     if (!(a % b)) return b;
//     if (!(b % a)) return a;
//     let index = a < b ? a : b;
//     for (let i = index; i > 0; i--) {
//         if (a % i || b % i) continue;
//         return i;
//     }

//     return 1;
// }
// let res = gcd(0, 6);
// function FirstNotRepeatingChar(str)
// {
//     // write code here
//     let disc = {};
//     for (let i = 0; i < str.length; i++) {
//         disc[str[i]] ? disc[str[i]]++ : disc[str[i]] = 1;
//     }
//     for (let i = 0; i < str.length; i++) {
//         if (disc[str[i]] === 1) return i;
//     }
//     return -1;
// }
// let res = FirstNotRepeatingChar('goorgle');

// function solve( s ,  t ) {
//     // write code here
//     if (!s || !t) return s || t;
//     let res = '';
//     let n = 0;
//     let maxlength = Math.max(s.length, t.length);
//     s = s.padStart(maxlength, 0);
//     t = t.padStart(maxlength, 0);
//     for (let i = maxlength - 1; i >= 0; i--) {
//         let sNum = +s[i] || 0;
//         let tNum = +t[i] || 0;
//         let curr = sNum + tNum + n;
//         res = curr % 10 + res;
//         n = Math.floor(curr / 10);
//     }
//     if (n === 1) res = n + res;
//     return res;
// }
// let res = solve('12345', '67');

// function sumNumbers( root, parent = '', sum = 0 ) {
//     if (!root || !root.val) return 0;
//     // write code here
//     let leftSum, rightSum;
//     if (root.left) leftSum = sumNumbers(root.left, `${parent}${root.val}`, sum);
//     if (root.right) rightSum = sumNumbers(root.right, `${parent}${root.val}`, sum);
//     if (!root.left && !root.right) sum += +`${parent}${root.val}`;
//     if (leftSum) sum += leftSum;
//     if (rightSum) sum += rightSum;
//     return sum;
// }

// let res = sumNumbers({});

// function maxProfit( prices ) {
//     // write code here
//     let res = 0;
//     let curr = prices[0];
//     for (let currP of prices) {
//         if (currP < curr) curr = currP;
//         if (currP - curr > res) res = currP - curr;
//     }
//     return res;
// }

// function hasPathSum( root, sum, parent = 0 ) {
//     // write code here
//     if (!root || isNaN(root.val)) return false;
//     let left, right;
//     parent += root.val;
//     if (root.left) left = hasPathSum(root.left, sum, parent);
//     if (root.right) right = hasPathSum(root.right, sum, parent);
//     if (!root.left && !root.right) return sum === parent;
//     return left || right;
// }

// function FindPath(root, expectNumber, parent = '', path = []) {
//     // write code here
//     if (!root || isNaN(root.val)) return [];
//     parent += `+${root.val}`;
//     if (root.left) FindPath(root.left, expectNumber, parent, path);
//     if (root.right) FindPath(root.right, expectNumber, parent, path);
//     if (!root.left && !root.right) {
//         let currNum = eval(parent);
//         if (expectNumber === currNum) {
//             let currParent = parent.split('+');
//             currParent.shift();
//             path.push(currParent);
//         }
//     }
//     return path;
// }

// let res = FindPath(ex1, 6);

// function solve( s ,  t ) {
//     // write code here
//     if (s.length || t.length) {
//         return BigInt(s) * BigInt(t) + '';
//     }
// }

// let res = solve('35', '28');

// function maxDepth( root, parent = 0 ) {
//     // write code here
//     if (!root || isNaN(root.val)) return 0;
//     parent++;
//     let left = 0, right = 0;
//     if (root.left) left = maxDepth(root.left, parent);
//     if (root.right) right = maxDepth(root.right, parent);
//     if (!root.left && !root.right) return parent;
//     return Math.max(left, right);
// }
// let res = maxDepth(ex1);

// let result = [];
// function Print(pRoot , deep = 0)
// {
//     // write code here
//     if (!pRoot || isNaN(pRoot.val)) return result;
//     if (!result[deep++]) result[deep - 1] = [pRoot.val];
//     else if (deep % 2) result[deep - 1].push(pRoot.val);
//     else result[deep - 1].unshift(pRoot.val);
//     if (pRoot.left) Print(pRoot.left, deep);
//     if (pRoot.right) Print(pRoot.right, deep);
//     return result;
// }
// let res = Print(ex2);

// let result = [];
// function Print(pRoot , deep = 0)
// {
//     // write code here
//     if (!pRoot || isNaN(pRoot.val)) return result;
//     if (!result[deep++]) result[deep - 1] = [pRoot.val];
//     else result[deep - 1].push(pRoot.val);
//     if (pRoot.left) Print(pRoot.left, deep);
//     if (pRoot.right) Print(pRoot.right, deep);
//     return result;
// }
// let res = Print(ex2);

// function compare (leftRoot, rightRoot) {
//     if (!leftRoot && !rightRoot) return true;
//     if(!leftRoot || !rightRoot) return false;
//     if (leftRoot.val !== rightRoot.val) return false;
//     let left = compare(leftRoot.left, rightRoot.right);
//     let right = compare(leftRoot.right, rightRoot.left);
//     return left && right;
// }

// function isSymmetrical(pRoot)
// {
//     // write code hereW
//     if (!pRoot || isNaN(pRoot.val)) return true;
//     return compare(pRoot.left, pRoot.right);
// }
// let res = isSymmetrical(ex2);

// function rotateMatrix( mat ,  n ) {
//     // write code here
//     let arr = [];
//     for (let i = n; i > 0; i--) {
//         arr[n - i] = arr[n - i] || [];
//         for (let j = n; j > 0; j--) {
//             let curr = mat[j - 1] ? mat[j - 1][n - i] ? mat[j - 1][n - i] : 0 : 0;
//             arr[n - i].push(curr);
//         }
//     }
//     return arr;
// }
// let res = rotateMatrix([[1,2,3], [4,5,6], [7,8,9]], 2);

// 判断是否为回文子字符串
// function isPalindrome(str) {
//     let p = Math.floor(str.length / 2);
//     for (let i = 0; i <= p; i++) {
//         if (str[i] !== str[str.length - 1 - i]) return false;
//     }
//     return true;
// }

// function getLongestPalindrome( A ) {
//     // write code here
//     let res = 0;
//     // 收集所有回文子字符串 //本题可不要
//     let strArr = [];
//     for (let i = 0; i < A.length; i++) {
//         // 可优化每次只找大于已知回文子字符串长度的子集
//         for (let j = 0; j <= i; j++) {
//             if (isPalindrome(A.substring(j, i + 1))) {
//                 res = Math.max(i - j + 1, res);
//                 strArr.push(A.substring(j, i + 1));
//             }
//         }
//     }
//     return res;
// }
// let res = getLongestPalindrome('abbba');


// function FindGreatestSumOfSubArray(array)
// {
//     // write code here
//     // 记录负数(开始)到负数(结尾)之前的和是否大于0
//     let count = array[0];
//     let temp;
//     for (let i = 1; i < array.length; i++) {
//         let curr = array[i];
//         if (isNaN(count)) count = curr;
//         else if (curr > 0) {
//             if (count < 0 && count < curr) count = curr;
//             else count += curr;
//         } else {
//             if (isNaN(temp)) temp = count;
//             else if (temp < count) temp = count;
//             if (count + curr <= 0) {
//                 count = undefined;
//             } else {
//                 count += curr;
//             }
//         }
//     }
//     if (isNaN(temp)) temp = count;
//     if (isNaN(count)) count = temp;
//     return Math.max(count, temp);
// }
// let res = FindGreatestSumOfSubArray([-1,-2,-3,-10,-4,-7,-2,-5]);

// function getIp(str, start) {
//     return str.slice(0, start) + '.' + str.slice(start);
// }

// function dfs(s, start, cnt, res) {
//     if (cnt === 0) {
//         let strs = s.split('.');
//         for (let value of strs) {
//             if (+value > 255 || `${+value}` !== value) return;
//         }
//         return res.push(s);
//     }
//     let n = s.length;
//     if (start < n - 1) dfs(getIp(s, start + 1), start + 2, cnt - 1, res);
//     if (start < n - 2) dfs(getIp(s, start + 2), start + 3, cnt - 1, res);
//     if (start < n - 3) dfs(getIp(s, start + 3), start + 4, cnt - 1, res);
// }

// function restoreIpAddresses( s ) {
//     // write code here
//     let res = [];
//     if (s.length < 4 || s.length > 12) return res;
//     dfs(s, 0, 3, res);
//     return res;
// }
// let res = restoreIpAddresses('1111');

// function minNumberDisappeared( nums ) {
//     // write code here
//     let res = 1;
//     nums = nums.sort((a, b) => a - b);
//     for (let n of nums) {
//         if (n === res) res++;
//     }
//     return res;
// }
// let res = minNumberDisappeared([4,5,6,8,9]);

// function Mirror( pRoot ) {
//     // write code here
//     if (!pRoot || isNaN(pRoot.val)) return pRoot;
//     let left = new TreeNode(pRoot.left);
//     let right = new TreeNode(pRoot.right);
//     if (pRoot.left) pRoot.right = Mirror(left);
//     if (pRoot.right) pRoot.left = Mirror(right);
//     if (!pRoot.left && !pRoot.right) return pRoot;
//     return pRoot;
// }
// let res = Mirror(ex1);
// function FindNumsAppearOnce( array ) {
//     // write code here
//     array = array.sort((a, b) => a - b);
//     let count = 0;
//     let res = [];
//     for (let i = 0; i < array.length; i++) {
//         if (!((i - count) % 2) && array[i] !== array[i + 1]) {
//             count++;
//             res.push(array[i]);
//         }
//     }
//     return res;
// }
// let res = FindNumsAppearOnce([1,4,1,6]);


// function reverse( x ) {
//     // write code here
//     if (x > (Math.pow(2, 31) - 1) || x < -(Math.pow(2, 31))) return 0;
//     let minus = false;
//     if (x < 0) {
//         x = (x + '').substring(1);
//         minus = true;
//     }
//     let res = +((x + '').split('').reverse().join(''));
//     if (minus) res = +('-' + res + '');
//     if (res > (Math.pow(2, 31) - 1) || res < -(Math.pow(2, 31))) return 0;

//     return res;
// }
// let res = reverse(-123);

// function foundOnceNumber( arr ,  k ) {
//     // write code here
//     let array = arr.sort((a, b) => a - b);
//     let res;
//     for (let i = 0; i < array.length; i++) {
//         if (!(i % k) && array[i] !== array[i + 1]) {
//             return array[i];
//         }
//     }
//     return res;
// }
// let res = foundOnceNumber([2,2,1], 2);


// function findPeakElement( nums ) {
//     // write code here
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] > nums[i + 1]) return i;
//     }
//     return -1;
// }
// let res = findPeakElement([2,4,1,2,7,8,4]);

// function MLS( arr ) {
//     // write code here
//     let res = 1;
//     if (arr.length === 1) return res;
//     arr = arr.sort((a, b) => a - b);
//     let startIndex = 0;
//     for (let i = 1; i < arr.length; i++) {
//         if (arr[i] - arr[i - 1] === 1) res = Math.max(res, i - startIndex + 1);
//         else startIndex = i;
//     }
//     return res;
// }
// let res = MLS([2, 3, 5,5, 6,7,7, 10,11,12,13]);

// function longestCommonPrefix( strs ) {
//     // write code here
//     let res = '';
//     if (!strs || !strs.length) return res;
//     if (strs.length === 1) return strs[0];
//     for (let i = 0; i <= 5000; i++) {
//         let curr = strs[0][i];
//         for (let j = 0; j < strs.length; j++) {
//             if (strs[j][i] !== curr) return res;
//         }
//         res += curr;
//     }
//     return res;
// }
// let res = longestCommonPrefix(['abc', 'abcd', 'abd', 'abdc']);

// function solve(IP) {
//     // write code here
//     let arr = IP.split('.');
//     if (arr.length === 1) arr = IP.split(':');
//     if (arr.length === 4) {
//         for (let a of arr) {
//             if (a !== +a + '' || isNaN(+a) || +a > 255 || +a < 0) return 'Neither';
//         }
//         return 'IPv4';
//     } else if (arr.length === 8) {
//         for (let a of arr) {
//             if (!a || a.length > 4) return 'Neither';
//             for (let c of a) {
//                 if (!(c <= 9 && c >= 0 || (c >= 'A' && c <= 'F') || (c >= 'a' && c <= 'f'))) return 'Neither';
//             }
//         }
//         return 'IPv6';
//     }
//     return 'Neither';
// }
// let res = solve('172.16.254.1');


// function Fibonacci(n)
// {
//     // write code here
//     if (n < 1) return;
//     if (n === 1 || n === 2) return 1;
//     return Fibonacci(n - 1) + Fibonacci(n - 2);
// }
// let res = Fibonacci(0);

// function MoreThanHalfNum_Solution(numbers)
// {
//     // write code here
//     let half = parseInt(numbers.length / 2);
//     let map = {};
//     for (let n of numbers) {
//         if (!map[n]) map[n] = 1;
//         else map[n]++;
//         if (map[n] > half) return n;
//     }
// }
// let res = MoreThanHalfNum_Solution([1,2,3,2,2,2,5,4,2]);

// function GetNumberOfK(data, k)
// {
//     // write code here
//     let res = 0;
//     for (let d of data) {
//         if (d === k) res++;
//     }
//     return res;
// }
// let res = GetNumberOfK([1,2,3,3,3,3,4,5], 3);

// function uniquePaths(m, n) {
//     // write code here
//     let dp = new Array(m + 1);
//     for (let i = 0; i < dp.length; i++) {
//         dp[i] = new Array(n + 1);
//     }
//     for (let i = 1; i <= m; i++) {
//         for (let j = 1; j <= n; j++) {
//             if (i === 1 || j === 1) {
//                 dp[i][j] = 1;
//             } else {
//                 dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
//             }
//         }
//     }

//     return dp[m][n];
// }
// let res = uniquePaths(3, 2);

// function IsContinuous(numbers)
// {
//     // write code here
//     let king = 0;
//     let curr = 0;
//     numbers = numbers.sort((a, b) => a - b);
//     for (let num of numbers) {
//         if (!num) king++;
//         else {
//             if (!curr) curr = num;
//             else {
//                 king -= num - curr - 1;
//                 if (king < 0) return false;
//                 else curr = num;
//             }
//         }
//     }
//     return true;
// }
// let res = IsContinuous([1,2,11,0,8]);

function generateParenthesis( n ) {
    // write code here
    let res = [];
    if (n <= 0) return res;


    return res;
}
let res = generateParenthesis(3);

console.log(res);

