
// import { makeStyles } from '@material-ui/core/styles';
// import styles from './NormalMemSubscribedPostStyle';
// const useStyles = makeStyles(styles);
import React, { useState, useEffect } from 'react';
import getDataLogic from './SubscribedPost.js';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import PostRank from '../../PopularPost/PostRank/PostRank.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostBlock from '../../General/PostBlock/PostBlock';
import Carousel from 'react-material-ui-carousel';
import { useTheme } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import styles from './SubscribedPostStyle';
const useStyles = makeStyles(styles);
const SubscribedPost = () => {
        const { userid } = useSelector(userSelector);
        const [articles, setArticles] = useState()
        const theme = useTheme();
        const classes = useStyles();
        const carouselStyle = {
                animation: 'slide',
                interval: 5000,
                navButtonsProps: {
                        style: { backgroundColor: theme.palette.primaryOrange.main, color: 'black' },
                },
                indicatorIconButtonProps: { style: { color: theme.palette.lightOrange.main } },
                activeIndicatorIconButtonProps: {
                        style: { color: theme.palette.primaryOrange.main },
                },
                autoPlay: false,
                className: classes.carousel,
        };


        useEffect(() => {
                getDataLogic(userid).then(result => {
                        console.log(result.data)
                        if (result.data.length != 0)
                                setArticles([result.data])
                })
        }, []);


        return <>



                <div className={classes.root}>
                        {articles ? (
                                <Carousel {...carouselStyle}>
                                        {articles.map((article, index) => (
                                                <div key={index} className={classes.carouselWrapper}>
                                                        {article.map((a) => (
                                                                <PostBlock key={a.post_id} article={a} />
                                                        ))}
                                                </div>
                                        ))}
                                </Carousel>
                        ) : (
                                <div>
                                        <CircularProgress color='secondary' />
                                </div>
                        )}
                </div>
        </>;

};

export default SubscribedPost;