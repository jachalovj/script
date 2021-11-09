const { Schema } = require('mongoose');

module.exports = new Schema({
    name: {
        type: String,
        required: true,
    },   //名称
    key: {
        type: String,
        required: true,
        unique: true,
    },
    urlCode: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
