const db = require('./connection_db');

//更新圖片
exports.updatePicture = (value) => {
    console.log('model', value);
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE picture SET url='${value.pictureURL}' where type='${value.type}' and related_to='${value.relatedID}'`,
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
//更新明星投資者訂閱費用
exports.updateSubscribedAmount = (value) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE all_star SET sub_price='${value.amount}' where user_id='${value.userid}' `,
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
//文章瀏覽(views)次數++
exports.updateViews = (value) => {
    console.log("成功++", value.postId);
    return new Promise((resolve, reject) => {
        db.query(`UPDATE article SET views=views+1 where post_id='${value.postId}}'`, function (err, rows) {
            // db.query(`select views from .article where post_id=1;`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            resolve(rows.affectedRows);
        })
    })
}

//更新明星投資者Memo
exports.updateStarMemo = (value) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE all_star SET memo='${value.memo}' where user_id='${value.userid}' `,
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

//更新文章訂閱金額
exports.updateSubArtAmount = (value) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE all_star SET post_price='${value.amount}' where user_id='${value.userid}' `,
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

//更新文章是否開啟吃到飽方案
exports.updateSubArtShare = (value) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE all_star SET sharePost='${value.sharePost}' where user_id='${value.userid}' `,
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

//更新分享證券帳號
exports.updateShareAccount = (value) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE all_star SET shareAccount='${value.shareAccount}',transactionHash='${value.transactionHash}' where user_id='${value.userid}' `,
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

//更新訂閱投資者
exports.updateSubscribe = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE all_subscriber SET transactionHash='${data.transactionHash}',totalSubscribeAmount='${data.totalSubscribeAmount}' ,dueDate=null,startDate='${data.startDate}'  where user_id=${data.userid} and shareID=${data.shareID} `,
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
//更新明細備註
exports.updateInventoryReceiptListRemark = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE all_details SET remarks='${data.remarks}' where detail_num='${data.detail_num}' `,
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

//取消訂閱明星投資者
exports.updateCancelSubscribed = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`update all_subscriber set transactionHash='${data.transactionHash}',dueDate='${data.dueDate}' where user_id=${data.userid} and shareID=${data.shareID};`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            resolve(rows.affectedRows);
        })
    })
}
//更新使用者選擇tag
exports.updateChooseTag = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE all_users SET tag='${data.tagString}' where user_id='${data.id}' `,
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
//更新文章選擇tag
exports.updatePostTag = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE article SET tag='${data.tagString}' where post_id='${data.id}' `,
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
//更新訂閱投資者文章吃到飽
exports.updateSubscribePost = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE star_investor_db.article_subs SET mode='full',subs_time='${data.startDate}'  where user_id=${data.userid} and subs_star_id=${data.shareID} `,
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
//取消訂閱明星投資者文章吃到飽
exports.updateCancelSubscribedPost = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`update star_investor_db.article_subs set mode='full-cancel' where user_id=${data.userid} and subs_star_id=${data.shareID};`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            resolve(rows.affectedRows);
        })
    })
}
//更新訂閱投資者文章(單篇)
exports.updateSinglePost = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE star_investor_db.article_subs SET mode='single' where user_id=${data.userid} and subs_post_id=${data.postId} `,
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
//取消訂閱文章(單篇)
exports.updateCancelSinglePost = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`update star_investor_db.article_subs set mode='single-cancel' where user_id=${data.userid} and subs_post_id=${data.postId};`, function (err, rows) {
            if (err) {
                console.log(err);
                reject(rows);
                return;
            }
            resolve(rows.affectedRows);
        })
    })
}
//更新文章訂閱金額(單篇)
exports.updateSingleAmount = (value) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE star_investor_db.article SET price='${value.amount}' where post_id='${value.id}' `,
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