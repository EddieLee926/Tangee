import React, { useState, useEffect } from 'react';
import getDataLogic from './SubscribedStartInvest.js';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import SubscribedStarInvestorBlock from '../../General/SubscribedStarInvestorBlock/SubscribedStarInvestorBlock';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import style from './SubscribedStartInvestStyle';
import { Typography } from '@material-ui/core';
const useStyle = makeStyles(style);

const SubscribedStartInvest = () => {
    const classes = useStyle();
    const { userid } = useSelector(userSelector);
    const [users, setUsers] = useState();
    useEffect(() => {
        getDataLogic(userid).then((result) => {
            const newArr = [];
            while (result.data.length) newArr.push(result.data.splice(0, 2));
            setUsers(newArr);
        });
    }, []);

    if (!users) return <CircularProgress color='secondary' />;

    return (
        <div className={classes.root}>
            <Typography variant='h1'>追蹤的明星投資者</Typography>
            {users.map((user, index) => (
                <div key={index} className={classes.wrapper}>
                    {user.map((u) => (
                        <SubscribedStarInvestorBlock user={u} key={u.nick_name} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SubscribedStartInvest;
