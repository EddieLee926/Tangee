import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../Reducer/User/UserSlice';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './SelectBoxStyle';
import getApi from '../../../Utils/Api/getApi';

const useStyles = makeStyles(styles);

const SelectBox = ({ starId, handleSelectedStarInvestor, ifAllSelectd }) => {
    const classes = useStyles();
    const [selectItems, setSelectItems] = useState();
    const [isFetching, setIsFetching] = useState(true);
    const { userid } = useSelector(userSelector);
    //alert(ifAllSelectd);
    useEffect(() => {
        const getSubscribedStarInvestor = async (userid) => {
            const response = await getApi.post(
                '/subscribed-starinvestor',
                JSON.stringify({ id: userid })
            );
            if (response.data.length != 0) {
                setSelectItems(response.data);
            }
            setIsFetching(false);
        };
        getSubscribedStarInvestor(userid);
    }, [ifAllSelectd]);

    if (isFetching) {
        return <Skeleton variant='rect' width={120} height={56} />;
    }

    return (
        <>
            {selectItems ? (
                <FormControl variant='outlined' className={classes.formControl}>
                    <InputLabel id='simple-select-outlined-label'>明星投資者</InputLabel>
                    <Select
                        labelId='simple-select-outlined-label'
                        id='simple-select-outlined'
                        value={starId}
                        onChange={handleSelectedStarInvestor}
                        label='明星投資者'
                    >
                        {/* {ifAllSelectd ? ifAllSelectd == true ? <MenuItem key='0' value={''}>全部</MenuItem> : '' : ''} */}
                        <MenuItem key='0' value={''}>
                            全部
                        </MenuItem>
                        {selectItems.map((item) => {
                            return (
                                <MenuItem key={item.nick_name} value={item.user_id}>
                                    {item.nick_name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            ) : (
                <FormControl variant='outlined' className={classes.formControl} disabled>
                    <InputLabel id='disabled-label'>明星投資者</InputLabel>
                    <Select labelId='disabled-label' id='disabled'></Select>
                </FormControl>
            )}
        </>
    );
};

export default SelectBox;
