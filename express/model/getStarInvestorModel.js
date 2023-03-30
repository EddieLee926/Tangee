const db = require('./connection_db');
const file = require('../Asset/TWSE_DATA.json');
//放有關明星投資者資料的東西(如績效等等)

//starinvestor-management
//訂閱費用
exports.getStarSubPrice = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select sub_price from all_star where user_id='${id}';`,
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
// 取得付款頁面需要的資訊-投資者綽號&文章&一般訂閱費用(payment page)
exports.getPaymentData = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT nick_name,sub_price,subAllPost_price,subAllPost_price,all_users.brokerId,securitiesAccount 
            FROM all_star inner join all_users on all_star.user_id = all_users.user_id 
            where all_star.user_id = ${id};`,
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

//投資者Memo
exports.getStarMemo = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select memo from all_star where user_id='${id}';`,
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

// 以下是和加明細到庫存的function 有關的其他function
//---------------------------------------------------------------------------------

// 更新明細資料，同時算出每筆"已實現"交易的損益，然後給出bigObject物件insert到庫存
// 修改0: call 這個 model 的 controller 要先拿到 inv_num (討論要放在資料庫的哪裡)
exports.updateDetailsToInventory = (brokerIdDetail, securitiesAccount, inv_num) => {
    // 修改1: 要 select 大於目前inv_num的，下面sql要下這個條件
    return new Promise((resolve, reject) => {
        var bigObject = {};
        // in(.... inv_num)
        // ordered by
        db.query(
            `SELECT * FROM "${brokerIdDetail}" where securitiesAccount="${securitiesAccount}" and inv_num>"${inv_num}";`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }

                resolve(JSON.parse(JSON.stringify(rows)));
            }
        );

        // 下一個insert bigObject的資料到 inventory 的語法
        // inv_num 寫在監聽部分
    });
};

//取出某券商的的inv_num
exports.getinv_num = (brokerIdDetail) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select value FROM star_investor_db.explanation where table="${brokerIdDetail}";`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                var inv_num;
                rows.map((x, index) => {
                    inv_num = x['inv_num'];
                });
                resolve(inv_num);
            }
        );
    });
};

// 取出 bro?_inventory 的 id_stock_mode 名字相同的那筆資料
exports.getDataId_stock_mode = (brokerInventory, id_stock_mode) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM "${brokerInventory}" where id_stock_mode="${id_stock_mode}";`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }

                var object = {};
                rows.map((x, index) => {
                    object['inv_num'] = x['inv_num'];
                    object['id_stock_mode'] = x['id_stock_mode'];
                    object['user_id'] = x['user_id'];
                    object['brokerId'] = x['brokerId'];
                    object['securitiesAccount'] = x['securitiesAccount'];
                    object['stock'] = x['stock'];
                    object['propertyKey'] = x['propertyKey'];
                    object['propertyValue'] = x['propertyValue'];
                    object['trade_mode'] = x['trade_mode'];
                    object['average_price'] = x['trade_price'];
                    object['updateDate'] = x['updateDate'];
                    object['stock_name'] = x['stock_name'];
                });
                resolve(object);
            }
        );
    });
};

// 修改 bro?_inventory 的 id_stock_mode 名字相同的那筆資料
exports.reviseDataId_stock_mode = (brokerIdDetail, id_stock_mode) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE brokerInventory SET value="${inv_num}" WHERE table="${brokerIdDetail}";`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }

                //resolve();
            }
        );
    });
};

//明星投資者是否有分享文章
exports.getSharePost = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select sharePost from all_star where user_id='${id}';`,
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

//取得投資者是否有分享證券帳號
exports.getshareAccountState = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT shareAccount FROM star_investor_db.all_star where user_id='${id}';`,
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
//訂閱者名單
exports.getStarSubs = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select nick_name, gender, TIMESTAMPDIFF(YEAR,birth,CURDATE()) as age,datediff(now(),startDate) as timee,u.brokerId from all_users u inner join all_subscriber s on u.user_id=s.user_id where  s.shareID='${id}';`,
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
//訂閱人數
exports.getStarSubNum = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select count(*) as num from all_subscriber where shareID='${id}';`,
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
//總收益
exports.getStarSubSum = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT sum(all_star.sub_price) as sum
                FROM all_subscriber,all_star
                where all_subscriber.shareID='${id}' and all_star.user_id='${id}';`,
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
//starinvestordetails
//投資績效
exports.getDetailStarPerformance = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select year,month,times,profit,loss from performance where user_id='${id}';`,
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
//明細
exports.getDetailStarDetail = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select stock,propertyValue,trade_mode,trade_price from broa_details where brokerId='A' and securitiesAccount='123456';`,
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
//歷史文章
exports.getDetailStarArticle = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT post_id,views,title,url as post_url,date_format(article.updateTime, '%Y/%m/%d %T')as updateTime FROM article inner join picture on post_id = related_to 
            where user_id=${id} and type=2;`,
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
//searchstarinvestor
//搜尋明星投資者
exports.getDataSearch = (data) => {
    return new Promise((resolve, reject) => {
        console.log(data, 'searrrch');
        db.query(
            `select allStars.user_id,allUsers.nick_name, picture.url,performance.profit,times, month,tag
                FROM star_investor_db.all_users as allUsers
                inner join star_investor_db.all_star as allStars on allUsers.user_id=allStars.user_id
                inner join star_investor_db.picture as picture on allStars.user_id=picture.related_to
                left join  star_investor_db.performance as performance on performance.user_id=allStars.user_id
                where picture.type=1 and allStars.user_id in(
                SELECT  a.user_id
                from(
                SELECT user_id from star_investor_db.all_users where (nick_name like '%${data.title}%' or tag LIKE  
                CONCAT('%', (
                    select e.value 
                    from star_investor_db.explanation e
                    where e.explanation like '%${data.title}%' and e.column="tag"  limit 1)
                    , '%'
                )) and status='star' and user_id !=1)as a);`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                console.log('搜尋m');
                resolve(JSON.parse(JSON.stringify(rows)));
            }
        );
    });
};
//熱門的明星投資者
exports.getDataAllStar = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `select allStars.user_id,allUsers.nick_name, picture.url,performance.profit,tag,month,times
                FROM all_users as allUsers, 
                all_star as allStars, picture ,performance 
                where allUsers.user_id=allStars.user_id and allStars.user_id=picture.related_to and picture.type=1
                and performance.user_id=allStars.user_id and allStars.user_id in(
                SELECT  a.shareID
                from(
                SELECT  shareID
                FROM all_subscriber
                GROUP BY shareID
                ORDER  BY COUNT(shareID) DESC LIMIT 5)as a);`,
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

//個人頁面中根據每個tag推薦明星投資者
exports.RecommendStarByTag = (data) => {
    var tag = data.tag;
    tag = tag.split(',');
    tag.shift();
    tag.pop();
    console.log(tag, 'asac');
    var comment = ` select allStars.user_id,allUsers.nick_name, picture.url,performance.profit, times, month, tag as tagNumber
    FROM star_investor_db.all_users as allUsers, 
    star_investor_db.all_star as allStars, star_investor_db.picture ,star_investor_db.performance 
    where allUsers.user_id=allStars.user_id and allStars.user_id=picture.related_to and picture.type=1
    and performance.user_id=allStars.user_id and allStars.user_id in(
    SELECT  a.user_id
    from( `;
    for (let index = 0; index < tag.length; index++) {
        comment += `(SELECT user_id from star_investor_db.all_users where tag like '%,${tag[index]},%' and status='star' and user_id!='${data.userid}' Limit 2)  `;
        if (index != tag.length - 1) {
            comment += `UNION ALL `;
        }
    }
    comment += `)as a)order by performance.profit desc ;`;
    console.log(comment, 'comment');
    return new Promise((resolve, reject) => {
        db.query(comment, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
};
//個人推薦明星投資者
exports.getDataRecommendStar = (tag) => {
    var tag = tag.split(',');
    tag.shift();
    tag.pop();
    console.log(tag, 'asac');
    var comment = `select allStars.user_id, allUsers.nick_name, picture.url, performance.profit, times, month, tag
    FROM star_investor_db.all_users as allUsers, star_investor_db.all_star as allStars, star_investor_db.picture, star_investor_db.performance 
    where allUsers.user_id = allStars.user_id and allStars.user_id = picture.related_to and picture.type = 1 and performance.user_id = allStars.user_id
    and allStars.user_id in (
select b.user_id from(select a.user_id, count(*) from( `;
    for (let index = 0; index < tag.length; index++) {
        comment += `SELECT user_id from star_investor_db.all_users where tag like '%,${tag[index]},%' `;
        if (index != tag.length - 1) {
            comment += `UNION ALL `;
        }
    }
    comment += ` ) a group by a.user_id order by count(*) desc limit 9) as b);`;
    console.log(comment, 'comment');
    return new Promise((resolve, reject) => {
        db.query(comment, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
};

//starinvestor-post頁面
//統計資料
exports.getStarSta = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select sum(favorites_num) as favorites_nums,sum(message) as message,sum(views) as views,sum(subs_num)  as subs_num from article where user_id='${id}';`,
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
//綜合分析
exports.getStarAna = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select title,favorites_num,message, views,subs_num, price,post_id from article a  inner join star_investor_db.all_star s on a.user_id=s.user_id where  a.user_id='${id}';`,
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

//取得使用者追蹤之明星投資者之庫存明細
exports.getInventoryReceiptList = (data) => {
    var sqlContent = `select stock_name, all_details.detail_num ,date_format(all_details.update_time, '%Y/%m/%d %T')as updateTime, explanation.explanation,all_details.stock`;
    data.unfollow ? '' : (sqlContent += `,trade_price, propertyValue,remarks`);
    sqlContent += ` FROM all_details 
                        inner join ${data.broScheme}  on (all_details.detail_num = ${data.broScheme}.detail_num)
                        left join explanation  on ${data.broScheme}.trade_mode=explanation.value
                        where all_details.user_id="${data.selectedStarInvestor}"`;
    data.selectedStock
        ? (sqlContent += ` and all_details.stock = "${data.selectedStock}"`)
        : '';
    data.selectedStarInvestor
        ? ''
        : (sqlContent = `select stock_name,trade_price, propertyValue, all_details.detail_num, remarks ,date_format(all_details.update_time, '%Y/%m/%d %T')as updateTime,explanation.explanation,all_details.stock
         FROM all_details 
        inner join ${data.broScheme}  on (all_details.detail_num = ${data.broScheme}.detail_num)
        left join explanation  on ${data.broScheme}.trade_mode=explanation.value
        where ${data.broScheme}.user_id in (select shareID from all_subscriber where user_id=${data.userid}) `);
    sqlContent += ` order by updateTime desc`;
    data.limit ? (sqlContent += ` LIMIT 5`) : '';
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

//取得明星投資者之券商資料表
exports.getStarBroScheme = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT explanation
                                FROM star_investor_db.all_users as all_users
                        inner join star_investor_db.explanation as explanation on all_users.brokerId=explanation.value
                        where user_id='${id}';`,
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

//const file = require("../Asset/TWSE_DATA.json");
//securitiesAccount and stock can be variables
exports.getInventoryReceiptListPicture = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `select * FROM all_details right join broa_details 
            on (all_details.id_d = broa_details.num)
            where broa_details.securitiesAccount=123456 and broa_details.stock = 2330`,
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
//取得使用者追蹤之明星投資者之投資組合
exports.getInventoryCompositionTable = (data) => {
    var sqlContent = `SELECT stock_name,stock,explanation,average_price,propertyValue FROM ${data.broScheme} 
        left  join explanation  on explanation.value= ${data.broScheme}.trade_mode`;
    //data.selectedStarInvestor == data.userid?
    data.selectedStarInvestor
        ? (sqlContent += ` where user_id="${data.selectedStarInvestor}"`)
        : (sqlContent += ` where user_id in (select user_id from all_users where all_users.user_id in (select all_subscriber.shareID from all_subscriber where all_subscriber.user_id=${data.userid}))`);
    //sqlContent += ` where user_id="${data.selectedStarInvestor}"`
    console.log(sqlContent);
    return new Promise((resolve, reject) => {
        db.query(sqlContent, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            //console.log("file", file["2881A"].endPrice)
            rows.map((x, index) => {
                var stock = file[x['stock']];
                x['endPrice'] = stock['endPrice'];
            });
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
};

//根據券商資料表找券商庫存資料表
exports.getbroInventoryScheme = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `   select a.explanation from star_investor_db.explanation as b
            inner join star_investor_db.all_users on all_users.brokerId=b.value
            inner join star_investor_db.explanation as a on b.explanation=a.value
            where all_users.user_id="${data.selectedStarInvestor}"`,
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

// 修改 inv_num
exports.reviseinv_num = (brokerIdDetail, inv_num) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE explanation SET value="${inv_num}" WHERE table="${brokerIdDetail}";`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }

                //resolve();
            }
        );
    });
};

// insert obj 到 bro?_inventory
exports.insertDetailsToInventory = (brokerIdInv) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO "${brokerIdInv}" VALUES ()`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }

            //resolve();
        });
    });
};
exports.updateInventoryReceiptListRemark = ([user_id, remarks]) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT remarks FROM all_details where user_id =?`,
            user_id,
            function (err, rows) {
                {
                    if (err) {
                        console.log(err);
                        reject(rows);
                        return;
                    }
                    resolve(JSON.parse(JSON.stringify(rows)));
                }
            }
        );
    });
};
//---------------------------------------------------------------------------------
// 以上是和加明細到庫存的function 有關的其他function

exports.getInventoryComposition = (securitiesAccount) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM broa_details where securitiesAccount="${securitiesAccount}"`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }

                rows.map((x, index) => {
                    var stock = file[x['stock']];
                    x['endPrice'] = stock['endPrice'];
                });
                /*
            var data = JSON.stringify(rows);
            console.log(rows);
            resolve(JSON.parse(data));
            */
                resolve(rows);
            }
        );
    });
};

//計算 "已實現"損益，拿的是"明細"資料
exports.getRealizePerformer = (securitiesAccount) => {
    return new Promise((resolve, reject) => {
        var bigObject = {};
        db.query(
            `SELECT * FROM broa_details where securitiesAccount="${securitiesAccount}" and updateDate LIKE '%2021%';`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }

                /* 
            1.股票        2.trade_mode : 6種         3.時間區段
            一、rows迴圈裡{
            1.判斷股票是否在前面出現過 用some()  沒有: 加進stockArray 同時創一個object(inventory裡有的column都要有) 然後自己幫物件加一個以 "代碼 + mode" 為key 然後加進bigObject 
            有: 只有現買、資買、券賣 三種可能才會持有，跳到步驟2
            2.判斷交易的方式(用 "代碼 + mode" 去比對 bigObject 裡的物件) hasOwnProperty()
            一樣: 修改物件裡的 shares、並修改inv_num
            不一樣(表示是 mode 不同): 會有現買、資買、券賣(最多3選2種) 或是 原mode的相反 最多共3種，跳到步驟3
            3.判斷若非原mode的相反: 加新的物件("代碼 + mode")
            是原mode相反: 修改"相反"物件裡的 shares、並修改inv_num  同時計算損益
            }
            相反物件: normal sell, financial sell, lending buy

            二、迴圈外: 用bigObject更新inventory
            */

                var stockArray = [3];
                var profit = 0;

                // 測試的時候如果有錯的話，看要不要 JSON.stringify() 一些資料

                rows.map((x, index) => {
                    if (stockArray.indexOf(x['stock']) != -1) {
                        var name = x['stock'] + x['trade_mode'];
                        if (bigObject.hasOwnProperty(name)) {
                            var sameModeDetails = bigObject[name];
                            sameModeDetails['average_price'] = String(
                                (Number(sameModeDetails['average_price']) *
                                    Number(sameModeDetails['propertyValue']) +
                                    Number(x['trade_price']) *
                                    Number(x['propertyValue'])) /
                                (Number(sameModeDetails['propertyValue']) +
                                    Number(x['propertyValue']))
                            );
                            sameModeDetails['propertyValue'] = String(
                                Number(sameModeDetails['propertyValue']) +
                                Number(x['propertyValue'])
                            );
                            sameModeDetails['inv_num'] = x['inv_num'];
                        } else {
                            if (
                                (x['trade_mode'] == 'normal buy') |
                                (x['trade_mode'] == 'financial buy') |
                                (x['trade_mode'] == 'lending sell')
                            ) {
                                stockArray.push(x['stock']);
                                var object = {};
                                object['inv_num'] = x['inv_num'];
                                object['user_id'] = x['user_id'];
                                object['brokerId'] = x['brokerId'];
                                object['securitiesAccount'] = x['securitiesAccount'];
                                object['stock'] = x['stock'];
                                object['propertyKey'] = x['propertyKey'];
                                object['propertyValue'] = x['propertyValue'];
                                object['trade_mode'] = x['trade_mode'];
                                object['average_price'] = x['trade_price'];
                                object['updateDate'] = x['updateDate'];
                                object['stock_name'] = x['stock_name'];
                                var name = x['stock'] + x['trade_mode'];
                                bigObject[name] = object;
                            } else {
                                if (x['trade_mode'] == 'normal sell') {
                                    var minusName = x['stock'] + 'normal buy';
                                    var opositeModeDetails = bigObject[minusName];
                                    opositeModeDetails['propertyValue'] = String(
                                        Number(opositeModeDetails['propertyValue']) -
                                        Number(x['propertyValue'])
                                    );
                                    opositeModeDetails['inv_num'] = x['inv_num'];
                                    profit =
                                        profit +
                                        (Number(x['trade_price']) -
                                            Number(opositeModeDetails['average_price'])) *
                                        Number(x['propertyValue']);
                                } else if (x['trade_mode'] == 'financial sell') {
                                    var minusName = x['stock'] + 'financial buy';
                                    var opositeModeDetails = bigObject[minusName];
                                    opositeModeDetails['propertyValue'] = String(
                                        Number(opositeModeDetails['propertyValue']) -
                                        Number(x['propertyValue'])
                                    );
                                    opositeModeDetails['inv_num'] = x['inv_num'];
                                    profit =
                                        profit +
                                        (Number(x['trade_price']) -
                                            Number(opositeModeDetails['average_price'])) *
                                        Number(x['propertyValue']);
                                } else {
                                    var minusName = x['stock'] + 'lending sell';
                                    var opositeModeDetails = bigObject[minusName];
                                    opositeModeDetails['propertyValue'] = String(
                                        Number(opositeModeDetails['propertyValue']) -
                                        Number(x['propertyValue'])
                                    );
                                    opositeModeDetails['inv_num'] = x['inv_num'];
                                    profit =
                                        profit +
                                        (Number(opositeModeDetails['average_price']) -
                                            Number(x['trade_price'])) *
                                        Number(x['propertyValue']);
                                }
                            }
                        }
                    } else {
                        //console.log(x["stock"]);
                        stockArray.push(x['stock']); // [2330]
                        var object = {};
                        object['inv_num'] = x['inv_num'];
                        object['user_id'] = x['user_id'];
                        object['brokerId'] = x['brokerId'];
                        object['securitiesAccount'] = x['securitiesAccount'];
                        object['stock'] = x['stock'];
                        object['propertyKey'] = x['propertyKey'];
                        object['propertyValue'] = x['propertyValue'];
                        object['trade_mode'] = x['trade_mode'];
                        object['average_price'] = x['trade_price'];
                        object['updateDate'] = x['updateDate'];
                        object['stock_name'] = x['stock_name'];
                        var name = x['stock'] + x['trade_mode'];
                        bigObject[name] = object;
                    }
                });
                console.log(bigObject);
                console.log(profit);
                resolve('' + profit);
            }
        );

        // 下一個insert bigObject的資料到 inventory 的語法
        // inv_num 寫在監聽部分
    });
};

//計算 歷史"已實現"損益(從開戶到現在的已實現損益)，拿的是"明細"資料
exports.getRealizePerformer = (brokerIdDetail, securitiesAccount) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT profit FROM "${brokerIdDetail}" where securitiesAccount="${securitiesAccount}"`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }

                var profit = 0;
                rows.map((x, index) => {
                    profit = profit + x['profit'];
                });
                resolve(profit);
            }
        );
    });
};

// insert obj 到 bro?_note
exports.insertDetailsToNote = (brokerIdInv) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO "${brokerIdInv}" VALUES ()`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            //resolve();
        });
    });
};

exports.getInventoryComposition = (securitiesAccount) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM broa_details where securitiesAccount="${securitiesAccount}"`,
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
//根據明星投資者找券商資料表找券商note資料表
exports.getbroNoteScheme = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select a.explanation from star_investor_db.all_users
            inner join star_investor_db.explanation as explanation on all_users.brokerId=explanation.value
            inner join star_investor_db.explanation as a on CONCAT(explanation.explanation,'_note')=a.value
            where user_id=${data}`,
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

//取得明星投資者資料
exports.getStarData = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select user_id,status,brokerId,securitiesAccount from all_users where user_id='${id}';`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                let brokerIdDetail;
                let brokerIdInv;
                rows.map((x, index) => {
                    brokerIdDetail = x['brokerId'];
                    brokerIdDetail = brokerIdDetail.toLowerCase();
                    brokerIdDetail = 'bro' + brokerIdDetail + '_details';
                    x['brokerIdDetail'] = brokerIdDetail;

                    brokerIdInv = x['brokerId'];
                    brokerIdInv = brokerIdInv.toLowerCase();
                    brokerIdInv = 'bro' + brokerIdInv + '_inventory';
                    x['brokerIdInv'] = brokerIdInv;
                });
                resolve(JSON.parse(JSON.stringify(rows)));
            }
        );
    });
};
//計算 "未實現"損益，拿的是"庫存"資料
exports.getUnrealizePerformer = (securitiesAccount) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM broa_inventory where securitiesAccount="${securitiesAccount}" and updateDate LIKE '%2021%';`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }

                var profit = 0;
                rows.map((x, index) => {
                    var stock = file[x['stock']];
                    x['endPrice'] = stock['endPrice'];
                    // 留在庫存的方式可能是 現買、資買、券賣，但券賣和其他兩種算profit的方式不同所以多一個判斷
                    if (x['trade_mode'] == 'lending sell') {
                        profit =
                            profit +
                            (Number(x['average_price']) - Number(x['endPrice'])) *
                            Number(x['propertyValue']);
                    } else {
                        profit =
                            profit +
                            (Number(x['endPrice']) - Number(x['average_price'])) *
                            Number(x['propertyValue']);
                    }
                });
                // 市價:911         資買價:888      1張      +23000
                // 市價:158.5       券賣價:154.5    2張       -8000

                console.log(profit);
                resolve('' + profit);
            }
        );
    });
};

exports.getTagNum = (securitiesAccount, tagNum) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT tag FROM all_users, all_suscriber where where tag LIKE '%","+${tagNum}%+","' and all_users.user_id=all_suscriber.shareID";`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }

                var hasThisTag = 0;
                rows.map((x, index) => {
                    hasThisTag++;
                });

                resolve(hasThisTag);
            }
        );
    });
};
//專屬推薦明星投資者(按照tag相同數量由多到少排列)
exports.getDataMyStar = (tag) => {
    var tag = tag.split(',');
    tag.pop();
    tag.shift();
    console.log(tag, '999');
    tag[0] = ',' + tag[0] + ',';
    tag[1] = ',' + tag[1] + ',';
    tag[2] = ',' + tag[2] + ',';
    console.log(tag[0]);
    console.log(tag[1]);
    console.log(tag[2]);
    return new Promise((resolve, reject) => {
        db.query(
            `select allStars.user_id,allUsers.nick_name, picture.url,performance.profit,tag
                FROM all_users as allUsers, 
                all_star as allStars, picture ,performance 
                where allUsers.user_id=allStars.user_id and allStars.user_id=picture.related_to and picture.type=1
                and performance.user_id=allStars.user_id and allStars.user_id in(
                
             select b.user_id from (select a.user_id, count(*) from(SELECT user_id from star_investor_db.all_users where tag like '%${tag[0]}%' UNION ALL 
             SELECT user_id from star_investor_db.all_users where tag like '%${tag[1]}%' UNION ALL 
             SELECT user_id from star_investor_db.all_users where tag like '%${tag[2]}%') a group by a.user_id order by count(*) desc limit 9) as b);`,
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

//取得投資者是否有分享文章吃到飽
exports.getsharePostState = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT sharePost FROM star_investor_db.all_star where user_id='${id}';`,
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

exports.getTagRelatedHints = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `select star_investor_db.explanation.explanation FROM star_investor_db.explanation where star_investor_db.explanation.column = "tag";`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                tagHintArr = [];
                rows.map((x, index) => {
                    let obj = {};
                    obj['tag_name'] = x['explanation'];
                    tagHintArr.push(obj);
                });
                resolve(JSON.parse(JSON.stringify(rows)));
            }
        );
    });
};
