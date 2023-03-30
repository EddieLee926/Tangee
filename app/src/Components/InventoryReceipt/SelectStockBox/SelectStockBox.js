import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../Reducer/User/UserSlice';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './SelectStockBoxStyle';
import getApi from '../../../Utils/Api/getApi';

const useStyles = makeStyles(styles);

const SelectStockBox = ({ selectedStarInvestor, handleSelectedStock }) => {
    const classes = useStyles();
    const [selectItems, setSelectItems] = useState();
    const [isFetching, setIsFetching] = useState(true);
    const { userid, broScheme } = useSelector(userSelector);

    useEffect(() => {
        const getSubscribedStarInvestor = async () => {
            const data = {
                selectedStarInvestor: selectedStarInvestor,
                broScheme: broScheme,
            };

            const response = await getApi.post('/subscribed-starinvestor-stock', data);
            response.data.length == 0
                ? setSelectItems('')
                : setSelectItems(response.data);

            setIsFetching(false);
        };
        getSubscribedStarInvestor();
    }, [selectedStarInvestor]);

    if (isFetching) {
        return <Skeleton variant='rect' width={120} height={56} />;
    }

    return (
        <>
            {selectItems ? (
                <FormControl variant='outlined' className={classes.formControl}>
                    <InputLabel id='simple-select-outlined-label'>選擇股票</InputLabel>
                    <Select
                        labelId='simple-select-outlined-label'
                        id='simple-select-outlined'
                        value={selectedStarInvestor}
                        defaultValue=''
                        onChange={handleSelectedStock}
                        label='股票'
                    >
                        <MenuItem key='0' value={''}>
                            全部
                        </MenuItem>
                        {selectItems.map((item) => {
                            return (
                                <MenuItem key={item.stock} value={item}>
                                    {item.stock_name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            ) : (
                <FormControl variant='outlined' className={classes.formControl} disabled>
                    <InputLabel id='disabled-label'>選擇股票</InputLabel>
                    <Select labelId='disabled-label' id='disabled'></Select>
                </FormControl>
            )}
        </>
    );
};

export default SelectStockBox;
