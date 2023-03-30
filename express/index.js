const express = require('express');
const cors = require('cors');
const getDataRouter = require('./routes/getData');
const indexRouter = require('./routes/index');
const articleRouter = require('./routes/article');
const customCron = require('./node-cron');
const listeningUploadInvestmentPerformance = require('./private-contracts/ListeningUploadInvestmentPerformance');

const app = express();
const corsOptions = { origin: 'http://localhost:3000' };

app.use(cors(corsOptions));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.json());
app.use(express.text());

// ref:
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

// 把subroute加進來 盡量用api處理事情的種類去分subroute
// 至於index route還沒有要放什麼

//放入get post一切有關頁面的操作
app.use('/', indexRouter);
//專門用來取資料後段操作(不涉及前端)
app.use('/getData', getDataRouter);
app.use('/article', articleRouter);

// check rows update periodically
customCron();

// broker A,B,C listening for upload events
// listeningUploadInvestmentPerformance('A');
// listeningUploadInvestmentPerformance('B');
// listeningUploadInvestmentPerformance('C');

//拿來測試image
/*app.post("/getData/img", (req, res) => {
        console.log("req", req.body);
        /*dataHandleController.uploadPictureAndInsertURLtoDB().then(result =>
                res.send(result)
        )*/
//});

//下面這些東東到時候會分進router
/*
// simple route
app.get("/", (req, res) => {
        res.json({ message: "Welcome to bezkoder application." });
});

app.get("/investment-performance", (req, res) => {
        getPerformance().then(result =>
                res.send(result)
        )

});
/*app.get("/my-inventory", (req, res) => {
        getOwnInventory().then(result =>
                res.send(result)
        )

});*/
/*app.get("/inventory-receipt", (req, res) => {
        getInventoryReceipt().then(result =>
                res.send(result)
        )

});
app.get("/sub-post", (req, res) => {
        getPost().then(result =>
                res.send(result)
        )

});
app.get("/pop-post", (req, res) => {
        getPopPost().then(result =>
                res.send(result)
        )
});*/
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
});
