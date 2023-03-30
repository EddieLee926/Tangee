const getBrokerInfo = require('../private-contracts/getBrokerInfo');
const getContractInstance = require('./getContractInstance');

const registerSecurityAccount = (data) => {
    return new Promise((resolve, reject) => {
        const { institution_addr, web_socket_conn } =
            getBrokerInfo('INSTITUTION');
        const { brokerId, securitiesAccount } = data;
        const { brokerId_addr } = getBrokerInfo(brokerId);
        console.log(brokerId, securitiesAccount, brokerId_addr, institution_addr.toString())
        getContractInstance(web_socket_conn).then((publicInvestment) => {
            publicInvestment
                .registerBrokerIdSecuritiesAccountAddress(
                    brokerId,
                    securitiesAccount,
                    brokerId_addr,
                    { from: institution_addr.toString() }
                )
                .then((result) => {
                    console.log("註冊成功", result);
                    console.log(brokerId,
                        securitiesAccount,
                        brokerId_addr,
                        { from: institution_addr.toString() });
                    resolve(result);
                })
                .catch((err) => {
                    console.log(err);
                    reject();
                });
        });
    });
};

module.exports = registerSecurityAccount;
