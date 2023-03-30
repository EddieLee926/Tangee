const getBrokerInfo = require("./getBrokerInfo");
const getContractInstance = require("./getContractInstance");
const getSubscriberBrokerKeyModel = require("../model/getSubscriberBrokerKeyModel");
const axios = require('axios');
const uploadInvestmentPerformance = async (result) => {
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
    const { brokerId_addr, web_socket_conn } = getBrokerInfo(brokerId)
    const privateInvestment = await getContractInstance(web_socket_conn);
    const private_key_array = await getSubscriberBrokerKeyModel.getSubscriberBrokerKey(user_id)

    privateInvestment.uploadShareSecuritiesAccountInvestmentInventory(
        user_id,
        brokerId,
        securitiesAccount,
        stock,
        propertyKey,
        propertyValue,
        trade_mode,
        trade_price,
        update_Date,
        stock_name, {
        from: brokerId_addr.toString(),
        privateFor: private_key_array // ["Akey","Bkey"]
    }
    ).then(result => {
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
        postEventData(event)
    })
}

const postEventData = async (event) => {
    const response = await axios.post(
        'http://localhost:8080/getData/post-upload-investment-performance',
        event)
}
module.exports = uploadInvestmentPerformance;