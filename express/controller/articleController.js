const updateDataModel = require('../model/updateDataModel');
const articleModel = require('../model/articleModel');
const getStarModel = require('../model/getStarInvestorModel');
const getUserModel = require('../model/getUserModel');
// 此頁面放置所有有關使用者一切的post
//熱門文章
exports.getPopPost = (req, res) => {
    articleModel.getDataPopPost().then(
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
//專屬推薦文章
exports.getRecommendPost = (req, res) => {
    const tag = JSON.parse(req.body).tag;
    //console.log(tag, "推薦文章")
    articleModel.getRecommendPost(tag).then(
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
//我的訂閱文章
exports.getSubPost = (req, res) => {
    const userid = JSON.parse(req.body).userid;
    articleModel.getDataSubPost(userid).then(
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

//訂閱文章費用
exports.getSubscribedArticleAmount = (req, res) => {
    const userid = JSON.parse(req.body).userid;

    articleModel.getSubscribedArticleAmount(userid).then(
        (result) => {
            res.send(result[0]);
            console.log('文章費用', result[0]);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};

//更新文章訂閱費用
exports.updateSubArtAmount = (req, res) => {
    var data = {
        userid: JSON.parse(req.body).userid,
        amount: JSON.parse(req.body).amount,
    };
    console.log(data);
    updateDataModel.updateSubArtAmount(data).then((result) => {
        if (result == 1) {
            res.send('文章訂閱金額更新成功!謝謝您!');
        } else {
            res.send('Oops!系統哪裡出錯啦');
        }
    });
};

//更新文章是否開啟吃到飽方案
exports.updateSubArtShare = (req, res) => {
    var data = {
        userid: JSON.parse(req.body).userid,
        sharePost: JSON.parse(req.body).sharePost,
    };
    updateDataModel.updateSubArtShare(data).then((result) => {
        if (result == 1) {
            res.send('文章吃到飽狀態更新成功!謝謝您!');
        } else {
            res.send('Oops!系統哪裡出錯啦~');
        }
    });
};
//新增文章
exports.insertArticle = (req, res) => {
    var data = {
        content: JSON.parse(req.body).content,
        title: JSON.parse(req.body).title,
        user_id: JSON.parse(req.body).user_id,
        tagString: JSON.parse(req.body).tagString,
    };
    console.log('insertaaa');
    articleModel.insertArticle(data).then((result) => {
        res.send(result);
        console.log(result, 'insert');
    });
};
//取得文章內容
exports.get_edit_article = (req, res) => {
    const postId = JSON.parse(req.body).postId;
    articleModel.getEditArticle(postId).then((result) => {
        res.send(result);
        console.log(result, 'test');
    });
};
//更新文章內容
exports.update_article = (req, res) => {
    var data = {
        content: JSON.parse(req.body).content,
        post_id: JSON.parse(req.body).post_id,
        user_id: JSON.parse(req.body).user_id,
    };
    console.log(data, 'here+++');
    //const data = JSON.parse(req.body)
    articleModel.updateArticle(data).then((result) => {
        res.send(result);
    });
};
//更新明細備註
exports.update_remark = (req, res) => {
    var data = {
        content: JSON.parse(req.body).content,
        detail_num: JSON.parse(req.body).detail_num,
        user_id: JSON.parse(req.body).user_id,
    };
    console.log(data, '明細備註');
    articleModel.update_remark(data).then((result) => {
        res.send(result);
    });
};
//更新股票內容
exports.update_stock_detail = async (req, res) => {
    var data = {
        content: JSON.parse(req.body).content,
        stock: JSON.parse(req.body).stock,
        broScheme: JSON.parse(req.body).broScheme,
        user_id: JSON.parse(req.body).user_id,
    };
    //console.log(data, "here+++")
    const bro_detail = await getStarModel.getbroNoteScheme(data.user_id);
    data.bro_detail = bro_detail[0].explanation;
    //console.log(data);
    articleModel.updateStockDetail(data).then((result) => {
        if (result == 1) {
            res.send('股票內容詳細內容更新成功!謝謝您!');
        } else {
            res.send('Oops!系統哪裡出錯啦~');
        }
    });
};
//更新股票內容
exports.update_stock_detail = async (req, res) => {
    var data = {
        content: JSON.parse(req.body).content,
        stock: JSON.parse(req.body).stock,
        broScheme: JSON.parse(req.body).broScheme,
        user_id: JSON.parse(req.body).user_id,
    };
    //console.log(data, "here+++")
    const bro_detail = await getStarModel.getbroNoteScheme(data.user_id);
    data.bro_detail = bro_detail[0].explanation;
    //console.log(data);
    articleModel.updateStockDetail(data).then((result) => {
        if (result == 1) {
            res.send('股票內容詳細內容更新成功!謝謝您!');
        } else {
            res.send('Oops!系統哪裡出錯啦~');
        }
    });
};
//取得細備註
exports.get_remark = (req, res) => {
    console.log('取得備註');
    const detail_num = JSON.parse(req.body).detail_num;
    articleModel.get_remark(detail_num).then((result) => {
        console.log(result, '取得備註!!');
        res.send(result);
    });
};
//取得文章標題
exports.get_edit_title = (req, res) => {
    const postId = JSON.parse(req.body).postId;
    console.log(postId, '標題aaa');
    articleModel.getEditTitle(postId).then((result) => {
        res.send(result);
        console.log(result, '標題');
    });
};
//更新文章標題
exports.update_title = (req, res) => {
    var data = {
        title: JSON.parse(req.body).title,
        post_id: JSON.parse(req.body).post_id,
        user_id: JSON.parse(req.body).user_id,
    };
    console.log(data, '改標題');
    articleModel.updateTitle(data).then((result) => {
        res.send('文章標題更新成功!謝謝您!');
        res.send(result);
    });
};
//搜尋文章
exports.getPostSearch = (req, res) => {
    var data = {
        title: JSON.parse(req.body).title,
    };
    console.log(data, '00');
    articleModel.getPostSearch(data).then(
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

//取得股票庫存明細內容
exports.get_stock_detail = (req, res) => {
    var data = {
        starID: JSON.parse(req.body).starID,
        stock: JSON.parse(req.body).stock,
        broScheme: JSON.parse(req.body).broScheme,
    };
    var broNote = JSON.parse(req.body).broScheme + '_note';
    getStarModel.getbroNoteScheme(broNote).then((result) => {
        console.log(result);
        // var data = {
        //         selectedStarInvestor: JSON.parse(req.body).selectedStarInvestor,
        //         broScheme: result[0].explanation,
        //         userid: JSON.parse(req.body).userid,
        // };
        // console.log('資料表2', data);
        // getStarModel.getInventoryCompositionTable(data).then((result) => {
        //         console.log('結果', result);
        //         res.send(result);
        // });
    });

    // articleModel.getStockDetail(data).then(result => {
    //         res.send(result)

    // })
};
//取得文章tag
exports.get_tag = (req, res) => {
    const id = JSON.parse(req.body);
    console.log('不高興', id);
    //取得使用者tag(數字型態)
    articleModel.get_tag(id).then(
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
//更新文章選擇tag
exports.updateTag = (req, res) => {
    var data = {
        id: JSON.parse(req.body).id,
        tagString: JSON.parse(req.body).tagString,
    };
    console.log(data, 'updateChooseTag');
    updateDataModel.updatePostTag(data).then((result) => {
        if (result == 1) {
            res.send('updateChooseTag');
        } else {
            res.send('Oops!updateChooseTag');
        }
    });
};
//取得文章訂閱狀態
exports.get_sbs_state = (req, res) => {
    var data = {
        userid: JSON.parse(req.body).userid,
        postId: JSON.parse(req.body).postId,
    };
    const sbs_state = {};
    const promise1 = articleModel.get_sbs_state(data).then(
        (result) => {
            if (result.length == 1) {
                sbs_state.singleArticle = 'True';
            } else {
                sbs_state.singleArticle = 'False';
            }
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
    const promise2 = articleModel.get_full_sbs_state(data).then((result) => {
        if (result.length == 1) {
            sbs_state.fullArticle = 'True';
        } else {
            sbs_state.fullArticle = 'False';
        }
    });
    Promise.all([promise1, promise2]).then(() => {
        res.send(sbs_state);
    });
};
//訂閱文章費用(單篇)
exports.getSingleArticleAmount = (req, res) => {
    const id = JSON.parse(req.body).id;
    articleModel.getSingleArticleAmount(id).then(
        (result) => {
            res.send(result[0]);
            console.log('文章費用', result[0]);
        },
        (err) => {
            console.log(err);
            res.json({
                result: err,
            });
        }
    );
};
//更新文章訂閱費用(單篇)
exports.updateSingleAmount = (req, res) => {
    var data = {
        id: JSON.parse(req.body).id,
        amount: JSON.parse(req.body).amount,
    };
    console.log(data);
    updateDataModel.updateSingleAmount(data).then((result) => {
        if (result == 1) {
            res.send('金額更新成功!謝謝您!');
        } else {
            res.send('Oops!系統哪裡出錯啦');
        }
    });
};
