import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useParams } from 'react-router';
import contract from '@truffle/contract';
import OpayForm from '../../Components/Payment/OpayForm/OpayForm';
import SubscribeShareAccountButton from '../../Components/Payment/SubscribeShareAccountButton/SubscribeShareAccountButton';
import getApi from '../../Utils/Api/getApi';
import { userSelector } from '../../Reducer/User/UserSlice.js';
import { quorumNodesSelector } from '../../Reducer/QuorumNodes/QuorumNodesSlice';
import { useSelector } from 'react-redux';
import PublicInvestmentDataSharingPlatform from '../../contracts/PublicInvestmentDataSharingPlatform.json';
import ListeningSubscribeShareAccount from '../../Utils/Listening/ListeningSubscribeShareAccount';
import style from './PaymentStyle';

const useStyles = makeStyles(style);

const Payment = () => {
    // const classes = useStyles();
    const { id } = useParams();
    const [paymentInfo, setPaymentInfo] = useState();
    const { userid, brokerId, securitiesAccount } = useSelector(userSelector);
    const { currentProvider, brokerIdAddress, web3 } = useSelector(quorumNodesSelector);
    const [publicInvestment, setPublicInvestment] = useState('');
    const classes = useStyles();

    useEffect(() => {
        const getPaymentData = async (id) => {
            const response = await getApi.post(
                '/payment',
                JSON.stringify({ userid: id })
            );
            setPaymentInfo(response.data[0]);
        };
        getPaymentData(id);
    }, []);

    const getContract = async () => {
        const MyContract = contract(PublicInvestmentDataSharingPlatform);
        MyContract.setProvider(currentProvider);
        const MyContractInstance = await MyContract.deployed();
        setPublicInvestment(MyContractInstance);
    };

    useEffect(() => {
        if (brokerIdAddress) {
            getContract();
        }
    }, [brokerIdAddress]);

    useEffect(() => {
        if (publicInvestment) {
            // console.log("這個!")
            ListeningSubscribeShareAccount(publicInvestment.address, web3);
        }
        return () => {
            web3.eth.clearSubscriptions();
        };
    }, [publicInvestment]);

    return (
        <React.Fragment>
            {paymentInfo ? (
                <div className={classes.root}>
                    <OpayForm paymentInfo={paymentInfo} id={id} />
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
                                <td>{paymentInfo.nick_name}明星投資者訂閱費</td>
                                <td>{paymentInfo.sub_price}</td>
                                <td>信用卡</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={classes.button}>
                        <SubscribeShareAccountButton
                            publicInvestment={publicInvestment}
                            brokerIdAddress={brokerIdAddress}
                            subscribeBrokerId={brokerId}
                            subscriberSecuritiesAccount={securitiesAccount}
                            shareBrokerId={paymentInfo.brokerId}
                            shareSecuritiesAccount={paymentInfo.securitiesAccount}
                            totalSubscribeAmount={paymentInfo.sub_price}
                            shareID={id}
                            userid={userid}
                            className={classes.button}
                        >
                            確認
                        </SubscribeShareAccountButton>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </React.Fragment>
    );
};

export default Payment;
