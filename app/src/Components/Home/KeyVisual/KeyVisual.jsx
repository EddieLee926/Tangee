import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { getImage } from '../../../Config/images';
import styles from './KeyVisualStyle';
const useStyles = makeStyles(styles);

const KeyVisual = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <img src={getImage('general', 'logo', 'type3')} className={classes.image} />
            <div className={classes.text}>
                <Typography variant='h1' align='center'>
                    抓對方向，打敗大盤!
                </Typography>
                <Typography variant='h2' align='center'>
                    帶你探大吉!
                </Typography>
            </div>
        </div>
    );
};

export default KeyVisual;
