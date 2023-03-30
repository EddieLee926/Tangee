const getUserModel = require("../model/httpRequestModel");
const fs = require("fs");

/*
加上 heroku addon 來判斷多久觸發一次這個controller，可能會在 index.js 觸發
*/


//六日休市、國定假日 20210920 20210921 20211011 休市
var date = new Date();
var holiday = nowDate();
if (date.getDay() != 6 && date.getDay() != 0 && (holiday != 20210920 && holiday != 20210921 && holiday != 20211011)) {
    // 今天檔案
    var url = URL();
    httpRequest(url).then(result => {
        var bigObject = {};

        // 開一個 json 檔
        var name = 'TWSE_DATA';
        fs.writeFile(name + '.json', "", function (err) {
            if (err)
                console.log(err);
            else {
                console.log('Write operation complete.');
            }

        });

        // 把資料放進 bigObject
        result.map((x, index) => {
            var object = {};

            object["number"] = x[0];
            object["name"] = x[1];
            object["startPrice"] = x[5];
            object["highestPrice"] = x[6];
            object["lowestPrice"] = x[7];
            object["endPrice"] = x[8];

            bigObject[x[0]] = object;
        })

        // 把bigObject 裡的 object 一個一個放進前面開好的 json檔
        for (let x of result) {
            fs.writeFile(name + '.json', JSON.stringify(bigObject), (err) => {
                if (err) {
                    throw err;
                }
            });
        }
        //console.log(bigObject[3545]);
    });
}


// 今天日期
function nowDate() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();

    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    var date_time = y + '' + m + '' + d;
    return date_time;
}


//今日大盤URL
function URL() {
    var Time = nowDate();
    var url = 'https://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&date=' + Time + '&type=ALLBUT0999';
    return url;
}