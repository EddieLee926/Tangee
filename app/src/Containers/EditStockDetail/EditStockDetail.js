import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import EditStockDetailContent from '../../Components/InventoryReceipt/EditStockDetailContent/EditStockDetailContent.js';
// import styles from './StarInvestorWritePostStyle';
import getApi from '../../Utils/Api/getApi'
// const useStyles = makeStyles(styles);
import { userSelector } from '../../Reducer/User/UserSlice'
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

const EditStockDetail = () => {
    // const { userid } = useSelector(userSelector);
    let { stock } = useParams()

    return <>

        <EditStockDetailContent stock={stock} />

    </>;
};

export default EditStockDetail;