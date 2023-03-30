import React from 'react';
import { LinkButton } from '../CustomButton/CustomButton';
import { makeStyles } from '@material-ui/core/styles';
import styles from './HeaderStyle';

const useStyles = makeStyles(styles);

const HeaderContentType1 = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.buttonWrap}>
                <LinkButton to='/search-star-investor'>熱門明星投資者</LinkButton>
                <LinkButton to='/popular-post'>熱門文章</LinkButton>
            </div>
            <div className={classes.buttonWrap}>
                <LinkButton to='/login' category='normal'>
                    登入
                </LinkButton>
            </div>
        </React.Fragment>
    );
};

export default HeaderContentType1;
