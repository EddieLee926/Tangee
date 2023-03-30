import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import styles from './PaperBlockStyle';
const useStyles = makeStyles(styles);

const PaperBlock = ({ children, className }) => {
    const classes = useStyles();
    const paperClasses = clsx({
        [classes.root]: true,
        [className]: className,
    });
    return (
        <Paper className={paperClasses} elevation={3}>
            {children}
        </Paper>
    );
};

export default PaperBlock;
