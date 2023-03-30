const contract = require('@truffle/contract');
const PrivateInvestmentDataSharingPlatform = require('../contracts/PrivateInvestmentDataSharingPlatform.json');

const getContractInstance = async(currentProvider) =>{
    const MyContract = contract(PrivateInvestmentDataSharingPlatform);
    MyContract.setProvider(currentProvider);
    const MyContractInstance = await MyContract.deployed();
    return MyContractInstance;
}

module.exports = getContractInstance;