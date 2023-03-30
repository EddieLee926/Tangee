const express = require('express');
const postUserController = require('../controller/postUserController');
const pageController = require('../controller/pageController');
const articleController = require('../controller/articleController');
const dataHandleController = require('../controller/dataHandleController');
const router = express.Router();

// 用來放跟頁面有關的get post
// 此路徑為/頁面page
//註冊
//normal
router.route('/register-account').post(postUserController.post_register_account);
//star
router.route('/register-star').post(postUserController.post_register_star);
//Login
router.route('/login').post(postUserController.postCheckAccount);

//StarInvestormanagement頁面
router.route('/sub_price').post(pageController.getStarSubPrice);
router.route('/sub_num').post(pageController.getStarSubNum);
router.route('/sub_sum').post(pageController.getStarSubSum);
router.route('/subs').post(pageController.getStarSubs);

//starinvestor-post頁面
//統計資料
router.route('/post_sta').post(pageController.getStarSta);
//綜合分析
router.route('/post_ana').post(pageController.getStarAna);

//StarInvestorDetail/StarInvestorHome頁面頁面
//取得投資者績效
router.route('/performance').post(pageController.getDetailStar);
//取得投資者歷史文章
router.route('/article').post(pageController.getDetailStarPost);
//取得投資者明細
router.route('/detail').post(pageController.getDetailStarDetail);
//取得投資者Memo
router.route('/memo').post(pageController.getStarMemo);
//取得投資者是否有分享文章
router.route('/sharePost').post(pageController.getSharePost);
//取得投資者是否有分享證券帳號
router.route('/shareAccountState').post(pageController.shareAccountState);

//NormalMemberHome頁面
router.route('/home').post(pageController.getNorHome);
router.route('/update_SA').post(pageController.updateSAinfo);
//回傳tag名稱
router.route('/tag_name').post(pageController.getTagName);
//NormalMemSubscribedStarInvest頁面
router.route('/sub_star').post(pageController.getDataSubStar);
//NormalMemSubscribedPost
router.route('/sub_post').post(articleController.getSubPost);
router.route('/sub_articleAmount').post(articleController.getSubscribedArticleAmount);
// 以下是圖表-------------------------------------------------------------------------------
router.route('/inventory-receipt').get(pageController.get_inventory_receiptlistPicture);

router.route('/inventory-composition').post(pageController.get_inventory_composition);

// 以下是圖表-------------------------------------------------------------------------------
// 拿"股票報酬圖表" 資料
router
    .route('/inventory-UnrealizePerformer')
    .post(pageController.get_inventory_UnrealizePerformer);

//股票市值&&總成本
router.route('/invest-cost').post(pageController.get_invest_cost);

//get_tagData, 拿Tag圓餅圖所需資料
router.route('/table_tagData').post(pageController.get_table_tagData);

// 拿我的文章圖表所需資料
router.route('/table_bar_articleData').post(pageController.get_table_bar_articleData);

// 拿個人資料  每月損益圖表(bar)所需資料
router
    .route('/table_bar_MonthlyRevenue')
    .post(pageController.get_table_bar_MonthlyRevenue);

// 拿個人資料  每月損益圖表(line)所需資料
router
    .route('/table_line_MonthlyRevenue')
    .post(pageController.get_table_line_MonthlyRevenue);

// 拿每月訂閱庫存收益(bar)所需資料
router
    .route('/table_bar_MonthlySubsRevenueData')
    .post(pageController.get_table_bar_MonthlySubsRevenueData);

// 拿每月訂閱庫存人數(line)所需資料
router
    .route('/table_line_MonthlySubsNumberData')
    .post(pageController.get_table_line_MonthlySubsNumberData);

// 以上是圖表-------------------------------------------------------------------------------

router.route('/subscribed-starinvestor').post(pageController.get_subscribed_starinvestor);

//searchstarinvestor頁面
router.route('/all_investor').get(pageController.getDataAllStar);
router.route('/search_investor').post(pageController.getDataSearch);
router
    .route('/inventory-RealizePerformer')
    .post(pageController.get_inventory_RealizePerformer);

router
    .route('/inventory-UnrealizePerformer')
    .post(pageController.get_inventory_UnrealizePerformer);

router.route('/subscribed-starinvestor').post(pageController.get_subscribed_starinvestor);

//個人推薦明星
router.route('/recommend_investor').post(pageController.getDataRecommendStar);

//根據每個tag推薦明星
router.route('/recommend_investor_tag').post(pageController.RecommendStarByTag);

//推薦明星
router.route('/my_investor').post(pageController.getDataMyStar);

//popular-post頁面
router.route('/pop_post').get(articleController.getPopPost);
router.route('/recommend_post').post(articleController.getRecommendPost);
//取得所有tag
router.route('/tag').post(pageController.get_tag);
//取得使用者tag
router.route('/getUserTag').post(pageController.get_user_tag);
//更新使用者選擇tag
router.route('/updateUserTag').post(pageController.updateChooseTag);

//取得使用者追蹤之明星投資者之庫存明細
router.route('/inventory-receipt-table').post(pageController.get_inventory_receiptlist);

//取得使用者追蹤之明星投資者之投資組合
router
    .route('/inventory-composition-table')
    .post(pageController.get_inventory_composition_table);
//取得使用者追蹤之明星投資者
router.route('/subscribed-starinvestor').post(pageController.get_subscribed_starinvestor);
//取得明星投資者之股票
router
    .route('/subscribed-starinvestor-stock')
    .post(pageController.get_subscribed_starinvestor_stock);

router.route('/payment').post(pageController.get_payment_data);

router.route('/Most_Subscribe').post(pageController.get_full_article_sub);

router.route('/subscribed_Star_Post').post(pageController.subscribed_Star_Post);
router.route('/search_tag_hints').post(pageController.get_tag_related_hints);

//庫存更新通知前端
router.route('/SSE')
    .get(dataHandleController.SSENotifyFrontEnd);
//單篇訂閱費用
router.route('/single_articleAmount').post(articleController.getSingleArticleAmount);

module.exports = router;
