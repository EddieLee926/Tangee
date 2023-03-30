const db = require('./connection_db');

// 登入頁面
exports.postCheckUserAccount = (value) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select user_id,status,brokerId,securitiesAccount ,explanation,nick_name,tag from all_users 
        left join explanation on explanation.value=all_users.brokerId where account='${value.account}' and password='${value.password}';`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(JSON.parse(JSON.stringify(rows)));
                //console.log('login', JSON.parse(JSON.stringify(rows)));
            }
        );
    });
};
//個人頁面資訊
exports.getInfo = (id) => {
    console.log('id', id);
    return new Promise((resolve, reject) => {
        db.query(
            `select nick_name,email,phone,member_level,invest_amount,invest_goal,Q3_InvestReason,Q1_InvestStyle,Q2_InvestCycle,Q4_InvestExperience from all_users where user_id='${id}';`,
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
//訂閱者的email
exports.get_email = (data) => {
    console.log('訂閱者的email', data.user_id);
    return new Promise((resolve, reject) => {
        db.query(
            `select email from all_users where user_id in( select user_id from all_subscriber where shareID='${data}');`,
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

//取得信件需要的中文資訊
exports.get_data_name = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select  nick_name, all_users.securitiesAccount, date_format(updateDate, '%Y/%m/%d %T')as updateTime, explanation.explanation,stock_name from star_investor_db.${data.bro_detail}
            inner join star_investor_db.all_users on all_users.brokerId=${data.bro_detail}.brokerId and all_users.user_id=${data.bro_detail}.user_id
            inner join star_investor_db.explanation on ${data.bro_detail}.trade_mode=explanation.value
            where ${data.bro_detail}.user_id='${data.user_id}' and ${data.bro_detail}.stock='${data.stock}'
            order by updateDate desc Limit 1 `,
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

//get-tag-name
exports.getTagName = (tag) => {
    var tag = tag.split(',');
    tag.pop();
    tag.shift();
    console.log(tag, 'asac');
    console.log(tag[0]);
    console.log(tag[1]);
    console.log(tag[2]);
    var sqlContent = `select explanation FROM explanation e where e.column="tag" and e.value="5"`;
    sqlContent += `union select explanation FROM explanation e where e.column="tag" and e.value="5";`;
    console.log(sqlContent);
    return new Promise((resolve, reject) => {
        db.query(
            `select value,explanation FROM explanation e where e.column="tag" and e.value='${tag[0]}' union select value,explanation FROM explanation e where e.column="tag" and e.value='${tag[1]}' union select value,explanation FROM explanation e where e.column="tag" and e.value='${tag[2]}';`,
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
// 取得使用者圖片
exports.getUserPicture = (value) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select url from picture where type='${value.type}' and related_to='${value.relatedID}';`,
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
//我訂閱的明星投資者
exports.getSubStar = (id) => {
    console.log(id, 'lll');
    return new Promise((resolve, reject) => {
        db.query(
            `select allStars.user_id,allUsers.nick_name, picture.url,performance.profit, times, month,tag
        FROM all_users as allUsers
        inner join all_star as allStars on allUsers.user_id=allStars.user_id 
        inner join performance   on performance.user_id=allStars.user_id
        left join picture  on allStars.user_id=picture.related_to
        inner join all_subscriber as subscriber on subscriber.shareID=allStars.user_id
        where picture.type=1 and dueDate is null and  subscriber.user_id='${id}';`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(JSON.parse(JSON.stringify(rows)));
                console.log('aaa', JSON.parse(JSON.stringify(rows)));
            }
        );
    });
};
exports.postShareSecuritiesAccount = (data) => {
    return new Promise((resolve, reject) => {
        db.query('insert into all_star set?', data, function (err, rows) {
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
};

exports.getSubscribedStarInvestor = (user_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT nick_name, securitiesAccount FROM all_subscriber inner join 
            all_users on all_subscriber.shareID = all_users.user_id 
            where all_subscriber.user_id=${user_id};`,
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

exports.updateShareSecuritiesAccountSubscribeAmount = ([amount, account]) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update all_star set subAllPost_price=? where securitiesAccount=?',
            [amount, account],
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

exports.deleteShareSecuritiesAccount = (account) => {
    return new Promise((resolve, reject) => {
        db.query(
            'delete from all_star where securitiesAccount=?',
            account,
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
//訂閱的明星投資者(下拉式選單)
exports.getSubscribedStarInvestor = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select user_id,nick_name
        from all_users 
        where all_users.user_id in (select all_subscriber.shareID from all_subscriber where all_subscriber.user_id=${id} and dueDate is null)`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(JSON.parse(JSON.stringify(rows)));
                // console.log(
                //     '訂閱的明星投資者(下拉式選單)',
                //     JSON.parse(JSON.stringify(rows))
                // );
            }
        );
    });
};
//訂閱的明星投資者之股票(下拉式選單)
exports.getSubscribedStarInvestorStock = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT stock,stock_name FROM ${data.broScheme} where user_id="${data.selectedStarInvestor}" group by stock;`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(JSON.parse(JSON.stringify(rows)));
                console.log(
                    '訂閱的明星投資者之股票(下拉式選單)',
                    JSON.parse(JSON.stringify(rows))
                );
            }
        );
    });
};
//quorum settings when users log in
exports.getQuorumSettings = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT web_socket_conn, brokerId_addr from
            all_users inner join broker on all_users.brokerId = broker.brokerId
            where all_users.user_id = ${id};`,
            (err, rows) => {
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
//TAG(下拉式選單)
exports.get_tag = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `select explanation,value FROM explanation e where e.column="tag";`,
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

//取得使用者tag
exports.get_user_tag = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT tag FROM star_investor_db.all_users where user_id='${id}';`,
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
//檢查該使用者是否有訂閱過該明星投資者
exports.getSubscribeStar = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM all_subscriber where user_id=${data.userid} and shareID=${data.shareID};`,
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

//檢查該使用者"目前"是否有訂閱過該明星投資者
exports.getCurrentSubscribeStar = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM star_investor_db.all_subscriber where user_id=${data.userid} and shareID=${data.shareID} and dueDate is null;`,
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
///將tag轉為文字型態
exports.get_user_tag_name = (tag) => {
    tag = tag[0].tag.split(',');
    tag.pop();
    //var tag = tag.split(',');
    console.log(tag, 'asac');
    var sqlContent = '';
    tag
        ? (sqlContent += `select explanation,e.value FROM explanation e where e.column="tag" and e.value='${tag[1]}'`)
        : '';
    for (let i = 2; i < tag.length; i++) {
        sqlContent += `union select explanation,e.value FROM explanation e where e.column="tag" and e.value='${tag[i]}'`;
    }

    console.log(sqlContent);
    return new Promise((resolve, reject) => {
        db.query(sqlContent, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
};

//取得使用者訂閱吃到飽的作家
exports.subscribed_Star_Post = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            ` SELECT subs_star_id, nick_name, url as imgUrl FROM star_investor_db.article_subs
            inner join star_investor_db.all_users on all_users.user_id=article_subs.subs_star_id
            inner join star_investor_db.picture on picture.related_to=article_subs.subs_star_id
            where article_subs.user_id=${data.userid} and mode='full' and picture.type=1;`,
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

// 取出吃到飽訂閱最多的前8名, Arr 要給所有明星投資者的 user_id
exports.getFullArticleSub = (Arr) => {
    return new Promise((resolve, reject) => {
        let Array = Arr;
        let sql = ``;
        for (let i = 0; i < Array.length; i++) {
            if (i == 8) {
                sql +=
                    'select count(subs_star_id) from article_subs where subs_star_id=' +
                    Array[i] +
                    ';';
            } else {
                sql +=
                    'select count(subs_star_id) from article_subs where subs_star_id=' +
                    Array[i] +
                    ' union all ';
            }
        }
        db.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }

            let fullSubsNumArr = [];
            rows.map((x, index) => {
                let obj = {};
                obj['user_id'] = Array[index];
                obj['count'] = x['count(subs_star_id)'];
                fullSubsNumArr.push(obj);
            });
            // 回傳[{user_id:1, count:1}, {user_id:2, count:0}, {user_id:3, count:2}....]

            resolve(JSON.parse(JSON.stringify(fullSubsNumArr)));
        });
    });
};
//檢查該使用者"目前"是否有訂閱過該明星投資者的文章吃到飽
exports.getCurrentSubscribeStarPost = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM star_investor_db.article_subs where user_id=${data.userid} and subs_star_id=${data.shareID} and mode='full';`,
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
//檢查該使用者是否有訂閱過該明星投資者的文章吃到飽
exports.getSubscribeStarPost = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM star_investor_db.article_subs where user_id=${data.userid} and subs_star_id=${data.shareID};`,
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
//先檢查該使用者是否有訂閱過該文章
exports.getCurrentSubscribeSinglePost = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM star_investor_db.article_subs where user_id=${data.userid} and subs_post_id=${data.postId};`,
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
