//const db = require('./connection_db');
const https = require("https");


function httpRequest(url) {
    return new Promise(function (resolve, reject) {
        https.get(url, function (response) {
            var data = "";
            console.log("start");
            response.on("data", chunk => {
                //console.log("on data");
                data += chunk;
            });


            response.on("end", () => {
                console.log("123");
                data = JSON.parse(data);
                //console.log(data.data9);
                resolve(data.data9);

            });
        });
    });
}