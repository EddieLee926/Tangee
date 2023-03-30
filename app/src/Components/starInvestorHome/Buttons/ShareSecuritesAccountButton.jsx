import React from 'react';
import Button from '@material-ui/core/Button';

const ShareSecuritesAccountButton = ({
    brokerId,
    securitiesAccount,
    brokerIdAddress,
    publicInvestment,
}) => {
    const handleShareAccount = () => {
        const month = new Date().getMonth().toString();
        publicInvestment
            .shareSecuritiesAccount(brokerId, securitiesAccount, month, {
                from: brokerIdAddress.toString(),
            })
            .then((result) => {
                console.log("分享證券帳號result", result);
                console.log("分享的transactionHash", result.receipt.transactionHash);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Button
            variant='contained'
            color='inherant'
            onClick={handleShareAccount}
        >
            分享訂閱庫存
        </Button>
    );
};

export default ShareSecuritesAccountButton;
