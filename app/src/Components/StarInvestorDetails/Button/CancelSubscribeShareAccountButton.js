import React from 'react';
import { UpdateSubscribeStateLogic } from './CancelSubscribeShareAccountButtonLogic.js';
import { GeneralButton } from '../../General/CustomButton/CustomButton.jsx';
const CancelSubscribeShareAccountButton = ({
    publicInvestment,
    brokerIdAddress,
    subscribeBrokerId,
    subscriberSecuritiesAccount,
    shareBrokerId,
    shareSecuritiesAccount,
    shareID,
    userid,
}) => {
    const handleSubscribeShareAccount = (e) => {
        e.preventDefault();
        console.log(
            '來到取消嘞',
            subscribeBrokerId,
            subscriberSecuritiesAccount,
            shareBrokerId,
            shareSecuritiesAccount,
            Date.now(),
            brokerIdAddress.toString()
        );
        publicInvestment
            .cancelSubscribeShareSecuritiesAccount(
                subscribeBrokerId,
                subscriberSecuritiesAccount,
                shareBrokerId,
                shareSecuritiesAccount,
                Date.now(),
                { from: brokerIdAddress.toString() }
            )
            .then((result) => {
                console.log(result);
                var data = {
                    userid: userid,
                    brokerId: subscribeBrokerId,
                    transactionHash: result.receipt.transactionHash,
                    shareID: shareID,
                    dueDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
                };
                console.log('要存囉', data);
                UpdateSubscribeStateLogic(data).then((result) => {
                    alert(result.data);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <GeneralButton category='outline' onClick={handleSubscribeShareAccount}>
            取消訂閱證券帳號
        </GeneralButton>
    );
};

export default CancelSubscribeShareAccountButton;
