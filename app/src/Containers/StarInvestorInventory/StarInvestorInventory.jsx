import React, { useEffect, useState } from 'react';
import { userSelector } from '../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import SelectBox from '../../Components/NormalMemSubscribedComposition/SelectBox/SelectBox';
import ReceiptList from '../../Components/InventoryReceipt/ReceiptList/ReceiptList';
import SelectStockBox from '../../Components/InventoryReceipt/SelectStockBox/SelectStockBox.js';
import EditStockDetail from '../EditStockDetail/EditStockDetail.js';

import getApi from '../../Utils/Api/getApi';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
const StarInvestorInventory = () => {
    //var path = '/star/write-stock-detail/' + stock;

    const [stock, setStock] = useState('');
    const [stockName, setStockName] = useState('');
    const { userid, isStarInvestor } = useSelector(userSelector);

    const handleSelectedStock = (event) => {
        setStock(event.target.value.stock);
        setStockName(event.target.value.stock_name);
        // console.log(stockName);
    };

    return (
        <>
            <div>
                <SelectStockBox
                    selectedStarInvestor={userid}
                    handleSelectedStock={handleSelectedStock}
                />
                {stock ? (
                    <Button
                        variant='contained'
                        color='inherant'
                        component={Link}
                        to={'/star/write-stock-detail/' + stock}
                    >
                        編輯詳細庫存描述
                    </Button>
                ) : (
                    ''
                )}
                <ReceiptList
                    selectedStarInvestor={userid}
                    selectedStock={stock}
                    isStarPage={true}
                />
            </div>
        </>
    );
};

export default StarInvestorInventory;
