const cron = require("node-cron");
const newDetailsModel = require("../model/newDetailsModel")
const uploadInvestmentPerformance = require('../private-contracts/uploadInvestmentPerformance');
const axios = require('axios');
const listenInventoryUpdate = () => {
    newDetailsModel.getRows().then(results => {
        if (results.length > 0) {
            results.map(result => {
                listenInventoryUpdate1(result);
            })
            newDetailsModel.deleteRows()
        }
    })
}
const listenInventoryUpdate1 = (result) => {
    const {
        user_id,
        brokerId,
        securitiesAccount,
        stock,
        propertyKey,
        propertyValue,
        trade_mode,
        trade_price,
        update_Date,
        stock_name,
    } = result;
    const returnValues = {
        _user_id: user_id,
        _brokerId: brokerId,
        _securitiesAccount: securitiesAccount,
        _stock: stock,
        _propertyKey: propertyKey,
        _propertyValue: propertyValue,
        _trade_mode: trade_mode,
        _trade_price: trade_price,
        _update_Date: update_Date,
        _stock_name: stock_name,

    }
    const event = { returnValues: returnValues }
    console.log("這s!!", returnValues)
    postEventData(event)
}
const postEventData = async (event) => {
    console.log("kkk")
    const response = await axios.post(
        'http://localhost:8080/getData/post-upload-investment-performance',
        event)
}

module.exports = function customCron() {
    // listening details update every 3 seconds
    console.log("西西")
    cron.schedule('*/6 * * * * *', listenInventoryUpdate);
}