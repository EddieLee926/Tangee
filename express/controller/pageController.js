const getStarModel = require('../model/getStarInvestorModel');
const getUserModel = require('../model/getUserModel');
const insertDataModel = require('../model/insertDataModel');
const getChartTableDataModel = require('../model/getChartTableDataModel');
const updateDataModel = require('../model/updateDataModel');

//目前月份 202109
function nowsMonth() {
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;

    if (m < 10) {
        m = '0' + m;
    }

    let date_time = y + '' + m;
    return date_time;
}

//前月月份 202108
function lastMonth(date_time) {
    date_time = String(date_time);
    if (date_time.indexOf('01', 4) != -1) {
        date_time = date_time - 100 + 11; //-100 是減年分  +11是加回12月
    } else {
        date_time = date_time - 1;
    }
    return date_time;
}

// 此頁面放置所有有關頁面主要的呈現

//star-management
//訂閱費用
exports.getStarSubPrice = (req, res) => {
    const userid = JSON.parse(req.body).userid;
    getStarModel.getStarSubPrice(userid).then(
        (result) => {
            res.send(result[0]);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
exports.get_payment_data = (req, res) => {
    const { userid } = JSON.parse(req.body);
    getStarModel.getPaymentData(userid).then((result) => {
        res.send(result);
    });
};

//訂閱人數
exports.getStarSubNum = (req, res) => {
    const userid = JSON.parse(req.body).userid;
    getStarModel.getStarSubNum(userid).then(
        (result) => {
            res.send(result);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
//總收益
exports.getStarSubSum = (req, res) => {
    const userid = JSON.parse(req.body).userid;

    getStarModel.getStarSubSum(userid).then(
        (result) => {
            res.send(result);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
//訂閱者名單
exports.getStarSubs = (req, res) => {
    const userid = JSON.parse(req.body).userid;
    getStarModel.getStarSubs(userid).then(
        (result) => {
            res.send(result);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};

//明星投資者Memo
exports.getStarMemo = (req, res) => {
    const userid = JSON.parse(req.body).userid;
    getStarModel.getStarMemo(userid).then(
        (result) => {
            res.send(result[0]);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
// 一次更新"多"筆資料
// 問可不可以用 兩次 req.body
exports.update_Many_Details_To_Inventory = (req, res) => {
    const { securitiesAccount } = req.body;
    // brokerIdDetail 是 bro?_details 某位明星投資者明細會有 "它的券商" 和 "有訂閱他的券商" 都會有
    const { brokerIdDetail } = req.body;
    var inv_num = getStarInvestorModel.getinv_num(brokerIdDetail);
    /* 
            1.股票        2.trade_mode : 6種         3.時間區段
            一、rows迴圈裡{
            1.判斷股票是否在前面出現過 用indexOf()  沒有: 加進stockArray 同時創一個object(inventory裡有的column都要有) 然後自己幫物件加一個以 "代碼 + mode" 為key 然後加進bigObject 
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
    var numberofadded = 0;
    var stockArray = []; // 1,2330
    var stockDetailArray = []; // 1,2330normal buy
    getStarInvestorModel
        .updateDetailsToInventory(brokerIdDetail, securitiesAccount, inv_num)
        .map((x, index) => {
            numberofadded++;
            if (stockArray.indexOf(x['user_id'] + ',' + x['stock']) != -1) {
                var name = x['user_id'] + ',' + x['stock'] + x['trade_mode'];
                if (bigObject.hasOwnProperty(name)) {
                    var sameModeDetails = bigObject[name];
                    sameModeDetails['average_price'] = String(
                        (Number(sameModeDetails['average_price']) *
                            Number(sameModeDetails['propertyValue']) +
                            Number(x['trade_price']) * Number(x['propertyValue'])) /
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
                            var profit = 0;
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
                            // 在下面改成新function
                            var setProfitInv = x['inv_num'];
                            db.query(
                                `UPDATE broa_details SET profit="${profit}" WHERE inv_num="${setProfitInv}";`,
                                function (err, rows) {
                                    if (err) {
                                        console.log(err);
                                        reject(rows);
                                        return;
                                    }
                                    resolve(JSON.parse(JSON.stringify(rows)));
                                }
                            );
                        } else if (x['trade_mode'] == 'financial sell') {
                            var profit = 0;
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
                            var setProfitInv = x['inv_num'];
                            //修改2: 直接更新profit到 明細表格
                            db.query(
                                `UPDATE broa_details SET profit="${profit}" WHERE inv_num="${setProfitInv}";`,
                                function (err, rows) {
                                    if (err) {
                                        console.log(err);
                                        reject(rows);
                                        return;
                                    }
                                    resolve(JSON.parse(JSON.stringify(rows)));
                                }
                            );
                        } else {
                            var profit = 0;
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
                            var setProfitInv = x['inv_num'];
                            db.query(
                                `UPDATE broa_details SET profit="${profit}" WHERE inv_num="${setProfitInv}";`,
                                function (err, rows) {
                                    if (err) {
                                        console.log(err);
                                        reject(rows);
                                        return;
                                    }
                                    resolve(JSON.parse(JSON.stringify(rows)));
                                }
                            );
                        }
                    }
                }
            } else {
                //console.log(x["stock"]);
                stockArray.push(x['user_id'] + ',' + x['stock']); // [1,2330]
                stockDetailArray.push(x['user_id'] + ',' + x['stock'] + x['trade_mode']);

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
                var name = x['user_id'] + ',' + x['stock'] + x['trade_mode'];
                bigObject[name] = object;
            }
        });

    // 修改 inv_num
    getStarInvestorModel.reviseinv_num(brokerIdDetail, inv_num + numberofadded);

    // insert bigObject
    var brokerInventory = getChartTableDataModel.getbrokerInventory(securitiesAccount);
    getStarInvestorModel.insertDetailsToInventory(brokerInventory);
};

// 一次更新"一"筆資料
// 問可不可以用 兩次 req.body
exports.update_Single_Details_To_Inventory = (req, res) => {
    const { securitiesAccount } = req.body;
    // brokerIdDetail 是 bro?_details 某位明星投資者明細會有 "它的券商" 和 "有訂閱他的券商" 都會有
    const { brokerIdDetail } = req.body;
    var brokerInventory = brokerIdDetail.replace('details', 'inventory');
    var inv_num = getStarInvestorModel.getinv_num(brokerIdDetail);
    /* 
            1.股票        2.trade_mode : 6種         3.時間區段
            一、rows迴圈裡{
            1.判斷股票是否在前面出現過 用indexOf()  沒有: 加進stockArray 同時創一個object(inventory裡有的column都要有) 然後自己幫物件加一個以 "代碼 + mode" 為key 然後加進bigObject 
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
    var numberofadded = 0;
    var stockArray = []; // 1,2330
    var stockDetailArray = []; // 1,2330normal buy
    getStarInvestorModel
        .updateDetailsToInventory(brokerIdDetail, securitiesAccount, inv_num)
        .map((x, index) => {
            numberofadded++;
            if (stockArray.indexOf(x['user_id'] + ',' + x['stock']) != -1) {
                var name = x['user_id'] + ',' + x['stock'] + x['trade_mode'];
                if (stockDetailArray.indexOf(name) != -1) {
                    var sameModeDetails = getStarInvestorModel.getDataId_stock_mode(
                        brokerInventory,
                        name
                    );
                    //getDataId_stock_mode
                    sameModeDetails['average_price'] = String(
                        (Number(sameModeDetails['average_price']) *
                            Number(sameModeDetails['propertyValue']) +
                            Number(x['trade_price']) * Number(x['propertyValue'])) /
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
                            var profit = 0;
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
                            // 在下面改成新function
                            var setProfitInv = x['inv_num'];
                            db.query(
                                `UPDATE broa_details SET profit="${profit}" WHERE inv_num="${setProfitInv}";`,
                                function (err, rows) {
                                    if (err) {
                                        console.log(err);
                                        reject(rows);
                                        return;
                                    }
                                    resolve(JSON.parse(JSON.stringify(rows)));
                                }
                            );
                        } else if (x['trade_mode'] == 'financial sell') {
                            var profit = 0;
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
                            var setProfitInv = x['inv_num'];
                            //修改2: 直接更新profit到 明細表格
                            db.query(
                                `UPDATE broa_details SET profit="${profit}" WHERE inv_num="${setProfitInv}";`,
                                function (err, rows) {
                                    if (err) {
                                        console.log(err);
                                        reject(rows);
                                        return;
                                    }
                                    resolve(JSON.parse(JSON.stringify(rows)));
                                }
                            );
                        } else {
                            var profit = 0;
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
                            var setProfitInv = x['inv_num'];
                            db.query(
                                `UPDATE broa_details SET profit="${profit}" WHERE inv_num="${setProfitInv}";`,
                                function (err, rows) {
                                    if (err) {
                                        console.log(err);
                                        reject(rows);
                                        return;
                                    }
                                    resolve(JSON.parse(JSON.stringify(rows)));
                                }
                            );
                        }
                    }
                }
            } else {
                //console.log(x["stock"]);
                stockArray.push(x['user_id'] + ',' + x['stock']); // [1,2330]
                stockDetailArray.push(x['user_id'] + ',' + x['stock'] + x['trade_mode']);

                var object = {};
                object['inv_num'] = x['inv_num'];
                object['id_stock_mode'] =
                    x['user_id'] + ',' + x['stock'] + x['trade_mode'];
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
                var name = x['user_id'] + ',' + x['stock'] + x['trade_mode'];
                bigObject[name] = object;
                // insert note 資料
                getStarInvestorModel;
            }
        });

    // 修改 inv_num
    getStarInvestorModel.reviseinv_num(brokerIdDetail, inv_num + numberofadded);

    // insert bigObject
    var brokerInventory = getChartTableDataModel.getbrokerInventory(securitiesAccount);
    getStarInvestorModel.insertDetailsToInventory(brokerInventory);
};

exports.getSharePost = (req, res) => {
    const userid = JSON.parse(req.body).userid;
    getStarModel.getSharePost(userid).then(
        (result) => {
            res.send(result[0]);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};

//取得投資者是否有分享證券帳號
exports.shareAccountState = (req, res) => {
    const userid = JSON.parse(req.body).userid;
    getStarModel.getshareAccountState(userid).then(
        (result) => {
            res.send(result[0]);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};

//star-detail
//detail頁面的performance
exports.getDetailStar = (req, res) => {
    const userid = JSON.parse(req.body).userid;
    console.log('嘻嘻', userid);
    getStarModel.getDetailStarPerformance(userid).then(
        (result) => {
            res.send(result);
            console.log('pagecontrol', result);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
//detail頁面的detail
exports.getDetailStarDetail = (req, res) => {
    console.log('快點', JSON.parse(req.body).userid, JSON.parse(req.body).startId);
    const userid = JSON.parse(req.body).userid;
    const startId = JSON.parse(req.body).startId;
    //檢查是否有追蹤該明星投資者
    getUserModel.getSubStar(userid).then(
        (result) => {
            console.log('eee', result);
            if (userid != startId && result.length == 0) {
                //沒有登入或訂閱任何人
                //先取得明星投資者之券商資料表名稱
                console.log('半遮半掩的顯示資料因為沒有訂閱任何人');
                console.log('eee', result);
                getStarModel.getStarBroScheme(startId).then((resultScheme) => {
                    console.log('好想睡1', resultScheme);
                    var data = {
                        selectedStarInvestor: startId,
                        // selectedStock: '',
                        broScheme: resultScheme[0].explanation,
                        userid: userid,
                        limit: true,
                        unfollow: true,
                    };
                    getStarModel.getInventoryReceiptList(data).then((result) => {
                        console.log('使用者追蹤之明星投資者之庫存明細', result);
                        res.send(result);
                    });
                });
            } else {
                var selectResult = false;
                //for (i = 0; i <= result.length; i++) {
                //檢查是否有追蹤該明星投資者
                result.forEach((element) => {
                    console.log(element.user_id);
                    if (element.user_id == startId) {
                        console.log('顆顆找到嘞');
                        selectResult = true;
                    }
                });
                console.log('是否有追蹤該明星投資者', selectResult);
                if (userid == startId || selectResult) {
                    //有追蹤該明星投資者或是本人

                    var data = {
                        selectedStarInvestor: startId,
                        // selectedStock: '',
                        broScheme: JSON.parse(req.body).broScheme,
                        userid: userid,
                        limit: true,
                    };
                    console.log('會完整的顯示資料喔', data);
                    getStarModel.getInventoryReceiptList(data).then((result) => {
                        console.log('追蹤該明星投資者或是本人庫存明細', result);
                        res.send(result);
                    });
                } else {
                    //沒有追蹤該明星投資者
                    //先取得明星投資者之券商資料表名稱
                    console.log('沒有追蹤該明星投資者');
                    getStarModel.getStarBroScheme(startId).then((resultScheme) => {
                        console.log('好想睡', resultScheme);
                        var data = {
                            selectedStarInvestor: startId,
                            // selectedStock: '',
                            broScheme: resultScheme[0].explanation,
                            userid: userid,
                            limit: true,
                            unfollow: true,
                        };
                        getStarModel
                            .getInventoryReceiptList(data)
                            .then((resultDetail) => {
                                console.log(
                                    '使用者追蹤之明星投資者之庫存明細',
                                    resultDetail
                                );
                                res.send(resultDetail);
                            });
                    });
                }
                // };
            }
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
//detail歷史文章
exports.getDetailStarPost = (req, res) => {
    const userid = JSON.parse(req.body).userid;
    getStarModel.getDetailStarArticle(userid).then(
        (result) => {
            res.send(result);
            // console.log('postqqq', result);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
//使用者個人頁面資訊
exports.getNorHome = (req, res) => {
    const userid = JSON.parse(req.body).userid;
    console.log(req.body);
    getUserModel.getInfo(userid).then(
        (result) => {
            res.send(result[0]);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};

exports.updateSAinfo = (req, res) => {
    var data = {
        user_id: JSON.parse(req.body).user_id,
        brokerId: JSON.parse(req.body).brokerId,
        securitiesAccount: JSON.parse(req.body).securitiesAccount,
    };
    console.log(data, 'sasasa');
    getUserModel.updateSAinfo(data).then(
        (result) => {
            res.send(result[0]);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
exports.getTagName = (req, res) => {
    const tag = JSON.parse(req.body).tag;
    getUserModel.getTagName(tag).then(
        (result) => {
            console.log(result, 'tag');
            res.send(result);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
//我訂閱的明星投資者
exports.getDataSubStar = (req, res) => {
    const userid = JSON.parse(req.body).userid;
    getUserModel.getSubStar(userid).then(
        (results) => {
            const promises = results.map((result) => {
                return getChartTableDataModel
                    .getTagChinese(result['tag'].substr(1, result['tag'].length - 2).split(',')) //only 3 tags wanted
                    .then((tag_chinese) => {
                        // console.log(tag_chinese);
                        result['tag'] = tag_chinese;
                        return;
                    });
            });
            Promise.all(promises).then(() => {
                res.send(results);
            });

        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};

//熱門明星投資者
exports.getDataAllStar = (req, res) => {
    getStarModel.getDataAllStar().then((results) => {
        const promises = results.map((result) => {
            return getChartTableDataModel
                .getTagChinese(result['tag'].substr(1, result['tag'].length - 2).split(','))
                .then((tag_chinese) => {
                    // console.log(tag_chinese);
                    result['tag'] = tag_chinese;
                    //console.log("result in allStar", result);
                    return;
                });
        });
        console.log("results in allStar", results);
        Promise.all(promises).then(() => {
            res.send(results);
        });
    });
};
////個人推薦明星投資者
exports.getDataRecommendStar = (req, res) => {
    const tag = req.body
    console.log("這!", req.body)
    getStarModel.getDataRecommendStar(tag).then(
        (results) => {
            const promises = results.map((result) => {
                return getChartTableDataModel
                    .getTagChinese(result['tag'].substr(1, result['tag'].length - 2).split(','))
                    .then((tag_chinese) => {
                        // console.log(tag_chinese);
                        result['tag'] = tag_chinese;
                        return;
                    });
            });
            Promise.all(promises).then(() => {
                res.send(results);
            });
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
//搜尋明星投資者
exports.getDataSearch = (req, res) => {
    const data = {
        title: JSON.parse(req.body).title,
    };

    getStarModel.getDataSearch(data).then(
        (results) => {
            const promises = results.map((result) => {
                return getChartTableDataModel
                    .getTagChinese(result['tag'].substr(1, result['tag'].length - 2).split(',')) //only 3 tags wanted
                    .then((tag_chinese) => {
                        // console.log(tag_chinese);
                        result['tag'] = tag_chinese;
                        return;
                    });
            });
            Promise.all(promises).then(() => {
                res.send(results);
            });
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
//載入圖片
exports.postLoadPicture = (req, res) => {
    var pictureData = {
        relatedID: JSON.parse(req.body).relatedID,
        type: JSON.parse(req.body).type,
    };

    //從資料庫取得URL
    getUserModel.getUserPicture(pictureData).then(
        (result) => {
            console.log(result[0].url);
            if (result.length == 1) {
                res.send(result[0].url);
            } else {
                res.send('資料庫有錯!');
            }
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
//starinvestor-post頁面
//統計資料
exports.getStarSta = (req, res) => {
    const userid = JSON.parse(req.body).userid;
    getStarModel.getStarSta(userid).then(
        (result) => {
            res.send(result[0]);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
//綜合分析
exports.getStarAna = (req, res) => {
    const userid = JSON.parse(req.body).userid;
    getStarModel.getStarAna(userid).then(
        (result) => {
            res.send(result);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
//TAG(下拉式選單)
exports.get_tag = (req, res) => {
    getUserModel.get_tag().then((result) => {
        res.send(result);
    });
};

//取得使用者tag
exports.get_user_tag = (req, res) => {
    const id = JSON.parse(req.body);
    console.log('不高興', id);
    //取得使用者tag(數字型態)
    getUserModel.get_user_tag(id).then(
        (tag) => {
            //將tag轉為文字型態
            console.log('取道的', tag);
            getUserModel.get_user_tag_name(tag).then(
                (result) => {
                    res.send(result);
                },
                (err) => {
                    console.log(err);
                    res.json({
                        result: err,
                    });
                }
            );
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
//更新使用者選擇tag
exports.updateChooseTag = (req, res) => {
    var data = {
        id: JSON.parse(req.body).id,
        tagString: JSON.parse(req.body).tagString,
    };
    console.log(data, 'updateChooseTag');
    updateDataModel.updateChooseTag(data).then((result) => {
        if (result == 1) {
            res.send('updateChooseTag');
        } else {
            res.send('Oops!updateChooseTag');
        }
    });
};

// 拿到 "已實現損益" 資料(不分時間，從開戶到目前的所有損益)，就是，沒有配合任何圖表
exports.get_inventory_RealizePerformer = (req, res) => {
    const { securitiesAccount } = req.body;
    const brokerIdDetail = getChartTableDataModel.getbrokerIdDetail(securitiesAccount);
    getStarInvestorModel
        .getRealizePerformer(brokerIdDetail, securitiesAccount)
        .then((result) => {
            res.send(result);
        });
};

// *
// 拿到 "未實現損益" 資料(不分時間，現在庫存有多少就算多少)，就是，配合 "股票報酬圖表 donot chart"
exports.get_inventory_UnrealizePerformer = (req, res) => {
    const { userid } = JSON.parse(req.body);
    getStarModel.getStarData(userid).then(
        (result) => {
            let securitiesAccount = result[0].securitiesAccount;
            let brokerIdInv = result[0].brokerIdInv;
            getChartTableDataModel.getUnrealizePerformer(brokerIdInv, userid).then(
                (result) => {
                    console.log(result);
                    res.send(result);
                },
                (err) => {
                    console.log(err);
                    res.json({
                        result: err,
                    });
                }
            );
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};

/*
//取出 明星投資者-我的訂閱者  tag圖表data  會回傳一個Array 例如像[ { '1': 3 }, { '2': 2 } ]
exports.get_table_tagData = (req, res) => {
    const { user_id } = req.body;
    const { securitiesAccount } = req.body
    // tagArr是一個含有這個明星投資者tag數字的array
    var tagArr = getChartTableDataModel.getTag(securitiesAccount);
    //var user_id = getChartTableDataModel.getuser_id(securitiesAccount);
    // 長得像，例(含有X,Y,Z三個tag)  
    // 數字X:出現3次、數字Y:出現2次、數字Z:出現1次
    // [{X:3},{Y:2},{Z:1}]   XYZ其實也是一個數字，圖表呈現要依據資料庫explanation表格對應數字找到tag名稱，例如tag數字1代表 "電子業"
    var tagDataArr = [];

    // tagArr裡面可能有很多tag，一個一個取出來抓出喜歡這個tag的訂閱者
    for (var i = 0; i < tagArr.length(); i++) {
        var obj = {};
        obj[tagArr[i]] = getChartTableDataModel.getTagNum(tagArr[i], user_id);
        tagDataArr.push(obj);
    }
    res.send(tagDataArr);
}*/

// *
// 配合標籤圖表 pie chart
// 取出 明星投資者-我的訂閱者  tag圖表data  會回傳一個Array 例如像[ { '電子業': 3 }, { '傳統產業': 2 } ]
exports.get_table_tagData = (req, res) => {
    //const { shareID } = JSON.parse(req.body);
    const { userid } = JSON.parse(req.body);
    //console.log("ss5", userid);
    getStarModel.getStarData(userid).then(
        (result) => {
            //console.log("我在tag圖表data裡面 ", result)
            let user_id = result[0].user_id;
            //console.log(user_id, "我就是user_id");
            let securitiesAccount = result[0].securitiesAccount;
            //console.log(securitiesAccount, "我就是securitiesAccount");
            //let user_id = 3;
            //let securitiesAccount = '0439985';

            getChartTableDataModel.getTag(securitiesAccount).then(
                (result) => {
                    let tagArr = result;
                    console.log(tagArr);

                    getChartTableDataModel.getTagChinese(tagArr).then(
                        (result) => {
                            let tagArrChinese = result;
                            console.log(tagArrChinese);

                            getChartTableDataModel
                                .getTagNum(user_id, tagArr, tagArrChinese)
                                .then(
                                    (result) => {
                                        let finalArr = result;
                                        console.log(finalArr);
                                        res.send(finalArr);
                                    },
                                    (err) => {
                                        console.log(err);
                                        res.json({
                                            result: err,
                                        });
                                    }
                                );
                        },
                        (err) => {
                            console.log(err);
                            res.json({
                                result: err,
                            });
                        }
                    );
                },
                (err) => {
                    console.log(err);
                    res.json({
                        result: err,
                    });
                }
            );
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );

    // 長得像，例(含有X,Y,Z三個tag)
    // 數字X:出現3次、數字Y:出現2次、數字Z:出現1次
    // [{X:3},{Y:2},{Z:1}]   XYZ其實也是一個數字，圖表呈現要依據資料庫explanation表格對應數字找到tag名稱，例如tag數字1代表 "電子業"
};

// *
//取出 明星投資者-我的文章  圖表data
exports.get_table_bar_articleData = (req, res) => {
    console.log(req.body, 'article');
    const { userid } = JSON.parse(req.body);
    //const { securitiesAccount } = req.body
    //var user_id = getChartTableDataModel.getuser_id(securitiesAccount);
    getChartTableDataModel.getArticleData(userid).then((result) => {
        console.log(result);
        res.send(result);
    });

    /* 會回傳
 [
     {   "文章名稱1": "title名"
         "收藏人數" : "num",
         "留言人數" : "num",
         "觀看次數" : "num",
         "付費訂閱人數" : "num"
     },
     {   "文章名稱2": "title名"
         "收藏人數" : "num",
         "留言人數" : "num",
         "觀看次數" : "num",
         "付費訂閱人數" : "num"
     },
     ....
]
*/
};

exports.get_inventory_receiptlistPicture = (req, res) => {
    getStarModel.getInventoryReceiptListPicture().then((result) => {
        res.send(result);
    });
};

exports.get_inventory_composition = (req, res) => {
    const { securitiesAccount } = JSON.parse(req.body);
    getStarModel.getInventoryComposition(securitiesAccount).then((result) => {
        res.send(result);
    });
};

exports.get_subscribed_starinvestor = (req, res) => {
    const { id } = JSON.parse(req.body);
    getUserModel.getSubscribedStarInvestor(id).then((result) => {
        res.send(result);
    });
};
// *
//取出 明星投資者-個人資料  每月損益圖data
//取出 明星投資者-個人資料  每月損益圖(垂直長條bar)data
exports.get_table_bar_MonthlyRevenue = (req, res) => {
    // async await
    // 結構父值 前面包key
    const { shareID } = JSON.parse(req.body);
    // id 回傳undefined
    console.log('ss1', shareID);
    // 已改用.then包起來  用1試可以，用id試回傳空值([])  確定是因為id沒收到的問題
    getStarModel.getStarData(shareID).then(
        (result) => {
            //console.log("明星投資者資料c8 ", result)
            let user_id = result[0].user_id;
            //console.log(user_id, "我就是user_id");
            let brokerIdDetail = result[0].brokerIdDetail;
            //console.log(brokerIdDetail, "我是brokerIdDetail");
            let Nowtime = nowsMonth();
            let bigArr = [];
            let timeArr = [];
            let count = 0;

            // 權域
            for (let k = 0; k < 6; k++) {
                let time = String(Nowtime); //202109
                time = time.slice(0, 4) + '-' + time.slice(4); //變成2021-09 2021-08
                timeArr.push(time);
                Nowtime = lastMonth(Nowtime);

                getChartTableDataModel
                    .getMonthlyRevenueData(brokerIdDetail, user_id, time)
                    .then(
                        (result) => {
                            //time = time.slice(0, 4) + '-' + time.slice(4);
                            bigArr.push(result);
                            count++;
                            //console.log(timeArr[k]);

                            if (count == 6) {
                                //console.log(timeArr);
                                bigArr.sort((a, b) => a.date.localeCompare(b.date));
                                bigArr.reverse();
                                console.log(bigArr);
                                res.send(bigArr);
                            }
                        },
                        (err) => {
                            console.log(err);
                            res.json({
                                result: err,
                            });
                        }
                    );
            }
            // 好像跑到for迴圈就不會繼續往下跑了，console bigArr回傳pending，但console model有資料印出來，
            // resolve不過來的樣子， .then包到for迴圈而已，這個function的res.send在外面
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );

    // {'date': '2021-04', 'profit': value}
    // 會回傳 [ {'date': '2021-04', 'profit': value}, {'date': '2021-05', 'profit': value}, {'date': '2021-06', 'profit': value},.....,{'date': '2021-09', 'profit': value} ]
};

//取出 明星投資者-個人資料  權益曲線(line)data
exports.get_table_line_MonthlyRevenue = (req, res) => {
    const { shareID } = JSON.parse(req.body);
    //console.log("ss2", shareID);
    getStarModel.getStarData(shareID).then(
        (result) => {
            //console.log("我在權益曲線(line)裡面 ", result)
            let user_id = result[0].user_id;
            //console.log(user_id, "我就是user_id");
            let brokerIdDetail = result[0].brokerIdDetail;
            //console.log(brokerIdDetail, "我是brokerIdDetail");
            let Nowtime = nowsMonth();
            let bigArr = [];
            let timeArr = [];
            let count = 0;

            // 權域
            for (let k = 0; k < 6; k++) {
                let time = String(Nowtime); //202109
                time = time.slice(0, 4) + '-' + time.slice(4); //變成2021-09 2021-08
                timeArr.push(time);
                Nowtime = lastMonth(Nowtime);

                getChartTableDataModel
                    .getMonthlyRevenueData(brokerIdDetail, user_id, time)
                    .then(
                        (result) => {
                            //time = time.slice(0, 4) + '-' + time.slice(4);
                            bigArr.push(result);
                            count++;
                            //console.log(timeArr[k]);

                            if (count == 6) {
                                bigArr.sort((a, b) => a.date.localeCompare(b.date));
                                let accumulateProfit = 0;
                                for (let m = 0; m < 6; m++) {
                                    let obj = bigArr[m];
                                    accumulateProfit = accumulateProfit + obj['profit'];
                                    bigArr[m].profit = accumulateProfit;
                                }
                                //console.log(timeArr);
                                console.log(bigArr);
                                bigArr.reverse();
                                res.send(bigArr);
                            }
                        },
                        (err) => {
                            console.log(err);
                            res.json({
                                result: err,
                            });
                        }
                    );
            }
            // 好像跑到for迴圈就不會繼續往下跑了，console bigArr回傳pending，但console model有資料印出來，
            // resolve不過來的樣子， .then包到for迴圈而已，這個function的res.send在外面
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );

    /*console.log("我在權益曲線(line)裡面", result);
    //let bigArr = result
    //console.log("我在權益曲線(line)裡面", bigArr);
    let accumulateProfit = 0;
    for (let i = 0; i < 6; i++) {
        let obj = bigArr[i];
        accumulateProfit = accumulateProfit + obj["profit"];
        obj["profit"] = accumulateProfit;
    }
    res.send(bigArr);*/

    // 和上面 get_table_bar_MonthlyRevenue 這個function不同的是，後面都月份的profit是累加前面月份的一起的
    // 原本若是 [ {'date': '2021-04', 'profit': 10}, {'date': '2021-05', 'profit': 20}, {'date': '2021-06', 'profit': 30},.....,{'date': '2021-09', 'profit': 60} ]
    // 後來變成 [ {'date': '2021-04', 'profit': 10}, {'date': '2021-05', 'profit': 30}, {'date': '2021-06', 'profit': 60},.....,{'date': '2021-09', 'profit': 210} ]
};

// *
//取出 明星投資者-我的訂閱者  每月訂閱庫存收益(bar) data
exports.get_table_bar_MonthlySubsRevenueData = (req, res) => {
    const { userid } = JSON.parse(req.body);
    //console.log("ss3", userid);
    getStarModel.getStarData(userid).then(
        (result) => {
            //console.log("我在庫存收益(bar)裡面 ", result)
            let user_id = result[0].user_id;
            //console.log(user_id, "我就是user_id");
            //let user_id;
            let Nowtime = nowsMonth();
            let bigArr = [];
            let timeArr = [];
            let count = 0;

            for (var i = 1; i <= 6; i++) {
                var time = String(Nowtime);
                var timeProfit = time + 'profit'; // 字串 202109profit
                timeArr.push(time);
                Nowtime = lastMonth(Nowtime);

                getChartTableDataModel
                    .getMonthlySubsRevenueData(time, timeProfit, user_id)
                    .then(
                        (result) => {
                            bigArr.push(result);
                            count++;
                            //console.log(timeArr[k]);

                            if (count == 6) {
                                bigArr.sort((a, b) => a.date.localeCompare(b.date));
                                bigArr.reverse();
                                //console.log(timeArr);
                                console.log(bigArr);
                                res.send(bigArr);
                            }
                        },
                        (err) => {
                            console.log(err);
                            res.json({
                                result: err,
                            });
                        }
                    );
            }
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );

    // 會回傳 [ { 'date': 時間, 'profit': 那個月訂閱庫存賺的錢 }, { 'date': 時間, 'profit': 那個月訂閱庫存賺的錢 }, { 'date': 時間, 'profit': 那個月訂閱庫存賺的錢 }, { 'date': 時間, 'profit': 那個月訂閱庫存賺的錢 },......]
};

// *
//取出 明星投資者-我的訂閱者  每月訂閱庫存人數(line) data
exports.get_table_line_MonthlySubsNumberData = (req, res) => {
    const { userid } = JSON.parse(req.body);
    //console.log("ss4", userid);
    getStarModel.getStarData(userid).then(
        (result) => {
            //console.log("我在庫存收益(line)裡面 ", result)
            let user_id = result[0].user_id;
            //console.log(user_id, "我就是user_id");
            let Nowtime = nowsMonth();
            let bigArr = [];
            let timeArr = [];
            let count = 0;

            for (var i = 1; i <= 6; i++) {
                var time = String(Nowtime);
                var timesubnum = time + 'subnum'; // 字串 202109subnum
                timeArr.push(time);
                Nowtime = lastMonth(Nowtime);

                getChartTableDataModel
                    .getMonthlySubsNumberData(time, timesubnum, user_id)
                    .then(
                        (result) => {
                            bigArr.push(result);
                            count++;
                            //console.log(timeArr[k]);

                            if (count == 6) {
                                bigArr.sort((a, b) => a.date.localeCompare(b.date));
                                //console.log(timeArr);
                                bigArr.reverse();
                                console.log(bigArr);
                                res.send(bigArr);
                            }
                        },
                        (err) => {
                            console.log(err);
                            res.json({
                                result: err,
                            });
                        }
                    );
            }
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );

    // 會回傳 [ { 'date': 時間, 'subnum': 那個月訂閱庫存的人數 }, { 'date': 時間, 'subnum': 那個月訂閱庫存的人數 }, { 'date': 時間, 'subnum': 那個月訂閱庫存的人數 }, { 'date': 時間, 'subnum': 那個月訂閱庫存的人數 },......]
};

//取得使用者追蹤之明星投資者之庫存明細
exports.get_inventory_receiptlist = (req, res) => {
    var data = {
        selectedStarInvestor: JSON.parse(req.body).selectedStarInvestor,
        selectedStock: JSON.parse(req.body).selectedStock,
        broScheme: JSON.parse(req.body).broScheme,
        userid: JSON.parse(req.body).userid,
    };
    getStarModel.getInventoryReceiptList(data).then((result) => {
        console.log('使用者追蹤之明星投資者之庫存明細', result);
        res.send(result);
    });
};
//選擇的明星投資者之投資組合
exports.get_inventory_composition_table = (req, res) => {
    var data = {
        selectedStarInvestor: JSON.parse(req.body).selectedStarInvestor,
        broScheme: JSON.parse(req.body).broScheme,
        userid: JSON.parse(req.body).userid,
    };
    console.log('看看', data);
    getStarModel.getbroInventoryScheme(data).then((result) => {
        var data = {
            selectedStarInvestor: JSON.parse(req.body).selectedStarInvestor,
            broScheme: result[0].explanation,
            userid: JSON.parse(req.body).userid,
        };
        console.log('資料表2', data);
        getStarModel.getInventoryCompositionTable(data).then((result) => {
            console.log('結果', result);
            res.send(result);
        });
    });
};
//訂閱的明星投資者(下拉式選單)
exports.get_subscribed_starinvestor = (req, res) => {
    const { id } = JSON.parse(req.body);
    getUserModel.getSubscribedStarInvestor(id).then((result) => {
        res.send(result);
    });
};

//訂閱的明星投資者之股票(下拉式選單)
exports.get_subscribed_starinvestor_stock = (req, res) => {
    var data = {
        selectedStarInvestor: JSON.parse(req.body).selectedStarInvestor,
        broScheme: JSON.parse(req.body).broScheme,
    };
    getUserModel.getSubscribedStarInvestorStock(data).then((result) => {
        res.send(result);
    });
};
//個人頁面中根據每個tag推薦明星投資者
exports.RecommendStarByTag = (req, res) => {
    var data = {
        tag: JSON.parse(req.body).tag,
        userid: JSON.parse(req.body).userid
    }
    getStarModel.RecommendStarByTag(data).then(
        (results) => {
            const promises = results.map((result) => {
                return getChartTableDataModel
                    .getTagChinese(result['tagNumber'].substr(1, result['tagNumber'].length - 2).split(','))
                    .then((tag_chinese) => {
                        // console.log(tag_chinese);
                        result['tag'] = tag_chinese;
                        return;
                    });
            });
            Promise.all(promises).then(() => {
                res.send(results);
            });
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
//個人推薦明星投資者
exports.getDataMyStar = (req, res) => {
    const tag = JSON.parse(req.body).tag;
    console.log(tag, "999")
    getStarModel.getDataMyStar(tag).then(
        (result) => {
            console.log(result, 'tag');
            res.send(result);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};

// 取得每個明星投資者(user_id)的文章被 full 訂閱的 count，然後排序後前出前8名的user_id 的 "頭像網址"
exports.get_full_article_sub = (req, res) => {
    let Arr = [1, 2, 3, 8, 10, 11, 12, 16, 19];
    getUserModel.getFullArticleSub(Arr).then((result) => {
        let fullSubsNumArr = result;
        // console.log(fullSubsNumArr);

        // 依據 count 大到小排列
        fullSubsNumArr.sort(function (a, b) {
            return b.count - a.count;
        });

        // 踢掉最後一名(有9位明星投資者，取8位)
        fullSubsNumArr.pop();

        //fullSubsNumArr變成 [{user_id:3, count:2}, {user_id:1, count:1}, {user_id:2, count:0}....] 大到小排列
        // console.log(fullSubsNumArr);

        let urlArr = [];
        let urlArrTest = [];
        let count = 0;
        for (let i = 0; i < fullSubsNumArr.length; i++) {
            let value = {};
            value['type'] = '1';
            value['relatedID'] = fullSubsNumArr[i].user_id;
            //console.log(value);
            getUserModel.getInfo(fullSubsNumArr[i].user_id).then((result) => {
                let nick_name = result[0].nick_name;
                getUserModel.getUserPicture(value).then((result) => {
                    let objTest = {};
                    objTest['user_id'] = fullSubsNumArr[i].user_id;
                    objTest['url'] = result[0].url;
                    urlArrTest.push(objTest);

                    let obj = {};
                    obj['count'] = fullSubsNumArr[i].count;
                    obj['StarHref'] = '/star-investor-details/' + fullSubsNumArr[i].user_id;
                    obj['imgUrl'] = result[0].url;
                    obj['nick_name'] = nick_name;
                    urlArr.push(obj);

                    count++;

                    if (count == 8) {
                        //console.log(urlArrTest);
                        //console.log(urlArr);
                        urlArr.sort(function (a, b) {
                            return b.count - a.count;
                        });

                        // console.log(urlArr);
                        res.send(urlArr);
                    }
                });
            });
        }


        // 最後傳給前端一個Arr 訂閱人數 "從大到小" 排列的 "頭像網址" Array
        //res.send(result);
    });
};




//取得使用者的訂閱吃到飽的作家
exports.subscribed_Star_Post = (req, res) => {
    var data = { userid: JSON.parse(req.body).userid }
    getUserModel.subscribed_Star_Post(data).then(
        (result) => {
            res.send(result);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};











//股票市值&&總成本
exports.get_invest_cost = (req, res) => {
    const { userid } = JSON.parse(req.body);
    getStarModel.getStarData(userid).then(
        (result) => {
            let securitiesAccount = result[0].securitiesAccount;
            let brokerIdInv = result[0].brokerIdInv;
            getChartTableDataModel.get_invest_cost(brokerIdInv, userid).then(
                (result) => {
                    console.log(result);
                    res.send(result);
                },
                (err) => {
                    console.log(err);
                    res.json({
                        result: err,
                    });
                }
            );
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};

// 找hints tag 和 明星投資者暱稱
exports.get_tag_related_hints = (req, res) => {
    getStarModel.getTagRelatedHints().then(
        (result) => {
            console.log(result, 'hints');
            res.send(result);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
