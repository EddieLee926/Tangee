const express = require('express');
const dataHandleController = require('../controller/dataHandleController');
const postUserController = require('../controller/postUserController');
const pageController = require('../controller/pageController');
const router = express.Router();
const articleController = require('../controller/articleController');

// 用來放後端處理相關的東西
// 此路徑為/getData/

router
    .route('/post-share-securities-account')
    .post(dataHandleController.post_share_securities_account);

router
    .route('/update-share-securities-account-subscribe-amount')
    .post(dataHandleController.update_share_securities_account_subscribe_amount);

router.delete(
    '/delete-share-securities-account',
    dataHandleController.delete_share_securities_account
);
//註冊以太坊帳戶
router
    .route('/register-SecurityAccount')
    .post(dataHandleController.registerSecurityAccount);

//修改明細備註
router
    .route('/update-inventory-receiptlist-remark')
    .post(dataHandleController.update_inventory_receiptlist_remark);

//上傳、更新圖片
router.route('/uploadImg').post(postUserController.postUploadPictureAndInsertURLtoDB);
//載入圖片
router.route('/getImg').post(pageController.postLoadPicture);

// 刪除圖片
router.route('/deleteImg').post(dataHandleController.deletePicture);

// 修改明星投資者訂閱費用
router.route('/modSubAmount').post(dataHandleController.updateSubscribedAmount);
// 修改明星投資者Memo
router.route('/modStarMemo').post(dataHandleController.updateStarMemo);
// 修改文章訂閱費用(吃到飽)
router.route('/modSubArtAmount').post(articleController.updateSubArtAmount);
// 修改文章分享狀態(吃到飽)
router.route('/modSubArtShare').post(articleController.updateSubArtShare);
// 修改證券分享狀態
router.route('/modShareAccount').post(dataHandleController.updateShareAccount);
// 訂閱明星投資者
router.route('/subscribeStar').post(dataHandleController.subscribeStar);
// 訂閱明星投資者吃到飽
router.route('/subscribeStarPost').post(dataHandleController.subscribeStarPost);

// 檢查目前是否有訂閱該投資者且明星投資者有分享
router.route('/subscribe').post(dataHandleController.checkShareAccountStateSubscribe);
// 文章吃到飽:檢查目前是否有訂閱該投資者且明星投資者有分享
router.route('/subscribePost').post(dataHandleController.checkSharePostStateSubscribe);
// 訂閱單篇文章:
router.route('/subscribeSinglePost').post(dataHandleController.checkSharePostStateSingle);

// 取得明星投資者資料
router.route('/starData').post(dataHandleController.getStarData);

// 取消訂閱明星投資者
router.route('/cancelSubscribeState').post(dataHandleController.updateCancelSubscribed);
// 取消訂閱明星投資者文章吃到飽
router.route('/cancelSubscribePostState').post(dataHandleController.updateCancelSubscribedPost);
// 取消訂閱單篇文章
router.route('/cancelSubscribeSinglePostState').post(dataHandleController.updateCancelSubscribedSinglePost);
router
    .route('/post-subscribe-share-securities-account')
    .post(dataHandleController.post_subscribe_share_securities_account);

router
    .route('/post-upload-investment-performance')
    .post(dataHandleController.post_upload_investment_performance);

// router
//     .route('/post-upload-investment-performance-send-email')
//     .post(dataHandleController.post_upload_investment_performance_send_email);

router.route('/quorum-settings').post(dataHandleController.get_quorum_settings);

//文章瀏覽(views)次數++(點擊數)
router.route('/post_view').post(postUserController.post_views);

//檢查是否要通知該user
router.route('/checkNotification').post(dataHandleController.checkNotification);
//股票市值&&總成本
// router.route('/invest-cost').post(dataHandleController.invest_cost);

// 修改文章訂閱費用(單篇)
router.route('/modSingleAmount').post(articleController.updateSingleAmount);
/*router.post('/img', function (req, res, next) {
    console.log("ssds")
    const { file } = req
    if (file) {
        // 設定 app ID
        imgur.setClientID("4c699267dad6b08");
        // 取得檔案目錄，上傳至 imgur
        imgur.upload(file.path, (err, image) => {
            console.log(image.data.link);
            if (err) return console.error(err)
            // 連結放在 image.data.link 裡
            // do something
        })
    } else {
        // 沒有上傳圖片
    }
})*/
module.exports = router;
