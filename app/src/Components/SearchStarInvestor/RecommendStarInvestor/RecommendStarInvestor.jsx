import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme } from '@material-ui/styles';
import Carousel from 'react-material-ui-carousel';
import StarInvestorBlock from '../../General/StarInvestorBlock/StarInvestorBlock';
import PaperBlock from '../../General/PaperBlock/PaperBlock.jsx';
import { LinkButton } from '../../General/CustomButton/CustomButton.jsx';
import styles from './RecommendStarInvestorStyle';
import { getRecommendLogic } from '../../../Containers/SearchStarInvestor/SearchStarInvestorLogic';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(styles);

const RecommendStarInvestor = () => {
    const [users, setUsers] = useState();
    const { tag, isLogin } = useSelector(userSelector);
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
        //if (tag) {
        console.log(tag);
        getRecommendLogic(tag).then((result) => {
            const newArr = [];
            // set the carousel to apply 3 content
            while (result.data.length) newArr.push(result.data.splice(0, 3));
            setUsers(newArr);
        });
        //}
    }, []);

    if (!isLogin) {
        return (
            <div className={classes.root}>
                <div className={classes.description}></div>
                <div className={classes.fakeBlockWrapper}>
                    <PaperBlock className={classes.fakeBlock}></PaperBlock>
                    <PaperBlock className={classes.fakeBlock}></PaperBlock>
                    <PaperBlock className={classes.fakeBlock}></PaperBlock>
                </div>
                <div className={classes.notice}>
                    <Typography variant='h1'>尚未登入?</Typography>
                    <Typography variant='h2'>
                        立即登入為您推薦
                        <br />
                        最適合您的明星投資者
                    </Typography>
                    <LinkButton category='normal' to='/login'>
                        登入
                    </LinkButton>
                </div>
            </div>
        );
    }

    if (users && users.length === 0) {
        return <div>沒有相符的明星投資者</div>;
    }

    return (
        <div className={classes.root}>
            <div className={classes.description}>
                <Typography variant='h1' align='left'>
                    您的專屬推薦
                </Typography>
                <Typography variant='h3' align='left'>
                    依據您的風險偏好和產業族群喜好推薦給您這些投資高手
                </Typography>
            </div>
            {users ? (
                <Carousel {...carouselStyle}>
                    {users.map((user, index) => (
                        <div key={index} className={classes.carouselWrapper}>
                            {user.map((u) => (
                                <StarInvestorBlock user={u} key={u.nick_name} />
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

export default RecommendStarInvestor;
