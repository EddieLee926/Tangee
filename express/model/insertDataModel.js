const db = require('./connection_db');

// 與一般使用者資料有關

// 新增圖片
exports.insertPicture = (value) => {
    console.log('model', value);
    return new Promise((resolve, reject) => {
        db.query(
            `insert into picture (type, related_to, url) values ('${value.type}','${value.relatedID}','${value.pictureURL}');`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }

                resolve(rows.affectedRows);
            }
        );
    });
};
//訂閱明星投資者
exports.postSubscribeShareSecuritiesAccount = (data) => {
    return new Promise((resolve, reject) => {
        db.query('insert into all_subscriber set?', data, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }

            resolve(rows.affectedRows);
        });
    });
};
//將監聽到資料存到all_details
exports.postUploadInvestmentPerformanceToAllDetails = (data) => {
    return new Promise((resolve, reject) => {
        const { user_id, stock, trade_mode } = data;

        db.query(
            `insert into all_details (user_id, stock, remarks) values ('${user_id}', '${stock}', '${trade_mode}')`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                // get the insertedId(all_details -> detail_num)
                resolve(rows.insertId);
            }
        );
    });
};
// 取得要加入的broker_details_table
exports.getBrokerDetailsTable = (data) => {
    return new Promise((resolve, reject) => {
        const { user_id } = data;

        db.query(
            `select explanation from explanation inner join (
            select distinct(all_users.brokerId) 
            from all_subscriber inner join all_users on all_subscriber.user_id = all_users.user_id
            where shareID = ${user_id}) table_A on table_A.brokerId = explanation.value;`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows);
            }
        );
    });
};

// 加入至broker_details_table
exports.postUploadInvestmentPerformanceToBrokerDetails = (
    broker_details_table,
    data
) => {
    return new Promise((resolve, reject) => {
        broker_details_table.map((broker_details) => {
            db.query(
                `insert into ${broker_details.explanation} set?`,
                data,
                function (err, rows) {
                    if (err) {
                        console.log(err);
                        reject(rows);
                        return;
                    }
                    resolve(rows.affectedRows);
                }
            );
        });

    });
};

//註冊(NORMAL身分)
exports.postRegisterAccount = (value) => {
    return new Promise((resolve, reject) => {
        db.query(
            `insert into all_users (account, password, name,nick_name,email,Q1_InvestStyle,Q2_InvestCycle,Q3_InvestReason,Q4_InvestExperience
            ,Q5_AcceptableRisk,Q6_StopLoss,status,brokerIdAddress,brokerId,securitiesAccount,birth,gender,tag) values ('${value.account}','${value.password}','${value.name}','${value.nick_name}','${value.email}','${value.type}','${value.frequency}','${value.consider}','${value.experience}','${value.fluctuation}','${value.action}','normal','${value.brokerIdAddress}','${value.brokerId}','${value.securitiesAccount}','${value.birth}','${value.gender}','${value.tag}');`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows);
            }
        );
    });
};
//註冊(star身分)(allusers表)
exports.postRegisterStar = (value) => {
    return new Promise((resolve, reject) => {
        db.query(
            `insert into all_users (account, password, name,nick_name,email,Q1_InvestStyle,Q2_InvestCycle,Q3_InvestReason,Q4_InvestExperience
            ,Q5_AcceptableRisk,Q6_StopLoss,status,brokerIdAddress,brokerId,securitiesAccount,birth,gender,tag) values ('${value.account}','${value.password}','${value.name}','${value.nick_name}','${value.email}','${value.type}','${value.frequency}','${value.consider}','${value.experience}','${value.fluctuation}','${value.action}','star',1,'${value.brokerId}','${value.securitiesAccount}','${value.birth}','${value.gender}','${value.tag}');`,

            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                // get the insertedId(all_details -> detail_num)
                resolve(rows.insertId);
            }
        );
    });
};
//新增訂閱者
exports.postInsertSubscribe = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `insert into all_subscriber (user_id,brokerId,transactionHash,shareID,totalSubscribeAmount,startDate) values('${data.userid}','${data.brokerId}','${data.transactionHash}','${data.shareID}','${data.totalSubscribeAmount}','${data.startDate}');`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows.affectedRows);
            }
        );
    });
};

//新增明星投資者(star表)
exports.postInsertStar = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `insert into star_investor_db.all_star (user_id,brokerId,sub_price) values ('${data.user_id}','${data.brokerId}','${data.subPrice}')`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows.affectedRows);
            }
        );
    });
};
//新增文章吃到飽
exports.postInsertSubscribePost = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `insert into star_investor_db.article_subs (user_id,subs_star_id,subs_time,mode) values('${data.userid}','${data.shareID}','${data.startDate}','full');`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows.affectedRows);
            }
        );
    });
};
//新增文章單篇訂閱
exports.postInsertSinglePost = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `insert into star_investor_db.article_subs (user_id,subs_post_id,mode) values('${data.userid}','${data.postId}','single');`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows.affectedRows);
            }
        );
    });
};
