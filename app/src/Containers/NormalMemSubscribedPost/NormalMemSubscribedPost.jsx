import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import SubscribedPost from '../../Components/NormalMemSubscribedPost/SubscribedPost/SubscribedPost.jsx';
import RecommendPost from '../../Components/PopularPost/RecommendPost/RecommendPost';
import styles from '../PopularPost/PopularPostStyle';
import { makeStyles } from '@material-ui/core/styles';
import SubscribedStarPost from '../../Components/NormalMemSubscribedPost/SubscribedStarPost/SubscribedStarPost.js';


const useStyles = makeStyles(styles);
const NormalMemSubscribedPost = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <SubscribedStarPost />
            <Typography variant='h1' className={classes.title}>
                我訂閱的文章
            </Typography>
            <SubscribedPost />
            <Typography variant='h1' className={classes.title}>
                專屬推薦文章
            </Typography>
            <RecommendPost />
        </React.Fragment>
    )
};


export default NormalMemSubscribedPost;