import contract from '@truffle/contract';
import getApi from '../Api/getApi';
import PublicInvestmentDataSharingPlatform from '../../contracts/PublicInvestmentDataSharingPlatform.json';

//監聽取消訂閱帳號
const ListeningCancelSubscribeShareAccount = (contractAddress, web3) => {

    var contractInstance = new web3.eth.Contract(PublicInvestmentDataSharingPlatform.abi, contractAddress);

    //監聽某事件
    contractInstance.events.cancelSubscribeShareSecuritiesAccount({}, function (err, event) {
        console.log(err);
    })
        .on('data', function (event) {
            //完成後看要不要加個提示
            console.log(event)
            //postEventData(event)
        })
        .on('changed', function (event) {
            // remove event from local database
            console.log("changed", event);
        })
        .on('error', console.error); {
    };
}

// const postEventData = async(event) => {
//     const response = await getApi.post(
//         '/getData/post-subscribe-share-securities-account',
//         JSON.stringify(event))
// }

export default ListeningCancelSubscribeShareAccount;