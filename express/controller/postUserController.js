const getUserModel = require('../model/getUserModel');
var axios = require('axios');
var FormData = require('form-data');
const imgur = require('../config/imgur');
const insertDataModel = require('../model/insertDataModel');
const updateDataModel = require('../model/updateDataModel');
const registerSecurityAccount = require('../public-contracts/registerSecurityAccount');
const getChartTableDataModel = require('../model/getChartTableDataModel');
// 此頁面放置所有有關使用者一切的post
//登入頁面
exports.postCheckAccount = (req, res) => {
    req.body = JSON.parse(req.body);
    const account = {
        account: req.body.account,
        password: req.body.password,
    };
    getUserModel.postCheckUserAccount(account).then((results) => {
        if (results.length == 0) {
            res.status(401).end();
        } else {
            const promises = results.map((result) => {
                return getChartTableDataModel
                    .getTagChinese(result['tag'].substr(1, result['tag'].length - 2).split(','))
                    .then((tag_chinese) => {
                        // console.log(tag_chinese);
                        result['tag_chinese'] = tag_chinese;
                        return;
                    });
            });
            Promise.all(promises).then(() => {
                res.send(results);
            });

        }
    });
};
//上傳、更新圖片至imgur並將URL傳入資料庫
exports.postUploadPictureAndInsertURLtoDB = (req, res) => {
    req.body = JSON.parse(req.body);
    const relatedID = req.body.relatedID;
    const type = req.body.type;
    var pictureURL = '';
    console.log(req.body);

    //取得圖片的base64編碼
    const imagedata = req.body.img.split(',');
    const image = imagedata[1];
    //console.log(relatedID, type, image);
    const saveToCloud = 'Bearer ' + imgur.AccessToken;
    const switchToURL = 'Client-ID ' + imgur.ClientID;
    //console.log(switchToURL);
    //將圖片上傳至imgur
    var data = new FormData();
    data.append('image', image);

    var config = {
        method: 'post',
        url: 'https://api.imgur.com/3/image',
        headers: {
            Authorization: switchToURL,
            ...data.getHeaders(),
        },
        data: data,
    };

    axios(config)
        .then(function (response) {
            //console.log(response.data.data);
            console.log(response.data.data.link);
            pictureURL = response.data.data.link;

            //var pictureRecord = [type,relatedID,pictureURL];
            var pictureRecord = {
                type: type,
                relatedID: relatedID,
                pictureURL: pictureURL,
            };

            var checkData = {
                type: type,
                relatedID: relatedID,
            };
            //檢查資料庫是否已有該筆資料(前提須是大頭貼)
            //從資料庫取得URL
            getUserModel.getUserPicture(checkData).then(
                (result) => {
                    console.log('搜尋完畢，有' + result.length + '筆資料');
                    //沒有資料則新增
                    if (result.length == 0) {
                        //將得到的URL放入資料庫
                        insertDataModel.insertPicture(pictureRecord).then((result) => {
                            console.log('result', result);
                            if (result == 1) {
                                //console.log("圖片上傳成功!")
                                res.send('圖片上傳成功');
                            } else {
                                //console.log("圖片上傳失敗失敗!!!", result);
                                res.send('圖片上傳失敗失敗!!!');
                            }
                        });
                    }
                    //若有資料則更新
                    else if (result.length == 1) {
                        //將得到的URL更新至資料庫
                        updateDataModel.updatePicture(pictureRecord).then((result) => {
                            console.log('result', result);
                            if (result == 1) {
                                console.log('圖片更新成功!');
                                res.send('圖片更新成功');
                            } else {
                                console.log('圖片更新失敗!!!', result);
                                res.send('圖片更新失敗!!!');
                            }
                        });
                    }
                },
                (err) => {
                    console.log(err);
                    res.json({
                        result: err,
                    });
                }
            );
        })
        .catch(function (error) {
            console.log(error);
        });
};
//註冊
//normal註冊
exports.post_register_account = (req, res) => {
    const { tag_1, tag_2, tag_3 } = JSON.parse(req.body);
    var account = {
        name: JSON.parse(req.body).name,
        nick_name: JSON.parse(req.body).nick_name,
        email: JSON.parse(req.body).email,
        account: JSON.parse(req.body).account,
        password: JSON.parse(req.body).password,
        type: JSON.parse(req.body).type,
        frequency: JSON.parse(req.body).frequency,
        consider: JSON.parse(req.body).consider,
        experience: JSON.parse(req.body).experience,
        fluctuation: JSON.parse(req.body).fluctuation,
        action: JSON.parse(req.body).action,
        brokerIdAddress: JSON.parse(req.body).brokerIdAddress,
        brokerId: JSON.parse(req.body).brokerId,
        securitiesAccount: JSON.parse(req.body).securitiesAccount,
        birth: JSON.parse(req.body).birth,
        gender: JSON.parse(req.body).gender,
        tag: JSON.parse(req.body).tag,
    };
    console.log(account, "註冊測")
    insertDataModel.postRegisterAccount(account).then((result) => {
        if (result.length == 0) {
            res.send('qqqqq');
        } else {
            if (account.securitiesAccount) {
                registerSecurityAccount(account).then((contract_response) => {
                    res.send(contract_response);
                });
            } else {
                res.send(result);
            }
        }
    });
};
//star註冊
exports.post_register_star = (req, res) => {
    var account = {
        name: JSON.parse(req.body).name,
        nick_name: JSON.parse(req.body).nick_name,
        email: JSON.parse(req.body).email,
        account: JSON.parse(req.body).account,
        password: JSON.parse(req.body).password,
        type: JSON.parse(req.body).type,
        frequency: JSON.parse(req.body).frequency,
        consider: JSON.parse(req.body).consider,
        experience: JSON.parse(req.body).experience,
        fluctuation: JSON.parse(req.body).fluctuation,
        action: JSON.parse(req.body).action,
        brokerId: JSON.parse(req.body).brokerId,
        securitiesAccount: JSON.parse(req.body).securitiesAccount,
        birth: JSON.parse(req.body).birth,
        gender: JSON.parse(req.body).gender,
        tag: JSON.parse(req.body).tag,
        subPrice: JSON.parse(req.body).subPrice,
    };

    insertDataModel.postRegisterStar(account).then((user_id) => {
        account['user_id'] = user_id;
        //Successfully insert
        if (user_id != 0) {
            // call the contract register function
            //registerSecurityAccount(account).then((contract_response) => {
            //console.log("呼叫合約啦", contract_response)
            insertDataModel.postInsertStar(account).then((result) => {
                if (result == 1) {
                    res.send('成功新增');
                    //res.send(contract_response);
                } else {
                    res.send('系統出現問題啦');
                }
            });

            //});
        }
    });
};
//文章瀏覽(views)次數++
exports.post_views = (req, res) => {
    //  const postId = req.body.postId;
    var data = {
        postId: JSON.parse(req.body).postId,
        // brokerId: JSON.parse(req.body).brokerId,
        // securitiesAccount: JSON.parse(req.body).securitiesAccount,
    };
    updateDataModel.updateViews(data).then((result) => {
        if (result == 1) {
            res.send('成功');
        } else {
            res.send('失敗');
        }
    });
};
