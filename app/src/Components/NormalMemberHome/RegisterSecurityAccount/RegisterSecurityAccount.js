import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { RegisterSecurityAccountLogic, } from './RegisterSecurityAccountLogic.js';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';


const RegisterSecurityAccount = () => {
    const { userid, brokerId, securitiesAccount } = useSelector(userSelector);

    useEffect(() => {
        // GetPostSettingButtonLogic(userid).then(result => {
        //     setSharePost(result.data.sharePost)
        //     console.log("是否有分享", result.data.sharePost)
        // })
    }, []);

    const clickHandle = () => {
        if (window.confirm("是否確定註冊以太坊帳戶?")) {
            var data = {
                userid: userid,
                brokerId: brokerId,
                securitiesAccount: securitiesAccount
            }
            RegisterSecurityAccountLogic(data).then(result => {
                // setSharePost(modsharePost)
                // alert(result.data)
                console.log(result.data)
            })
        }

    };

    return <>
        {/* {sharePost ? sharePost == "False" ? <Button variant="contained" color="inherant" onClick={clickHandle} >開啟文章吃到飽</Button> :
            <Button variant="contained" color="inherant" onClick={clickHandle} >取消文章吃到飽</Button>
            : <LinearProgress />
        } */}
        <Button variant="contained" color="inherant" onClick={clickHandle} >註冊以太坊帳戶</Button>

    </>;
};


export default RegisterSecurityAccount;