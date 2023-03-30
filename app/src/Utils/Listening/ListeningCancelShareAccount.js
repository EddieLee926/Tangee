import contract from '@truffle/contract';
import getApi from '../Api/getApi';
import PublicInvestmentDataSharingPlatform from '../../contracts/PublicInvestmentDataSharingPlatform.json';

//監聽分享帳號
const ListeningCancelShareAccount = (contractAddress, web3) => {

    var contractInstance = new web3.eth.Contract(PublicInvestmentDataSharingPlatform.abi, contractAddress);

    //監聽某事件
    contractInstance.events.securitiesAccountCanceled({}, function (err, event) {
        console.log(err);
    })
        .on('data', function (event) {
            //console.log("有跑這而嗎");
            deleteEventData(event)
        })
        .on('changed', function (event) {
            // remove event from local database
            console.log("changed", event);
        })
        .on('error', console.error); {
    };
}

// delete request body must be included in payload object with key "data"
const deleteEventData = async (event) => {
    const response = await getApi.delete(
        '/getData/delete-share-securities-account',
        { data: JSON.stringify(event) }
    )
}

export default ListeningCancelShareAccount;