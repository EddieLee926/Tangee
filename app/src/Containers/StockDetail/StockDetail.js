import React from 'react';
import StockDetailContent from '../../Components/InventoryReceipt/StockDetailContent/StockDetailContent.js';

import { useParams } from "react-router-dom";

// import { makeStyles } from '@material-ui/core/styles';
// import styles from './PostPageStyle';
// const useStyles = makeStyles(styles);

const StockDetail = () => {
    // const classes = useStyles();
    let { starID } = useParams();
    let { stock } = useParams()
    return <>
        股票庫存明細
        <StockDetailContent key={starID} starID={starID} stock={stock} />
    </>;
};

export default StockDetail;


