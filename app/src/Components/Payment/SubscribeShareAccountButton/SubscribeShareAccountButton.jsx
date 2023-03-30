import React from 'react';
import { GeneralButton } from '../../General/CustomButton/CustomButton';
import { UpdateSubscribeStateLogic } from './SubscribeShareAccountButtonLogic.js';
const SubscribeShareAccountButton = ({
    publicInvestment,
    brokerIdAddress,
    subscribeBrokerId,
    subscriberSecuritiesAccount,
    shareBrokerId,
    shareSecuritiesAccount,
    totalSubscribeAmount,
    shareID,
    userid,
}) => {
    const handleSubscribeShareAccount = (e) => {
        e.preventDefault();
        publicInvestment
            .subscribeShareSecuritiesAccount(
                subscribeBrokerId,
                subscriberSecuritiesAccount,
                shareBrokerId,
                shareSecuritiesAccount,
                Date.now(),
                Date.now(),
                totalSubscribeAmount,
                { from: brokerIdAddress.toString() }
            )
            .then((result) => {
                console.log(result);
                var data = {
                    userid: userid,
                    brokerId: subscribeBrokerId,
                    transactionHash: result.receipt.transactionHash,
                    shareID: shareID,
                    totalSubscribeAmount: totalSubscribeAmount,
                    startDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
                };
                console.log(data);
                UpdateSubscribeStateLogic(data).then((result) => {
                    alert(result.data);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <GeneralButton
            category='outline'
            type='submit'
            form='formCreditCard'
            onClick={handleSubscribeShareAccount}
        >
            確認
        </GeneralButton>
    );
};

export default SubscribeShareAccountButton;
