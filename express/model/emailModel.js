// const email = require('../config/email');
const nodemailer = require('nodemailer');
const { getTagChinese } = require('./getChartTableDataModel');
var alert = [];
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tangee.official',
        pass: 'tangeenumber1',
    },
});

exports.send_email = (email, data) => {
    //console.log("jijiwdjwidjwid", email, data)
    var content = '您好,' + `\n`;
    content += `您的訂閱者${data.dataName.nick_name}(證券帳號為:${data.securitiesAccount})，日前於${data.dataName.updateTime}，以${data.trade_price}元的價格${data.dataName.explanation}${data.stock_name}${data.propertyValue}股`;
    console.log(content);
    return new Promise((resolve, reject) => {
        for (var a = 0; a < email.length; a++) {
            let mailOptions = {
                from: 'tangee.official@gmail.com',
                to: email[a].email,
                subject: `Tangee通知您`,
                text: content,
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    alert.push('false');
                    alert.push('抱歉系統出現了一些小問題!');
                    console.log(alert);
                    console.log(error);
                    reject(false);
                    return alert;
                } else {
                    alert.push('true');
                    alert.push('已成功寄出!');
                    resolve(true);
                    return alert;
                }
            });

        }
    });
};
