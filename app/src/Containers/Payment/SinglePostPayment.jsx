import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useParams } from 'react-router';
import contract from '@truffle/contract';
import SinglePostOpayForm from '../../Components/Payment/OpayForm/SinglePostOpayForm';
import SubscribeSinglePostButton from '../../Components/Payment/SubscribeShareAccountButton/SubscribeSinglePostButton';
import getApi from '../../Utils/Api/getApi';
import { userSelector } from '../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import style from './PaymentStyle';

const useStyles = makeStyles(style);

const SinglePostPayment = () => {
    const classes = useStyles();
    //const { id } = useParams();
    const { postId } = useParams();
    const [paymentInfo, setPaymentInfo] = useState();
    const { userid } = useSelector(userSelector);
    useEffect(() => {
        const getPaymentData = async (postId) => {
            //console.log(postId, "ppp")
            const response = await getApi.post('/article/get-edit-article', {
                postId: postId,
            });
            //console.log(response, "0000")
            setPaymentInfo(response.data[0]);
        };
        getPaymentData(postId);
    }, []);
    return (
        <React.Fragment>
            {paymentInfo ? (
                <div className={classes.root}>
                    <SinglePostOpayForm paymentInfo={paymentInfo} id={postId} />
                    <Typography variant='h3' align='center'>
                        請確認購買項目以及付款資訊
                    </Typography>
                    <Divider />
                    <table className={classes.payment}>
                        <thead>
                            <tr>
                                <th>購買項目:</th>
                                <th>購買金額:</th>
                                <th>付款方式:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    單篇文章: <br />
                                    {paymentInfo.title}
                                </td>
                                <td>{paymentInfo.price}</td>
                                <td>信用卡</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={classes.button}>
                        <SubscribeSinglePostButton
                            totalSubscribeAmount={paymentInfo.price}
                            postId={postId}
                            userid={userid}
                        >
                            確認
                        </SubscribeSinglePostButton>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </React.Fragment>
    );
};

export default SinglePostPayment;
