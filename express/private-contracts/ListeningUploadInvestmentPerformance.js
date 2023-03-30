const Web3 = require('web3');
const axios = require('axios');
const PrivateInvestmentDataSharingPlatform = require('../contracts/PrivateInvestmentDataSharingPlatform.json');
const getBrokerInfo = require("./getBrokerInfo");
const getContractInstance = require("./getContractInstance");

const ListeningUploadInvestmentPerformance = async (brokerId) => {
    const { web_socket_conn } = getBrokerInfo(brokerId)
    const { address } = await getContractInstance(web_socket_conn);
    const web3 = new Web3(web_socket_conn);
    const contractInstance = new web3.eth.Contract(PrivateInvestmentDataSharingPlatform.abi, address);

    contractInstance.events.shareSecuritiesAccountInvestmentInventoryUploaded({}, function (err, event) {
        //console.log(err);
    })
        .on('data', function (event) {
            console.log(event.id, brokerId)
            // 假如B券商private for C券商結點
            // private events一樣算是觸發2次(B&C)
            // 因此為了只要post一次event資料 在這邊做判斷
            if (brokerId === event.returnValues._brokerId) {
                postEventData(event)
                send_upload_email(event)
            }
        })
        .on('changed', function (event) {
            // remove event from local database
            console.log("changed", event);
        })
        .on('error', console.error);
}

const postEventData = async (event) => {
    const response = await axios.post(
        'http://localhost:8080/getData/post-upload-investment-performance',
        event)
}
const send_upload_email = async (event) => {
    const response = await axios.post(
        'http://localhost:8080/getData/post-upload-investment-performance-send-email',
        event)
}

module.exports = ListeningUploadInvestmentPerformance;