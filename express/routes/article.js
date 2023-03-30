const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');
//新增文章
router.route("/insert-article")
    .post(articleController.insertArticle);
//文章內容
router.route("/get-edit-article")
    .post(articleController.get_edit_article);
router.route("/update-article")
    .post(articleController.update_article);
//明細備註
router.route("/update-remark")
    .post(articleController.update_remark);
router.route("/get-remark")
    .post(articleController.get_remark);
//文章標題
router.route("/get-edit-title")
    .post(articleController.get_edit_title);
//搜尋文章
router.route("/get-search")
    .post(articleController.getPostSearch);


router.route("/update-title")
    .post(articleController.update_title);

//取得庫存明細內容
router.route("/get-stock-detail")
    .post(articleController.get_stock_detail);
//取得文章tag
router.route('/getTag').post(articleController.get_tag);
//更新文章選擇tag
router.route('/updateTag').post(articleController.updateTag);

//更新庫存明細內容
router.route("/update-stock-note")
    .post(articleController.update_stock_detail);

//更新庫存明細內容
router.route("/update-stock-note")
    .post(articleController.update_stock_detail);
//是否有訂閱文章
router.route("/get-sbs-state")
    .post(articleController.get_sbs_state);
module.exports = router;