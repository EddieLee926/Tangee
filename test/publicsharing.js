const PublicSharing = artifacts.require("PublicInvestmentDataSharingPlatform");

contract("PublicSharing", accounts => {
    it("transaction success!", async () => {
        const publicSharingInstance = await PublicSharing.deployed();
  
        // Set 
        const result = await publicSharingInstance.registerBrokerIdSecuritiesAccountAddress(
            89, "accounts", accounts[0],
            { from: accounts[0] }
        );
    
        assert.equal(result.receipt.status, true, "The transaction failed.");
    });
});
  