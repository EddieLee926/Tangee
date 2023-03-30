import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './KChartBlockStyle';
const useStyles = makeStyles(styles);

const KChartBlock = () => {
    const classes = useStyles();
    return <div className={classes.root}></div>;
};

export default KChartBlock;
