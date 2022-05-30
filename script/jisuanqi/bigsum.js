function bigSum( s ,  t ) {
    // write code here
    if (!s || !t) return s || t;
    let res = '';
    let n = 0;
    let maxlength = Math.max(s.length, t.length);
    s = s.padStart(maxlength, 0);
    t = t.padStart(maxlength, 0);
    for (let i = maxlength - 1; i >= 0; i--) {
        let sNum = +s[i] || 0;
        let tNum = +t[i] || 0;
        let curr = sNum + tNum + n;
        res = curr % 10 + res;
        n = Math.floor(curr / 10);
    }
    if (n === 1) res = n + res;
    return res;
}

module.exports = {
    bigSum,
};
