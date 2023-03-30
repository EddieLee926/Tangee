const db = require('./connection_db');

// 這裡function可能要分類一下
function getUserData(value) {
    return new Promise((resolve, reject) => {
        db.query(`select user_id from all_users where account=${value.account} and password=${value.password};`, function (err, rows) {
            // db.query(`select id from all_users where account='aaa' and password='111';`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            resolve(JSON.parse(JSON.stringify(rows)));
        })
    })
}
function getPerformance() {
    return new Promise((resolve, reject) => {
        db.query(`select * from performance;`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            //回傳查詢資料
            resolve(rows);
            console.log(rows)
        })
    })
}
function getOwnInventory() {
    return new Promise((resolve, reject) => {
        db.query(`select * from broa_details;`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            //回傳查詢資料
            resolve(rows);
            console.log(rows)
        })
    })
}
function getInventoryReceipt() {
    return new Promise((resolve, reject) => {
        db.query(`select * from all_details;`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            //回傳查詢資料
            resolve(rows);
            console.log(rows)
        })
    })
}
function getPost() {
    return new Promise((resolve, reject) => {
        db.query(`select * from article;`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            //回傳查詢資料
            resolve(rows);
            console.log(rows)
        })
    })
}
function getPopPost() {
    return new Promise((resolve, reject) => {
        db.query(`select * from article;`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            //回傳查詢資料
            resolve(rows);
            console.log(rows)
        })
    })
}


module.exports = { getUserData, getPerformance, getOwnInventory, getPost, getPopPost, getInventoryReceipt }