//放後端處理資料相關東西
const getUserModel = require('../model/getUserModel');
const getStarInvestorModel = require('../model/getStarInvestorModel');
const updateDataModel = require('../model/updateDataModel');
const deleteDataModel = require('../model/deleteDataModel');
const insertDataModel = require('../model/insertDataModel');
const newDetailsModel = require('../model/newDetailsModel');
const emailModel = require('../model/emailModel');
const getChartTableDataModel = require('../model/getChartTableDataModel');
const registerSecurityAccount = require('../public-contracts/registerSecurityAccount');
var newDataID;
var notifyID = [];
//修改明細備註
exports.update_inventory_receiptlist_remark = (req, res) => {
    req.body = JSON.parse(req.body);
    const data = {
        detail_num: req.body.detail_num,
        remarks: req.body.remarks,
    };

    updateDataModel.updateInventoryReceiptListRemark(data).then((result) => {
        if (result == 1) {
            res.send('明細更新成功!謝謝您');
        } else {
            res.send('明細更新失敗');
        }
    });
};

exports.post_share_securities_account = (req, res) => {
    req.body = JSON.parse(req.body);
    const { brokerId, month, securitiesAccount, sharedStatus, subscribeAmount, time } =
        req.body.returnValues;
    const { transactionHash } = req.body;
    const data = {
        transactionHash: transactionHash,
        BrokerId: brokerId,
        securitiesAccount: securitiesAccount,
        post_price: subscribeAmount,
        propertyKey: 'ShareStart',
        propertyValue: time,
    };
    getUserModel.postShareSecuritiesAccount(data).then(res.send());
};

exports.update_share_securities_account_subscribe_amount = (req, res) => {
    req.body = JSON.parse(req.body);
    const { subscribeAmount, securitiesAccount } = req.body.returnValues;
    getUserModel
        .updateShareSecuritiesAccountSubscribeAmount([subscribeAmount, securitiesAccount])
        .then(res.send());
};

exports.delete_share_securities_account = (req, res) => {
    req.body = JSON.parse(req.body);
    const { securitiesAccount } = req.body.returnValues;
    getUserModel.deleteShareSecuritiesAccount(securitiesAccount).then(res.send());
};

//刪除圖片
exports.deletePicture = (req, res) => {
    var pictureRecord = {
        type: JSON.parse(req.body).type,
        relatedID: JSON.parse(req.body).relatedID,
    };
    //console.log("在這!,", req.body.account, req.body.password);
    deleteDataModel.deletePicture(pictureRecord).then((result) => {
        if (result == 1) {
            res.send('圖片刪除成功!');
            console.log('圖片刪除成功!!!', result);
        } else {
            console.log('圖片刪除失敗QQ!!!', result);
            res.send('圖片刪除失敗QQ');
        }
    });
};

//更新訂閱費用
exports.updateSubscribedAmount = (req, res) => {
    var data = {
        userid: JSON.parse(req.body).userid,
        amount: JSON.parse(req.body).amount,
    };
    updateDataModel.updateSubscribedAmount(data).then((result) => {
        if (result == 1) {
            res.send('訂閱費用更新成功!謝謝您');
        } else {
            res.send('Oops!系統哪裡出錯啦~');
        }
    });
};

//更新明星投資者memo
exports.updateStarMemo = (req, res) => {
    var data = {
        userid: JSON.parse(req.body).userid,
        memo: JSON.parse(req.body).memo,
    };
    updateDataModel.updateStarMemo(data).then((result) => {
        if (result == 1) {
            res.send('明星投資者Memo更新成功!謝謝您~');
        } else {
            res.send('Oops!系統哪裡出錯啦~');
        }
    });
};

//更新分享證券帳號
exports.updateShareAccount = (req, res) => {
    var data = {
        userid: JSON.parse(req.body).userid,
        shareAccount: JSON.parse(req.body).shareAccount,
        transactionHash: JSON.parse(req.body).transactionHash,
    };
    updateDataModel.updateShareAccount(data).then((result) => {
        if (result == 1) {
            res.send('證券分享狀態更新成功!謝謝您!');
        } else {
            res.send('Oops!系統哪裡出錯啦~');
        }
    });
};
//訂閱明星投資者
exports.subscribeStar = (req, res) => {
    var data = {
        userid: JSON.parse(req.body).userid,
        brokerId: JSON.parse(req.body).brokerId,
        transactionHash: JSON.parse(req.body).transactionHash,
        shareID: JSON.parse(req.body).shareID,
        totalSubscribeAmount: JSON.parse(req.body).totalSubscribeAmount,
        startDate: JSON.parse(req.body).startDate,
    };
    //先檢查該使用者是否有訂閱過該明星投資者
    getUserModel.getSubscribeStar(data).then((result) => {
        //有則更新欄位
        console.log('有嗎有嗎', result);
        if (result.length == 1) {
            console.log('以前有訂閱過');
            updateDataModel.updateSubscribe(data).then((result) => {
                if (result == 1) {
                    res.send('訂閱成功!謝謝您!');
                } else {
                    res.send('Oops!系統哪裡出錯啦~');
                }
            });
        } //無則新增一筆資料
        else if (result.length == 0) {
            console.log('以前沒有訂閱過');
            insertDataModel.postInsertSubscribe(data).then((insertResult) => {
                if (insertResult == 1) {
                    res.send('訂閱成功!謝謝您!');
                } else {
                    res.send('Oops!系統哪裡出錯啦~');
                }
            });
        } else {
            res.send('資料有問題');
        }
    });
};

//取消訂閱明星投資者
exports.updateCancelSubscribed = (req, res) => {
    var data = {
        userid: JSON.parse(req.body).userid,
        brokerId: JSON.parse(req.body).brokerId,
        transactionHash: JSON.parse(req.body).transactionHash,
        shareID: JSON.parse(req.body).shareID,
        dueDate: JSON.parse(req.body).dueDate,
    };
    updateDataModel.updateCancelSubscribed(data).then((result) => {
        if (result == 1) {
            res.send('成功取消訂閱囉!謝謝您!');
        } else {
            res.send('Oops!系統哪裡出錯啦~');
        }
    });
};

//檢查投資者是否有分享證券帳號且是否有訂閱
exports.checkShareAccountStateSubscribe = (req, res) => {
    const userid = JSON.parse(req.body).userid;
    const shareID = JSON.parse(req.body).shareID;
    //檢查該明星投資者是否有分享證券帳號
    getStarInvestorModel.getshareAccountState(shareID).then(
        (result) => {
            console.log('是否有分享證券帳號', result[0].shareAccount);
            if (result[0].shareAccount == 'True') {
                var data = {
                    userid: userid,
                    shareID: shareID,
                };
                //檢查該使用者"目前"是否有訂閱該明星投資者
                getUserModel.getCurrentSubscribeStar(data).then(
                    (result) => {
                        if (result.length == 1) {
                            console.log('目前有訂閱');
                            res.send('True');
                        } else {
                            console.log('目前沒有訂閱');
                            res.send('False');
                        }
                    },
                    (err) => {
                        console.log(err);
                        res.json({
                            result: err,
                        });
                    }
                );
            } else {
                //若該投資者沒有分享則回傳空值
                console.log('目前沒有分享');
                res.send('');
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

//明星投資者資料
exports.getStarData = (req, res) => {
    const id = JSON.parse(req.body).id;
    getStarInvestorModel.getStarData(id).then(
        (result) => {
            console.log('明星投資者資料', result);
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

exports.post_subscribe_share_securities_account = (req, res) => {
    req.body = JSON.parse(req.body);
    const {
        shareBrokerId,
        shareSecuritiesAccount,
        subscribeBrokerId,
        subscriberIdHash,
        startDate,
        dueDate,
        totalSubscribeAmount,
    } = req.body.returnValues;
    const { transactionHash } = req.body;

    const data = {
        transactionHash: transactionHash,
        shareBrokerId: shareBrokerId,
        shareSecuritiesAccount: shareSecuritiesAccount,
        subscribeBrokerId: subscribeBrokerId,
        subscribeIdHash: subscriberIdHash,
        startDate: startDate,
        dueDate: dueDate,
        totalSubscribeAmount: totalSubscribeAmount,
    };
    insertDataModel.postSubscribeShareSecuritiesAccount(data).then(res.send());
};

exports.post_upload_investment_performance = async (req, res) => {
    const { returnValues, transactionHash } = req.body;
    let data = {
        user_id: returnValues._user_id,
        brokerId: returnValues._brokerId,
        securitiesAccount: returnValues._securitiesAccount,
        stock: returnValues._stock,
        propertyKey: returnValues._propertyKey,
        propertyValue: returnValues._propertyValue,
        trade_mode: returnValues._trade_mode,
        trade_price: returnValues._trade_price,
        // updateDate: returnValues._update_Date,
        stock_name: returnValues._stock_name,
        transactionHash: transactionHash,
    };
    const insertId = await insertDataModel.postUploadInvestmentPerformanceToAllDetails(
        data
    );
    const broker_details_table = await insertDataModel.getBrokerDetailsTable(data);
    data['detail_num'] = insertId;
    notifyID.push(insertId);
    insertDataModel
        .postUploadInvestmentPerformanceToBrokerDetails(broker_details_table, data)
        .then(
            (result) => {
                if (result == 1) {
                    console.log('成功insert至broker_table', result);
                    post_upload_investment_performance_send_email(data);
                    //SSENotifyFrontEnd(data)
                    //res.send("True")
                } else {
                    console.log('失敗insert至broker_table', result);
                    //res.send("False")
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

//SSE notify front-end
exports.SSENotifyFrontEnd = (req, res) => {
    console.log('內容:');
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive',
    });
    res.flushHeaders();
    // Sends a SSE every 5 seconds on a single connection.
    //setInterval(function () {
    //表示新增的Data還沒有傳到前端的
    //console.log("要通知的id", notifyID)
    if (notifyID.length != 0) {
        var id = notifyID.pop();
        console.log('最', id);
        newDetailsModel.getlatestData(id).then(
            (result) => {
                console.log('最新的資料壓', result[0]);
                res.write('data: ' + JSON.stringify(result[0]) + '\n\n');
                res.write('data: ' + '傳送通知!' + '\n\n');
            },
            (err) => {
                //console.log(err)
                res.json({
                    result: err,
                });
            }
        );
    }
    //}, 5000);
};
//檢查是否要通知該user
exports.checkNotification = (req, res) => {
    req.body = JSON.parse(req.body);
    console.log('檢查是否要通知該user', req.body);
    //檢查是否要通知該user
    //檢查該使用者"目前"是否有訂閱該明星投資者
    var checkData = {
        userid: req.body.normalUserid,
        shareID: req.body.user_id,
    };
    getUserModel.getCurrentSubscribeStar(checkData).then(
        (result) => {
            if (result.length == 1) {
                console.log('目前有訂閱');
                //有的話去該券商資料夾拿取資料，傳回前端
                newDetailsModel.getlatestDataBroker(req.body.detail_num).then(
                    (resultdetail) => {
                        console.log('通知資料', resultdetail[0]);
                        var content = `您的訂閱者${req.body.nick_name}(證券帳號:${resultdetail[0].securitiesAccount})，目前於${resultdetail[0].updateDate}，以${resultdetail[0].trade_price}元的價格${resultdetail[0].explanation}${resultdetail[0].stock_name}${resultdetail[0].propertyValue}股`;
                        console.log(content);
                        res.send(content);
                    },
                    (err) => {
                        //console.log(err)
                        res.json({
                            result: err,
                        });
                    }
                );
            } else {
                //沒有的話回傳沒有
                console.log('目前沒有訂閱');
                res.send('False');
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

// //寄出庫存更新email
// exports.post_upload_investment_performance_send_email = async (req, res) => {
//     const { returnValues, transactionHash } = req.body;
//     let data = {
//         user_id: "3",
//         brokerId: "A",
//         securitiesAccount: "0439985",
//         stock: "2317",
//         propertyKey: "numberOfShares",
//         propertyValue: "3000",
//         trade_mode: "financing buy",
//         trade_price: "55.5",
//         // updateDate: returnValues._update_Date,
//         stock_name: "鴻海",
//         transactionHash: "fffff",
//     }
//     starID = data.user_id
//     //取得訂閱者email
//     //const get_email = await getUserModel.get_email(starID);

//     //取得明星投資者的broker_detail資料表
//     const bro_detail = await getStarInvestorModel.getStarBroScheme(starID);
//     data.bro_detail = bro_detail[0].explanation
//     console.log(bro_detail, data)

//     //取得信件需要的中文資訊
//     const dataName = await getUserModel.get_data_name(data);
//     console.log("取得信件需要的中文資訊", dataName)
//     data.dataName = dataName[0]
//     var get_email = [
//         { email: 'vivian2tina@gmail.com' },
//         { email: 'vivian_0920@yahoo.com.tw' },
//     ]
//     //寄出信件
//     console.log(get_email, "取得訂閱者email")
//     emailModel.send_email(get_email, data).then(result => {
//         if (result) {
//             console.log("繼成功")
//             res.send("True")
//         } else {
//             console.log("季失敗")
//             res.send("False")
//         }
//     })
// }

async function post_upload_investment_performance_send_email(data) {
    starID = data.user_id;
    //取得訂閱者email
    const get_email = await getUserModel.get_email(starID);
    //取得明星投資者的broker_detail資料表
    const bro_detail = await getStarInvestorModel.getStarBroScheme(starID);
    data.bro_detail = bro_detail[0].explanation;

    //取得信件需要的中文資訊
    const dataName = await getUserModel.get_data_name(data);
    //console.log("取得件需要的中文資訊", dataName)
    data.dataName = dataName[0];
    // var get_email = [
    //     { email: 'vivian2tina@gmail.com' },
    //     { email: 'vivian_0920@yahoo.com.tw' },
    // ];
    //寄出信件
    emailModel.send_email(get_email, data).then((result) => {
        if (result) {
            console.log('繼成功');
            //res.send("True")
        } else {
            console.log('季失敗');
            //res.send("False")
        }
    });
}

// quorum settings
exports.get_quorum_settings = (req, res) => {
    const { userid } = JSON.parse(req.body);
    getUserModel.getQuorumSettings(userid).then((result) => {
        res.send(result);
    });
};

//註冊以太坊帳戶
exports.registerSecurityAccount = (req, res) => {
    var account = {
        brokerId: JSON.parse(req.body).brokerId,
        securitiesAccount: JSON.parse(req.body).securitiesAccount,
    };
    registerSecurityAccount(account).then((contract_response) => {
        res.send(contract_response);
    });
};
//文章吃到飽:檢查投資者是否有分享證券帳號且是否有訂閱
exports.checkSharePostStateSubscribe = (req, res) => {
    const userid = JSON.parse(req.body).userid;
    const shareID = JSON.parse(req.body).shareID;
    //檢查該明星投資者是否有分享證券帳號
    getStarInvestorModel.getsharePostState(shareID).then(
        (result) => {
            console.log('文章', result[0]);
            console.log('是否有分享文章吃到飽', result[0].sharePost);
            if (result[0].sharePost == 'True') {
                var data = {
                    userid: userid,
                    shareID: shareID,
                };
                //檢查該使用者"目前"是否有訂閱該明星投資者的文章吃到飽
                getUserModel.getCurrentSubscribeStarPost(data).then(
                    (result) => {
                        if (result.length == 1) {
                            console.log('目前有訂閱');
                            res.send('True');
                        } else {
                            console.log('目前沒有訂閱');
                            res.send('False');
                        }
                    },
                    (err) => {
                        console.log(err);
                        res.json({
                            result: err,
                        });
                    }
                );
            } else {
                //若該投資者沒有分享則回傳空值
                console.log('目前沒有分享');
                res.send('');
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
//訂閱明星投資者文章吃到飽
exports.subscribeStarPost = (req, res) => {
    var data = {
        userid: JSON.parse(req.body).userid,
        brokerId: JSON.parse(req.body).brokerId,
        transactionHash: JSON.parse(req.body).transactionHash,
        shareID: JSON.parse(req.body).shareID,
        totalSubscribeAmount: JSON.parse(req.body).totalSubscribeAmount,
        startDate: JSON.parse(req.body).startDate,
    };
    //先檢查該使用者是否有訂閱過該明星投資者
    getUserModel.getSubscribeStarPost(data).then((result) => {
        //有則更新欄位
        // console.log('有嗎有嗎', result);
        if (result.length == 1) {
            // console.log('以前有訂閱過');
            updateDataModel.updateSubscribePost(data).then((result) => {
                if (result == 1) {
                    res.send('訂閱成功!謝謝您!');
                } else {
                    res.send('Oops!系統哪裡出錯啦~');
                }
            });
        } //無則新增一筆資料
        else if (result.length == 0) {
            console.log('以前沒有訂閱過');
            insertDataModel.postInsertSubscribePost(data).then((insertResult) => {
                if (insertResult == 1) {
                    res.send('訂閱成功!謝謝您!');
                } else {
                    res.send('Oops!系統哪裡出錯啦~');
                }
            });
        } else {
            res.send('資料有問題');
        }
    });
};
//取消訂閱明星投資者文章吃到飽
exports.updateCancelSubscribedPost = (req, res) => {
    var data = {
        userid: JSON.parse(req.body).userid,
        shareID: JSON.parse(req.body).shareID,
    };
    updateDataModel.updateCancelSubscribedPost(data).then((result) => {
        if (result == 1) {
            res.send('成功取消訂閱囉!謝謝您!');
        } else {
            res.send('Oops!系統哪裡出錯啦~');
        }
    });
};
//單篇文章:
exports.checkSharePostStateSingle = (req, res) => {
    var data = {
        userid: JSON.parse(req.body).userid,
        postId: JSON.parse(req.body).postId,
    };
    //先檢查該使用者是否有訂閱過該文章
    getUserModel.getCurrentSubscribeSinglePost(data).then((result) => {
        //有則更新欄位
        // console.log('有訂閱過該文章嗎', result);
        if (result.length == 1) {
            console.log('以前有訂閱過該文章');
            updateDataModel.updateSinglePost(data).then((result) => {
                if (result == 1) {
                    res.send('訂閱單篇文章成功!謝謝您!');
                } else {
                    res.send('Oops!系統哪裡出錯啦~');
                }
            });
        } //無則新增一筆資料
        else if (result.length == 0) {
            console.log('以前沒有訂閱過');
            insertDataModel.postInsertSinglePost(data).then((insertResult) => {
                if (insertResult == 1) {
                    res.send('訂閱成功!謝謝您!');
                } else {
                    res.send('Oops!系統哪裡出錯啦~');
                }
            });
        } else {
            res.send('資料有問題');
        }
    });
};

//取消訂閱明星投資者文章(單篇)
exports.updateCancelSubscribedSinglePost = (req, res) => {
    console.log('cancelsingle');
    var data = {
        userid: JSON.parse(req.body).userid,
        postId: JSON.parse(req.body).postId,
    };
    updateDataModel.updateCancelSinglePost(data).then((result) => {
        if (result == 1) {
            res.send('成功取消訂閱囉!謝謝您!');
        } else {
            res.send('Oops!系統哪裡出錯啦~');
        }
    });
};
