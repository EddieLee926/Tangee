import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
//import { GetPostSettingButtonLogic, UpdateSettingButtonLogic } from './PostSettingButtonLogic.js';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from 'react-router-dom';
//這個頁面會根據使用者是否有選擇股票而顯示
const InventoryDetailButton = ({ selectedStarInvestor, selectedStock }) => {
    var path = '/inventory/stock_detail/' + selectedStarInvestor + '/' + selectedStock
    console.log(selectedStock);
    return <>

        {selectedStock ? <Button variant="contained" color="inherant" component={Link} to={path}  >詳細庫存描述</Button> : ''}

    </>;
};


export default InventoryDetailButton;