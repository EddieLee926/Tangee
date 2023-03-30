const db = require("./connection_db");

// select from the new_inserted_all_star_investment_details table
exports.getRows = () => {
    return new Promise((resolve, reject) => {
        db.query(`select * from new_inserted_all_star_investment_details`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            resolve(rows);
        })
    })
}

// delete all rows in new_inserted_all_star_investment_details table
exports.deleteRows = () => {
    return new Promise((resolve, reject) => {
        db.query(`delete from new_inserted_all_star_investment_details`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            resolve(rows);
        })
    })
}

// get the latest data from all detail table
exports.getlatestData = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT detail_num,all_details.user_id,stock,update_time,brokerId,securitiesAccount,nick_name FROM star_investor_db.all_details
        inner join star_investor_db.all_users on all_details.user_id=all_users.user_id where detail_num='${data}'`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            resolve(JSON.parse(JSON.stringify(rows)));
        })
    })
}

//get  the latest data from broker table
exports.getlatestDataBroker = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT securitiesAccount,date_format(updateDate, '%Y/%m/%d %T')as updateDate,trade_price,explanation,stock_name,propertyValue FROM star_investor_db.broa_details
            INNER JOIN star_investor_db.explanation ON broa_details.trade_mode=explanation.value WHERE detail_num='${data}';`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(JSON.parse(JSON.stringify(rows)));
            }
        );
    });
};