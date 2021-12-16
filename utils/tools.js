const fs = require('fs');
const readline = require('readline');

const Readline = {
    oneline: function(path, row, callback) {
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
    },
    multilines: function(path, row, callback) {
        let i = 0;
        let lastrow = Math.max.apply(null, row);
        let content = {};
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
                if (i >= row[0] && i <= row[1]) {
                    try {
                        content[i] = line;
                    } catch (e) {
                        console.error(e);
                    }
                    if (i === +lastrow) this.close();
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
    },
    alllines: function(path, callback) {
        let i = 0;
        let content = {};
        content.all = '';
        content.row = {};
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
            }).on('line', (line) => {
                ++i;
                try {
                    content.row[i] = line;
                    content.all += line + '\r\n';
                } catch (e) {
                    console.error(e);
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
    },
};

module.exports = {
    Readline,
};
