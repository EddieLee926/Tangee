import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import styles from './InventroyReceiptStyle';
// const useStyles = makeStyles(styles);
import SelectBox from '../../Components/NormalMemSubscribedComposition/SelectBox/SelectBox';
import ReceiptList from '../../Components/InventoryReceipt/ReceiptList/ReceiptList';
import SelectStockBox from '../../Components/InventoryReceipt/SelectStockBox/SelectStockBox.js';
import InventoryDetailButton from '../../Components/InventoryReceipt/InventoryDetailButton/InventoryDetailButton.js';

const InventroyReceipt = () => {
    // const classes = useStyles();
    // return <>InventroyReceipt</>;
    // const [data, setData] = useState("Hello");
    // useEffect(() => {
    //     const getResponse = async () => {
    //         const response = await getApi.get('/inventory-receipt')
    //         console.log(response.data)
    //         const msg = response.data;
    //         setData(msg)
    //     }
    //     getResponse()
    // }, [])

    // if (!data) {
    //     return <div>Loading</div>
    // } else {
    const [starId, setStartId] = useState('');
    const [stock, setStock] = useState('');
    const handleSelectedStarInvestor = (event) => {
        setStartId(event.target.value);
    };
    const handleSelectedStock = (event) => {
        setStock(event.target.value.stock);
    };
    return (
        <>
            <div>
                <SelectBox
                    selectedStarInvestor={starId}
                    handleSelectedStarInvestor={handleSelectedStarInvestor}
                    ifAllSelectd={true}
                />

                <SelectStockBox
                    selectedStarInvestor={starId}
                    handleSelectedStock={handleSelectedStock}
                />
                <InventoryDetailButton
                    selectedStock={stock}
                    selectedStarInvestor={starId}
                />
                <ReceiptList
                    selectedStarInvestor={starId}
                    selectedStock={stock}
                    isStarPage={false}
                />
            </div>
        </>
    );
};

export default InventroyReceipt;
