import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import contract from '@truffle/contract';
import FullArticleOpayForm from '../../Components/Payment/OpayForm/FullArticleOpayForm';
import SubscribeSharePostButton from '../../Components/Payment/SubscribeShareAccountButton/SubscribeSharePostButton';
import getApi from '../../Utils/Api/getApi';
import { userSelector } from '../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import style from './PaymentStyle';

const useStyles = makeStyles(style);

const PostPayment = () => {
    // const classes = useStyles();
    const { id } = useParams();
    const { userid } = useSelector(userSelector);
    const [paymentInfo, setPaymentInfo] = useState();
    const classes = useStyles();

    useEffect(() => {
        const getPaymentData = async (id) => {
            //console.log(id, 'poiu');
            const response = await getApi.post(
                '/payment',
                JSON.stringify({ userid: id })
            );
            setPaymentInfo(response.data[0]);
        };
        getPaymentData(id);
    }, []);

    return (
        <React.Fragment>
            {paymentInfo ? (
                <div className={classes.root}>
                    <FullArticleOpayForm paymentInfo={paymentInfo} id={id} />
                    <Typography variant='h3' align='center'>
                        請確認訂閱項目以及付款資訊
                    </Typography>
                    <Divider />
                    <table className={classes.payment}>
                        <thead>
                            <tr>
                                <th>訂閱項目:</th>
                                <th>訂閱金額:</th>
                                <th>付款方式:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {paymentInfo.nick_name}
                                    <br />
                                    文章吃到飽訂閱費
                                </td>
                                <td>{paymentInfo.subAllPost_price}</td>
                                <td>信用卡</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={classes.button}>
                        <SubscribeSharePostButton
                            shareBrokerId={paymentInfo.brokerId}
                            totalSubscribeAmount={paymentInfo.subAllPost_price}
                            shareID={id}
                            userid={userid}
                        >
                            確認
                        </SubscribeSharePostButton>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </React.Fragment>
    );
};

export default PostPayment;
