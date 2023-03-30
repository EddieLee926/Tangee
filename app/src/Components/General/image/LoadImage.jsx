//載入圖片(大頭貼為主，編輯器中的圖片還不太確定)
import getApi from '../../../Utils/Api/getApi';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import styles from './ImageStyle';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(styles);

const LoadImage = (props) => {
    const { userid, className } = props;
    const [imgURL, SetImgURL] = useState();
    const classes = useStyles();

    //到時候會用State替換
    const data = {
        relatedID: userid, //使用者的ID
        type: 1, //1預設為大頭貼(會依據功能頁面去給值)
    };
    const LoadPicture = async () => {
        try {
            const response = await getApi.post('/getData/getImg', data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        LoadPicture().then((result) => {
            console.log(result);
            SetImgURL(result);
        });
    }, []);

    const imageClasses = clsx({
        [classes.root]: true,
        [className]: className,
    });

    const ImageDiv = ({ imgURL }) => {
        return <img className={imageClasses} src={imgURL} />;
    };
    return (
        <>
            {imgURL ? (
                <ImageDiv key={imgURL} imgURL={imgURL} />
            ) : (
                <div>
                    <Avatar src="/broken-image.jpg" />
                </div>
            )}
        </>
    );
};
export default LoadImage;
