import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import getDataLogic from './Performance.js';
import styles from './PerformanceStyle';

const useStyles = makeStyles(styles);

const StarInvestorDetails = ({ userid }) => {
    const classes = useStyles();
    const [users, setUsers] = useState();
    useEffect(() => {
        getDataLogic(userid).then((result) => {
            setUsers(result.data[0]);
        });
    }, []);

    if (!users) return null;

    return (
        <div className={classes.root}>
            <div className={classes.item}>
                <Typography variant='h2' align='center'>
                    年報酬率
                </Typography>
                <Typography variant='h3' align='center'>
                    {users.year}%
                </Typography>
            </div>
            <Divider flexItem orientation='vertical' />
            <div className={classes.item}>
                <Typography variant='h2' align='center'>
                    月報酬率
                </Typography>
                <Typography variant='h3' align='center'>
                    {users.month}%
                </Typography>
            </div>
            <Divider flexItem orientation='vertical' />
            <div className={classes.item}>
                <Typography variant='h2' align='center'>
                    每周交易次數
                </Typography>
                <Typography variant='h3' align='center'>
                    {users.times}次
                </Typography>
            </div>
            <Divider flexItem orientation='vertical' />
            <div className={classes.item}>
                <Typography variant='h2' align='center'>
                    最大獲利
                </Typography>
                <Typography variant='h3' align='center'>
                    {users.profit}%
                </Typography>
            </div>
            <Divider flexItem orientation='vertical' />
            <div className={classes.item}>
                <Typography variant='h2' align='center'>
                    最大虧損
                </Typography>
                <Typography variant='h3' align='center'>
                    {users.loss}%
                </Typography>
            </div>
        </div>
    );
};

export default StarInvestorDetails;
