import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import styles from './SmartPhoneBlockStyle';
import { getImage } from '../../../Config/images';
const useStyles = makeStyles(styles);

const SmartPhoneBlock = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.leftSection}>
                <img
                    src={getImage('general', 'background', 'cellphonemain')}
                    className={classes.image}
                />
                <img
                    src={getImage('general', 'background', 'emailnotice')}
                    className={classes.notice}
                />
            </div>
            <div className={classes.rightSection}>
                <Typography variant='h2'>
                    即時通知明星投資者庫存變動，讓你可以馬上決定要不要跟著明星投之者一起下單!
                </Typography>
            </div>
        </div>
    );
};

export default SmartPhoneBlock;
