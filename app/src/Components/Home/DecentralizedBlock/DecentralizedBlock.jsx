import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import styles from './DecentralizedBlockStyle';
import { getImage } from '../../../Config/images';
const useStyles = makeStyles(styles);

const DecentralizedBlock = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Divider variant='middle' className={classes.titleDivider} />
                <Typography variant='h1'>企業區塊鏈平台</Typography>
                <Divider variant='middle' className={classes.titleDivider} />
            </div>
            <div className={classes.text}>
                <Typography variant='body1' align='center'>
                    Tangee是一個基於以太坊的企業區塊鏈平台，在各券商間建立聯盟鏈，並藉由私有交易的方式在盤中即時取得明星投資者的交易資料回傳至本平台，在資訊共享與隱私保護之間取得平衡。本平台最大的特色在於，運用區塊鏈具備「加密」、「不可竄改」的特性確保資訊的安全與真實!
                </Typography>
            </div>
            <div className={classes.logoWrapper}>
                <div className={classes.logo}>
                    <img
                        src={getImage('general', 'blockchain', 'mysql')}
                        className={classes.logoImage}
                    />
                </div>
                <div className={classes.logo}>
                    <img
                        src={getImage('general', 'blockchain', 'node')}
                        className={classes.logoImage}
                    />
                </div>
                <div className={classes.logo}>
                    <img
                        src={getImage('general', 'blockchain', 'quorum')}
                        className={classes.logoImage}
                    />
                </div>
                <div className={classes.logo}>
                    <img
                        src={getImage('general', 'blockchain', 'react')}
                        className={classes.logoImage}
                    />
                </div>
                <div className={classes.logo}>
                    <img
                        src={getImage('general', 'blockchain', 'solidity')}
                        className={classes.logoImage}
                    />
                </div>
            </div>
        </div>
    );
};

export default DecentralizedBlock;
