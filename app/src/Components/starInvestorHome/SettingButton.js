import React, { useEffect, useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const SettingButton = () => {
    return (
        <>
            <h3>明星投資者個人資料頁面</h3>
            <div></div>
            <Button
                variant='contained'
                color='inherant'
                component={Link}
                to='/star/management'
            >
                管理我的帳號
            </Button>
            <Button variant='contained' color='inherant' component={Link} to='/star/post'>
                管理我的文章
            </Button>
        </>
    );
};

export default SettingButton;
