import React from 'react';
import { GeneralButton } from '../../General/CustomButton/CustomButton';
import { UpdateSinglePostStateLogic } from './SubscribeShareAccountButtonLogic.js';

const SubscribeSinglePostButton = ({ totalSubscribeAmount, userid, postId }) => {
    const handleSubscribeShareAccount = async () => {
        var data = {
            postId: postId,
            userid: userid,
            // totalSubscribeAmount: totalSubscribeAmount,
            // startDate: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        UpdateSinglePostStateLogic(data).then((result) => {
            alert('前往付款~~');
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

export default SubscribeSinglePostButton;
