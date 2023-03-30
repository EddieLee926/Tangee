const db = require('./connection_db');
const getBrokerInfo = require('../private-contracts/getBrokerInfo');

//找出哪些券商的訂閱者有訂閱該明星投資者 回傳訂閱券商public key
exports.getSubscriberBrokerKey = shareID => {
    return new Promise((resolve, reject) => {
        db.query(`select distinct(all_users.brokerId) 
        from all_subscriber inner join all_users on all_subscriber.user_id = all_users.user_id
        where shareID = ${shareID};`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }

            let public_key_array = []
            rows.map(row=>{
                const { tessera_public_key } = getBrokerInfo(row.brokerId)
                public_key_array.push(tessera_public_key)
            })
            resolve(public_key_array);
        })
    })
}