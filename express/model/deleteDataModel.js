const db = require('./connection_db');

// 與刪除資料有關

// 刪除圖片
exports.deletePicture = (value) => {
    return new Promise((resolve, reject) => {
        db.query(`delete from picture where type='${value.type}' and related_to='${value.relatedID}' `, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            resolve(rows.affectedRows);
        })
    })
}
