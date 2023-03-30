import React from 'react';
import Button from '@material-ui/core/Button';
import { UpdateSubscribeSinglePostStateLogic } from './CancelSubscribeShareAccountButtonLogic.js';
import { GeneralButton } from '../../General/CustomButton/CustomButton.jsx';
const CancelSubscribeSingleArticleButton = ({ userid, postId, className }) => {
    const handleSubscribeShareAccount = async () => {
        // console.log("有按到")
        var data = {
            userid: userid,
            postId: postId,
            // startDate: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        UpdateSubscribeSinglePostStateLogic(data).then((result) => {
            alert('取消訂閱本文章~~');
        });
    };
    return (
        // <Button
        //         variant="contained"
        //         color="primary"
        //         type="submit"
        //         form="formCreditCard"
        //         onClick={handleSubscribeShareAccount}
        // >
        //         取消訂閱此文章
        // </Button>
        <GeneralButton
            category='outline'
            onClick={handleSubscribeShareAccount}
            type='submit'
            form='formCreditCard'
            className={className}
        >
            取消訂閱此文章
        </GeneralButton>
    );
};

export default CancelSubscribeSingleArticleButton;
