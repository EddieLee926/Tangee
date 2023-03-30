import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';

// import styles from './StarInvestorWritePostStyle';
import getApi from '../../Utils/Api/getApi'
// const useStyles = makeStyles(styles);
import { userSelector } from '../../Reducer/User/UserSlice'
import { useSelector } from 'react-redux';
import LoadImage from '../../Components/General/image/LoadImage';
import NickName from '../../Components/General/NickName/NickName';
import UploadImage from '../../Components/General/image/UploadImage';
import InsertEditor from '../../Components/StarInvestorWritePost/Editor/InsertEditor';
import ReceiptSummary from '../../Components/InventoryReceipt/ReceiptSummary/ReceiptSummary';

const Remark = () => {
        const { userid } = useSelector(userSelector);
        const { detail_num } = "1";
        return <>
                寫備註的頁面
                <div style={{
                        float: 'left'
                }}>
                        <LoadImage key={userid} userid={userid} />

                </div>
                <div><br></br></div>
                <NickName key={userid} id={userid} />
                <ReceiptSummary key={detail_num} detail_num={detail_num} />

        </>;
};

export default Remark;