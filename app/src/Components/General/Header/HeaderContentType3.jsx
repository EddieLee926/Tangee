import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import styles from './HeaderStyle';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../../Reducer/User/UserSlice.js';
import NotifyStockData from '../NotifyStockData/NotifyStockData.js';
const useStyles = makeStyles(styles);

const HeaderContentType3 = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const handleOnClick = () => {
        localStorage.clear();
        dispatch(userLogout());

    };
    return (
        <div className={classes.linkWrap}>
            <NotifyStockData />
            <div>
                <Button color='inherit' component={Link} to={`/star/management`}>
                    我的訂閱者
                </Button>
                <Button color='inherit' component={Link} to='/star/post'>
                    我的文章
                </Button>
            </div>
            <div>
                <Button color='inherit' component={Link} to='/inventory/receipt'>
                    庫存明細
                </Button>
                <Button color='inherit' component={Link} to='/subscribed-composition'>
                    我的投資組合
                </Button>
                <Button color='inherit' component={Link} to='/star/home'>
                    個人資料
                </Button>
                <Button variant='outlined' color='inherit'>
                    聯繫
                </Button>
                <Button type='normal' onClick={handleOnClick} >登出</Button>
            </div>
        </div>
    );
};

export default HeaderContentType3;
