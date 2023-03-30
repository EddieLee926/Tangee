const Migrations = artifacts.require("Migrations");
const PrivateInvestmentDataSharingPlatform = artifacts.require("PrivateInvestmentDataSharingPlatform");
const TESSERA_PUBLIC_KEY = require('../tessera/tessera_public_key');

module.exports = function(deployer) {
    deployer.deploy(Migrations);
    deployer.deploy(PrivateInvestmentDataSharingPlatform,{privateFor:[
        TESSERA_PUBLIC_KEY.BROKER_B_KEY,
        TESSERA_PUBLIC_KEY.BROKER_C_KEY
    ]});
};
