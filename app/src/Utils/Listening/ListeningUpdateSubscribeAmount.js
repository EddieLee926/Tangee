import contract from '@truffle/contract';
import getApi from '../Api/getApi';
import PublicInvestmentDataSharingPlatform from '../../contracts/PublicInvestmentDataSharingPlatform.json';

//監聽分享帳號
const ListeningUpdateSubscribeAmount = (contractAddress,web3) => {
  
    var contractInstance = new web3.eth.Contract(PublicInvestmentDataSharingPlatform.abi, contractAddress);

    //監聽某事件
    contractInstance.events.securitiesAccountSubscribeAmountUpdated({}, function (err, event) {
        console.log(err);
    })
        .on('data', function (event) {
            postEventData(event)
        })
        .on('changed', function (event) {
            // remove event from local database
            console.log("changed", event);
        })
        .on('error', console.error); {
    };
}

const postEventData = async(event) => {
    const response = await getApi.post(
        '/getData/update-share-securities-account-subscribe-amount',
        JSON.stringify(event)
    )
}

export default ListeningUpdateSubscribeAmount;