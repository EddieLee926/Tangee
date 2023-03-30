import React from 'react';
import Button from '@material-ui/core/Button';

const CancelShareSecuritesAccountButton = ({
    brokerId,
    securitiesAccount,
    brokerIdAddress,
    publicInvestment,
}) => {
    const handleCancelSharedAccount = () => {
        publicInvestment
            .cancelShareSecuritiesAccount(brokerId, securitiesAccount, {
                from: brokerIdAddress.toString(),
            })
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Button
            variant='contained'
            color='inherant'
            onClick={handleCancelSharedAccount}
        >
            取消訂閱庫存
        </Button>
    );
};

export default CancelShareSecuritesAccountButton;
