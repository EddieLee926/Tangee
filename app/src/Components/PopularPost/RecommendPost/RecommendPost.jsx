import React, { useEffect, useState } from 'react';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import RecommendPostBlock from '../../General/RecommendPostBlock/RecommendPostBlock';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-material-ui-carousel';
import { useTheme } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { LinkButton } from '../../General/CustomButton/CustomButton.jsx';
import PaperBlock from '../../General/PaperBlock/PaperBlock';
import { getRecommend } from '../../../Containers/PopularPost/PopularPostLogic';
import styles from './RecommendPostStyle';

const useStyles = makeStyles(styles);

const RecommendPost = () => {
    const [articles, setArticles] = useState();
    const { tag, isLogin } = useSelector(userSelector);
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
        if (tag) {
            getRecommend(tag).then((result) => {
                const newArr = [];
                // set the carousel to apply 6 content
                while (result.data.length) newArr.push(result.data.splice(0, 3));
                setArticles(newArr);
            });
        }
    }, []);

    if (!isLogin) {
        return (
            <div className={classes.fakeRoot}>
                <div className={classes.carouselWrapper}>
                    {[1, 2, 3].map((item) => (
                        <PaperBlock className={classes.image} key={item}>
                            <div className={classes.content}></div>
                        </PaperBlock>
                    ))}
                </div>
                <div className={classes.description}>
                    <Typography variant='h1'>尚未登入?</Typography>
                    <Typography variant='h2'>
                        立即登入為您推薦
                        <br />
                        最適合您閱讀的文章
                    </Typography>
                    <LinkButton category='normal' to='/login'>
                        登入
                    </LinkButton>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            {articles ? (
                <Carousel {...carouselStyle}>
                    {articles.map((article, index) => (
                        <div key={index} className={classes.carouselWrapper}>
                            {article.map((a) => (
                                <RecommendPostBlock key={a.post_id} article={a} />
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

export default RecommendPost;
