import React, { useEffect, useState } from 'react';
import { GeneralButton } from '../../General/CustomButton/CustomButton.jsx';
import {
    GetPostSettingButtonLogic,
    UpdateSettingButtonLogic,
} from './PostSettingButtonLogic.js';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

//這個頁面會根據明星投資者是否有開啟吃到飽去動態呈現
const PostSettingButton = () => {
    const { userid } = useSelector(userSelector);
    const [sharePost, setSharePost] = useState();
    useEffect(() => {
        GetPostSettingButtonLogic(userid).then((result) => {
            setSharePost(result.data.sharePost);
            console.log('是否有分享', result.data.sharePost);
        });
    }, []);

    const clickHandle = () => {
        var modsharePost = 'False';
        if (sharePost == 'True') {
            if (window.confirm('是否確定關閉文章訂閱模式?')) {
                modsharePost = 'False';
            }
        } else {
            if (window.confirm('是否確定開啟文章訂閱模式?')) {
                modsharePost = 'True';
            }
        }
        var data = {
            userid: userid,
            sharePost: modsharePost,
        };
        UpdateSettingButtonLogic(data).then((result) => {
            setSharePost(modsharePost);
            alert(result.data);
        });
    };

    return (
        <>
            {sharePost ? (
                sharePost == 'False' ? (
                    <GeneralButton category='normal' onClick={clickHandle}>
                        開啟文章吃到飽
                    </GeneralButton>
                ) : (
                    <GeneralButton category='outline' onClick={clickHandle}>
                        取消文章吃到飽
                    </GeneralButton>
                )
            ) : (
                <LinearProgress />
            )}
            {/* {sharePost ? sharePost == "False" ? <h3>目前為關閉文章訂閱模式</h3> : <h3>目前為開啟文章訂閱模式</h3>
            : <LinearProgress />
        }
        <Button variant="contained" color="inherant" onClick={clickHandle} >修改文章分享模式</Button> */}
        </>
    );
};

export default PostSettingButton;
