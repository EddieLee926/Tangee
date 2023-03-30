const db = require('./connection_db');
//熱門文章
exports.getDataPopPost = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `select nick_name,post_id,favorites_num,title,views,date_format(table_B.updateTime, '%Y/%m/%d %T')as updateTime, picture.url as user_url,post_url
                from picture inner join(
                select nick_name,post_id,favorites_num,title,views,table_A.updateTime ,table_A.url as post_url ,table_A.user_id
                from all_users inner join(
                select post_id,favorites_num,title,views,article.updateTime ,picture.url ,user_id
                from article inner join picture on  picture.related_to=post_id 
                where picture.type=2) table_A on table_A.user_id = all_users.user_id)
                table_B on table_B.user_id = picture.related_to
                where picture.type =1
                ORDER BY views DESC LIMIT 5;`,
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
//專屬推薦文章
exports.getRecommendPost = (tag) => {
    var tag = tag.split(',');
    tag.shift();
    tag.pop();
    console.log('model', tag);
    var comment = `select nick_name,post_id,favorites_num,title,views,date_format(table_B.updateTime, '%Y/%m/%d %T')as updateTime ,picture.url as user_url,post_url,tag
    from star_investor_db.picture inner join(
    select nick_name,post_id,favorites_num,title,views,table_A.updateTime ,table_A.url as post_url ,table_A.user_id,table_A.tag
    from star_investor_db.all_users inner join(
    select post_id,favorites_num,title,views,article.updateTime ,picture.url ,user_id,tag
    from star_investor_db.article inner join star_investor_db.picture on  picture.related_to=post_id
    where picture.type=2 and  star_investor_db.article.post_id in (
select b.post_id from(select a.post_id, count(*) from( `;
    for (let index = 0; index < tag.length; index++) {
        comment += `SELECT post_id from star_investor_db.article where tag like '%,${tag[index]},%' `;
        if (index != tag.length - 1) {
            comment += `UNION ALL `;
        }
    }
    comment += `) a group by a.post_id order by count(*) desc limit 9) as b)order by views desc) table_A on table_A.user_id = all_users.user_id) table_B on table_B.user_id = picture.related_to
    where picture.type =1 `;
    console.log(comment);
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
//我的訂閱文章(單篇)
exports.getDataSubPost = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select post_id,favorites_num,title,views,article.updateTime ,picture.url as post_url
            from star_investor_db.article as article
            inner join star_investor_db.picture as picture
            on  picture.related_to=article.post_id 
            inner join star_investor_db.article_subs as subs
            on subs.subs_post_id=article.post_id 
            where picture.type=2 and subs.user_id='${id}' and mode="single";`,
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

//取得文章訂閱費用
exports.getSubscribedArticleAmount = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select subAllPost_price from all_star where user_id='${id}';`,
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
//取得文章內容
exports.getEditArticle = (postId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select content,title,price from article where post_id = '${postId}';`,
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
//新增文章
exports.insertArticle = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `insert into article (user_id, title, content,tag) values ('${data.user_id}','${data.title}','${data.content}','${data.tagString}');`,
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
//更新文章內容
exports.updateArticle = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `update article SET content= '${data.content}' where post_id = '${data.post_id}'and user_id = '${data.user_id}';`,
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
//更新明細備註
exports.update_remark = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `update all_details SET remarks= '${data.content}' where detail_num = '${data.detail_num}'and user_id = '${data.user_id}';`,
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
//更新股票詳細庫存內容
exports.updateStockDetail = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `update star_investor_db.${data.bro_detail} set note='${data.content}' where user_id ='${data.user_id}'and stock= '${data.stock}';`,
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

//更新股票詳細庫存內容
exports.updateStockDetail = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `update star_investor_db.${data.bro_detail} set note='${data.content}' where user_id ='${data.user_id}'and stock= '${data.stock}';`,
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
//取得明細備註
exports.get_remark = (detail_num) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select remarks from all_details where detail_num = '${detail_num}';`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                console.log('here');
                resolve(JSON.parse(JSON.stringify(rows)));
            }
        );
    });
};
//取得文章標題
exports.getEditTitle = (postId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select title from article where post_id = '${postId}';`,
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

//更新文章標題
exports.updateTitle = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `update article SET title= '${data.title}' where post_id = '${data.post_id}'and user_id = '${data.user_id}';`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                console.log('article改標題');
                resolve(JSON.parse(JSON.stringify(rows)));
            }
        );
    });
};
//取得股票庫存明細
exports.getStockDetail = (data) => {
    var cc = `SELECT note FROM ${data.broScheme} where user_id='${data.starID}' and stock='${data.stock}';`;
    console.log(cc);
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT note FROM ${data.broScheme} where user_id='${data.starID}' and stock='${data.stock}';`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
            }
        );
    });
};

//搜尋文章
exports.getPostSearch = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select nick_name,post_id,favorites_num,title,views,date_format(table_B.updateTime, '%Y/%m/%d %T')as updateTime ,picture.url as user_url,post_url
                from picture inner join(
                select nick_name,post_id,favorites_num,title,views,table_A.updateTime ,table_A.url as post_url ,table_A.user_id
                from all_users inner join(
                select post_id,favorites_num,title,views,article.updateTime ,picture.url ,user_id
                from article inner join picture on  picture.related_to=post_id 
                where picture.type=2 and  (article.title like '%${data.title}%' or  tag LIKE  
            CONCAT('%', (
                select e.value 
                from explanation e
                where e.explanation like '%${data.title}%' limit 1)
                , '%'))order by views desc) table_A on table_A.user_id = all_users.user_id) table_B on table_B.user_id = picture.related_to
                where picture.type =1;`,
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
//取得文章tag
exports.get_tag = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT tag FROM star_investor_db.article where post_id='${id}';`,
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
//
//單篇文章訂閱狀態
exports.get_sbs_state = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM star_investor_db.article_subs where user_id=${data.userid} and subs_post_id=${data.postId} and mode='single';`,
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
//吃到飽訂閱
exports.get_full_sbs_state = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select * from star_investor_db.article_subs where user_id=${data.userid} and mode='full' and subs_star_id in (select user_id  FROM star_investor_db.article  where post_id=${data.postId})`,
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
//取得文章訂閱費用(單篇)
exports.getSingleArticleAmount = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select title,price from star_investor_db.article where post_id='${id}';`,
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
