import React from 'react';
import { GeneralButton } from '../../General/CustomButton/CustomButton';
import { UpdateSubscribePostStateLogic } from './SubscribeShareAccountButtonLogic.js';

const SubscribeSharePostButton = ({
    subscribeBrokerId,
    totalSubscribeAmount,
    shareID,
    userid,
}) => {
    const handleSubscribeShareAccount = async () => {
        var data = {
            userid: userid,
            brokerId: subscribeBrokerId,
            shareID: shareID,
            totalSubscribeAmount: totalSubscribeAmount,
            startDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
        };
        UpdateSubscribePostStateLogic(data).then((result) => {
            alert('訂閱文章吃到飽~~');
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

export default SubscribeSharePostButton;
