import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MostSubscribe from '../../Components/PopularPost/MostSubscribe/MostSubscribe.jsx';
import PostRank from '../../Components/PopularPost/PostRank/PostRank.jsx';
import RecommendPost from '../../Components/PopularPost/RecommendPost/RecommendPost';
import SearchPostBar from '../../Components/General/SearchBar/SearchPostBar';
import styles from './PopularPostStyle';

const useStyles = makeStyles(styles);

const PopularPost = () => {
    const classes = useStyles();
    return (
        <>
            <SearchPostBar />
            <MostSubscribe />
            <Typography variant='h1' className={classes.title}>
                熱門文章排行
            </Typography>
            <PostRank />
            <Typography variant='h1' className={classes.title}>
                專屬推薦文章
            </Typography>
            <RecommendPost />
        </>
    );
};

export default PopularPost;
