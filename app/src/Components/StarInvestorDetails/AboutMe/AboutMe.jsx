import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { GetStarMemoLogic } from '../../starInvestorHome/SetStarMemo/SetStarMemoLogic';
import style from './AboutMeStyle';

const useStyles = makeStyles(style);

const AboutMe = ({ userid }) => {
    const classes = useStyles();
    const [memo, setMemo] = useState();
    useEffect(() => {
        GetStarMemoLogic(userid).then((result) => {
            setMemo(result.data.memo);
        });
    }, []);

    return (
        <div className={classes.root}>
            <Typography variant='h1'>About Me</Typography>
            <Typography variant='body1'>{memo}</Typography>
        </div>
    );
};

export default AboutMe;
