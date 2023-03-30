import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import LoadImage from '../image/LoadImage';
import { Link } from 'react-router-dom';
import { LinkButton, GeneralButton } from '../CustomButton/CustomButton';
import { makeStyles } from '@material-ui/core/styles';
import { userSelector } from '../../../Reducer/User/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../../Reducer/User/UserSlice.js';
import styles from './HeaderStyle';
import NotifyStockData from '../NotifyStockData/NotifyStockData.js';
const useStyles = makeStyles(styles);

const HeaderContentType2 = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { isStarInvestor, userid } = useSelector(userSelector);
    const homePath = isStarInvestor ? '/star/home' : '/normal/home';
    const handleOnClick = () => {
        localStorage.clear();
        dispatch(userLogout());
    };
    return (
        <React.Fragment>
            <div className={classes.buttonWrap}>
                <LinkButton to='/inventory/receipt'>追蹤的庫存明細</LinkButton>
                <LinkButton to='/inventory/subscribed-composition'>
                    追蹤的投資組合
                </LinkButton>
                <LinkButton to='/search-star-investor'>熱門明星投資者</LinkButton>
                <LinkButton to='/popular-post'>熱門文章</LinkButton>
                <LinkButton to='/inventory/subscribed-star-investor'>
                    我訂閱的明星投資者
                </LinkButton>
                <LinkButton to='/inventory/subscribed-post'>我訂閱的文章</LinkButton>
            </div>
            <div className={classes.rightSection}>
                <ButtonBase disableRipple component={Link} to={homePath}>
                    <LoadImage userid={userid} className={classes.headerUser} />
                </ButtonBase>
                <GeneralButton category='normal' onClick={handleOnClick}>
                    登出
                </GeneralButton>
            </div>
        </React.Fragment>
    );
};

export default HeaderContentType2;
