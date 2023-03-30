const db = require('./connection_db');
const getStarInvestorModel = require('./getStarInvestorModel');
const file = require('../Asset/TWSE_DATA.json');

/* 
//取出明星投資者的user_id
exports.getuser_id = (securitiesAccount) => {
    return new Promise((resolve, reject) => {
        db.query(`select user_id FROM star_investor_db.all_users where securitiesAccount="${securitiesAccount}";`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            let user_id;
            rows.map((x, index) => {
                user_id = x["user_id"];
            })
            resolve(user_id);
        })
    })
}
*/

/*
//取出securitiesAccount的 bro?_details
exports.getbrokerIdDetail = (securitiesAccount) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select brokerId FROM star_investor_db.all_users where securitiesAccount="${securitiesAccount}";`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                var brokerIdDetail;
                rows.map((x, index) => {
                    brokerIdDetail = x['brokerId'];
                    brokerIdDetail = brokerIdDetail.toLowerCase();
                    brokerIdDetail = 'bro' + brokerIdDetail + '_details';
                });
                resolve(brokerIdDetail);
            }
        );
    });
};

//取出securitiesAccount的 bro?_inventory
exports.getbrokerInventory = (securitiesAccount) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select brokerId FROM star_investor_db.all_users where securitiesAccount="${securitiesAccount}";`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                var brokerIdInv;
                rows.map((x, index) => {
                    brokerIdInv = x['brokerId'];
                    brokerIdInv = brokerIdInv.toLowerCase();
                    brokerIdInv = 'bro' + brokerIdInv + '_inventory';
                });
                resolve(brokerIdInv);
            }
        );
    });
};
*/

// ------------------------------------------------------------------------------------------
// 已下是非直接對應到圖表的function，做區隔看起來比較不會混亂

//計算 目前"未實現"損益，拿的是"庫存"資料，配合 "股票報酬圖表"
exports.getUnrealizePerformer = (brokerIdInv, user_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM ${brokerIdInv} where user_id=${user_id}`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }

                let profit = 0;
                let cost = 0;
                rows.map((x, index) => {
                    let stock = file[x['stock']];
                    x['endPrice'] = stock['endPrice'];
                    // 留在庫存的方式可能是 現買、資買、券賣，但券賣和其他兩種算profit的方式不同所以多一個判斷
                    if (x['trade_mode'] == 'lending sell') {
                        profit =
                            profit +
                            (Number(x['average_price']) - Number(x['endPrice'])) *
                            Number(x['propertyValue']);
                        cost =
                            cost +
                            Number(x['average_price']) * Number(x['propertyValue']);
                    } else {
                        profit =
                            profit +
                            (Number(x['endPrice']) - Number(x['average_price'])) *
                            Number(x['propertyValue']);
                        cost =
                            cost +
                            Number(x['average_price']) * Number(x['propertyValue']);
                    }
                });
                let percent = Math.round((profit / cost) * 10000) / 100;
                // 市價:911         資買價:888      1張      +23000
                // 市價:158.5       券賣價:154.5    2張       -8000
                let obj = {};
                obj['label'] = Number(profit).toFixed();
                obj['percent'] = percent;
                resolve(obj);
            }
        );
    });
};

//取出明星投資者的tag含有的數字，用[]，配合標籤圖表
exports.getTag = (securitiesAccount) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select tag FROM star_investor_db.all_users where securitiesAccount="${securitiesAccount}";`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }

                //{{"user_id" : "1", "tag" : ",1,3,5,"}}
                //{{"tag" : ",1,3,5,"}}
                var tag = [];
                rows.map((x, index) => {
                    tag = x['tag'].split(',');
                    tag.pop();
                    tag.shift();
                });
                resolve(tag);
            }
        );
    });
};

//取出tag 圖表所需的數據，圖表表達的意思是 在明星投資者擅長的tag中，
//訂閱者也喜歡這些tag的人數分別加總後當分母，個別tag的佔比(%)
// 配合標籤圖表
exports.getTagNum = (user_id, tagArr, tagArrChinese) => {
    return new Promise((resolve, reject) => {
        // tagArr是一個含有這個明星投資者tag數字的array
        console.log("Hi, I'm in TagNum!");

        //let tagArrChinese = this.getTagChinese(tagArr);
        let tagDataArr = [];
        // + "${"
        // }
        let sqlcontent = ``;
        let sqlcontent1 = `select count(tag) FROM star_investor_db.all_users where tag like '%,`;
        let sqlcontent2 = `,%' and user_id in (select user_id FROM star_investor_db.all_subscriber where shareID=3)`; //${user_id}
        //console.log(tagArr.length);
        for (let i = 0; i < tagArr.length; i++) {
            if (i == tagArr.length - 1) {
                sqlcontent += sqlcontent1 + tagArr[i] + sqlcontent2 + `;`;
            } else {
                sqlcontent += sqlcontent1 + tagArr[i] + sqlcontent2 + ` union all `;
            }
        }
        // tagArr裡面可能有很多tag，一個一個取出來抓出喜歡這個tag的訂閱者

        console.log(sqlcontent);

        db.query(sqlcontent, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }

            // 拿count(tag) 裡的數字(幾個訂閱者喜歡這個tag)
            let count = 0;
            rows.map((x, index) => {
                let obj = {};
                count = x['count(tag)'];
                obj['tagname'] = tagArrChinese[index];
                obj['count'] = count;
                tagDataArr.push(obj);
            });
            resolve(tagDataArr);
        });
    });
};

// 取出 文章bar資料 favorites_num收藏人數、message留言人數、views觀看次數、read付費訂閱人數
// 文章數據分析圖表
exports.getArticleData = (user_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select title,favorites_num,message,views,article.read FROM article where user_id=${user_id};`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                var BigArr = [];
                console.log(rows);
                rows.map((x, index) => {
                    var obj = {};
                    obj['文章名稱'] = x['title'];
                    obj['收藏人數'] = x['favorites_num'];
                    obj['留言人數'] = x['message'];
                    obj['觀看次數'] = x['views'];
                    obj['付費訂閱人數'] = x['read'];
                    BigArr.push(obj);
                });
                resolve(BigArr);
            }
        );
    });
};

// 取出 某個明星投資者某個月分的profit
// 直接配合"每月損益圖表"，而"權益曲線圖表"則是會在pageController取get_table_bar_MonthlyRevenue，算間接用到吧
exports.getMonthlyRevenueData = (brokerIdDetail, user_id, time) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select profit FROM ${brokerIdDetail} where user_id=${user_id} and updateDate LIKE '%${time}%';`,
            function (err, rows) {
                // ${user_id}
                //"${time}"
                if (err) {
                    console.log(err);
                    reject(rows);
                    console.log('fail');
                    return;
                }
                //console.log(rows);
                let obj = {};
                let profit = 0;
                rows.map((x, index) => {
                    //console.log(x["profit"]);
                    profit = profit + x['profit'];
                });
                obj['date'] = time;
                obj['profit'] = profit;
                //console.log(profit);
                //console.log("omg");
                //console.log(obj);
                resolve(JSON.parse(JSON.stringify(obj)));
            }
        );
    });
};

// 取出 明星投資者某個月分的 "庫存訂閱" 總收益
// 問: 取消訂閱是會直接在 all_subscriber刪掉嗎?
/*
exports.getMonthlyRevenueData = (shareID, time) => {
    return new Promise((resolve, reject) => {
        db.query(`select coont(user_id), totalSubscribeAmount FROM all_subscriber where shareID="${shareID}" and updateDate= LIKE '%"${time}%"';`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            let obj;
            let profit = 0;
            rows.map((x, index) => {
                profit = profit + x["profit"];
            })
            obj[time] = profit;
            resolve(obj);
        })
    })
}
*/

// 取出 每月訂閱庫存收益(bar) data
exports.getMonthlySubsRevenueData = (time, timeProfit, user_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select ${timeProfit} FROM star_investor_db.all_star_history_profit where user_id=${user_id};`,
            function (err, rows) {
                //${user_id}
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                let obj = {};
                let profit = 0;
                rows.map((x, index) => {
                    profit = x[timeProfit];
                });
                obj['date'] = time;
                obj['profit'] = profit;
                resolve(obj);
            }
        );
    });
};

// 取出 每月訂閱庫存人數(line) data
exports.getMonthlySubsNumberData = (time, timesubnum, user_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select ${timesubnum} FROM star_investor_db.all_star_history_profit where user_id=${user_id};`,
            function (err, rows) {
                //${user_id}
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                let obj = {};
                let subnum = 0;
                rows.map((x, index) => {
                    subnum = x[timesubnum];
                });
                obj['date'] = time;
                obj['subnum'] = subnum;
                resolve(obj);
            }
        );
    });
};

// 取出 tag的中文
exports.getTagChinese = (tagArr) => {
    return new Promise((resolve, reject) => {
        // tagArr是一個含有這個明星投資者tag數字的array
        // + "${"
        // }
        let sqlcontent = ``;
        let sqlcontent1 = `select explanation FROM star_investor_db.explanation where star_investor_db.explanation.column="tag" and value=`;
        let sqlcontent2 = ``;
        for (let i = 0; i < tagArr.length; i++) {
            if (i == tagArr.length - 1) {
                sqlcontent += sqlcontent1 + tagArr[i] + sqlcontent2 + `;`;
            } else {
                sqlcontent += sqlcontent1 + tagArr[i] + sqlcontent2 + ` union `;
            }
        }
        // tagArr裡面可能有很多tag，一個一個取出來抓出喜歡這個tag的訂閱者

        //console.log("sqlcontent", sqlcontent);
        db.query(sqlcontent, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }

            // 拿count(tag) 裡的數字(幾個訂閱者喜歡這個tag)
            let chineseArr = [];
            rows.map((x, index) => {
                chineseArr.push(x['explanation']);
            });
            //console.log("chineseArr", chineseArr);
            resolve(JSON.parse(JSON.stringify(chineseArr)));
        });
    });
};
//股票市值&&總成本
exports.get_invest_cost = (brokerIdInv, user_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM ${brokerIdInv} where user_id=${user_id}`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }

                let profit = 0;
                let cost = 0;
                rows.map((x, index) => {
                    let stock = file[x['stock']];
                    x['endPrice'] = stock['endPrice'];
                    // 留在庫存的方式可能是 現買、資買、券賣，但券賣和其他兩種算profit的方式不同所以多一個判斷
                    if (x['trade_mode'] == 'lending sell') {
                        profit =
                            profit +
                            (Number(x['average_price']) - Number(x['endPrice'])) *
                            Number(x['propertyValue']);
                        cost =
                            cost +
                            Number(x['average_price']) * Number(x['propertyValue']);
                    } else {
                        profit =
                            profit +
                            (Number(x['endPrice']) - Number(x['average_price'])) *
                            Number(x['propertyValue']);
                        cost =
                            cost +
                            Number(x['average_price']) * Number(x['propertyValue']);
                    }
                });
                let percent = Math.round((profit / cost) * 10000) / 100;
                // 市價:911         資買價:888      1張      +23000
                // 市價:158.5       券賣價:154.5    2張       -8000
                let obj = {};
                obj['profit'] = profit;
                obj['cost'] = cost;
                resolve(obj);
            }
        );
    });
};
