const Migrations = artifacts.require("Migrations");
const PublicInvestmentDataSharingPlatform = artifacts.require("PublicInvestmentDataSharingPlatform");

module.exports = function(deployer) {
    deployer.deploy(Migrations);
    deployer.deploy(PublicInvestmentDataSharingPlatform);
};
