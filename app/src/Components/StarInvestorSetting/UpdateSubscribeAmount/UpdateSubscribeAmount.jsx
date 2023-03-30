import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import styles from './StarInvestorHomeStyle';
// const useStyles = makeStyles(styles);
import UpdateSubscribeAmountJs from './UpdateSubscribeAmount.js';

const UpdateSubscribeAmount = () => {
    // const classes = useStyles();
    return (
        <React.Fragment>
            <h3>updateShareSecuritiesAccountSubscribeAmount 更新訂閱金額</h3>
            <p>確認是否為明星投資者證券帳戶，輸入券商ID和證券帳號，再輸入欲改變之訂閱金額</p>
            <form onSubmit={UpdateSubscribeAmountJs.handleUpdateSubscribeAmount}>
                <input name="brokerId" />
                <input name="securitiesAccount" />
                <input name="subscribeAmount" />
                <button type="submit">submit</button>
            </form>
            <br></br>
        </React.Fragment>
    )
};

export default UpdateSubscribeAmount;