import React from 'react';
import Button from '@material-ui/core/Button';
import { UpdateSubscribePostStateLogic } from './CancelSubscribeShareAccountButtonLogic.js';
import { LinkButton } from '../../General/CustomButton/CustomButton.jsx';
const CancelSubscribeShareArticleButton = ({

        shareID,
        userid
}) => {

        const handleSubscribeShareAccount = async () => {
                var data = {
                        userid: userid,
                        shareID: shareID,

                }
                UpdateSubscribePostStateLogic(data).then(result => {
                        alert("取消訂閱吃到飽~~")
                })
        }
        return (
                // <Button
                //         variant="contained"
                //         color="primary"
                //         type="submit"
                //         form="formCreditCard"
                //         onClick={handleSubscribeShareAccount}
                // >
                //         取消訂閱文章吃到飽
                // </Button>
                <LinkButton category='outline' onClick={handleSubscribeShareAccount} type="submit" form="formCreditCard">
                        取消訂閱文章吃到飽
                </LinkButton>
        )
}

export default CancelSubscribeShareArticleButton;
