import React, { useEffect, useState } from 'react';
import PostBlock from '../../General/PostBlock/PostBlock';
import CircularProgress from '@material-ui/core/CircularProgress';
import Carousel from 'react-material-ui-carousel';
import { useTheme } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { getDataLogic } from '../../../Containers/PopularPost/PopularPostLogic';
import styles from './PostRankStytle';

const useStyles = makeStyles(styles);

const PostRank = () => {
    const [articles, setArticles] = useState();
    const classes = useStyles();
    const theme = useTheme();

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
        getDataLogic().then((result) => {
            const newArr = [];
            // set the carousel to apply 6 content
            while (result.data.length) newArr.push(result.data.splice(0, 6));
            setArticles(newArr);
        });
    }, []);

    return (
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
    );
};

export default PostRank;
