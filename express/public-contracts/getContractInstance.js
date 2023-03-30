const contract = require('@truffle/contract');
const PublicInvestmentDataSharingPlatform = require('../contracts/PublicInvestmentDataSharingPlatform.json');

const getContractInstance = async (currentProvider) => {
    const MyContract = contract(PublicInvestmentDataSharingPlatform);
    MyContract.setProvider(currentProvider);
    const MyContractInstance = await MyContract.deployed();
    return MyContractInstance;
};

module.exports = getContractInstance;
