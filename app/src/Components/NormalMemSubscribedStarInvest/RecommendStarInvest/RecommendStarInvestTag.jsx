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
import styles from './RecommendStarInvestTagStyle';
import { getRecommendLogic } from './RecommendStarInvestTagLogic';
import { Typography } from '@material-ui/core';
import SubscribedStarInvestorBlock from '../../General/SubscribedStarInvestorBlock/SubscribedStarInvestorBlock';
const useStyles = makeStyles(styles);

const RecommendStarInvestTag = () => {
    const [starTag1, setStarsTag1] = useState();
    const [starTag2, setStarsTag2] = useState();
    const [starTag3, setStarsTag3] = useState();
    const { tag, tag_chinese, userid } = useSelector(userSelector);
    const tagArr = tag.split(',')
    tagArr.shift();
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
        console.log(tag)
        var data = {
            userid: userid,
            tag: tag
        }
        getRecommendLogic(data).then((result) => {
            console.log("結果", result.data)
            const starArr = result.data;
            var arr1 = []
            var arr2 = []
            var arr3 = []
            starArr.forEach(element => {
                console.log(element.tag)
                if (element.tagNumber.indexOf(',' + tagArr[0] + ',') != -1) {
                    //最多只會有兩個
                    if (arr1.length < 2) {
                        arr1.push(element)
                    }
                } if (element.tagNumber.indexOf(',' + tagArr[1] + ',') != -1) {
                    if (arr2.length < 2) {
                        arr2.push(element)
                    }

                } if (element.tagNumber.indexOf(',' + tagArr[2] + ',') != -1) {
                    if (arr3.length < 2) {
                        arr3.push(element)
                    }

                }
            });
            //為了能帶值進去SubscribedStarInvestorBlock，需在外面加一層[]
            if (arr1.length != 0)
                setStarsTag1([arr1])
            if (arr2.length != 0)
                setStarsTag2([arr2])
            if (arr3.length != 0)
                setStarsTag3([arr3])

        });

    }, []);
    console.log("3", starTag3)



    return (
        <>
            <Typography variant='h1'>{tag_chinese[0]}</Typography>
            {
                starTag1 ? <div className={classes.root}>
                    {starTag1.map((tag1, index) => (
                        <div key={index} className={classes.wrapper}>
                            {tag1.map((u) => (
                                <SubscribedStarInvestorBlock user={u} key={u.nick_name} />
                            ))}
                        </div>
                    ))}
                </div> : tag_chinese[0] ? <div>目前沒有相符合的明星投資者呦</div> : ''
            }
            <Typography variant='h1'>{tag_chinese[1]}</Typography>
            {
                starTag2 ? <div className={classes.root}>
                    {starTag2.map((tag1, index) => (
                        <div key={index} className={classes.wrapper}>
                            {tag1.map((u) => (
                                <SubscribedStarInvestorBlock user={u} key={u.nick_name} />
                            ))}
                        </div>
                    ))}
                </div> : tag_chinese[1] ? <div>目前沒有相符合的明星投資者呦</div> : ''
            }
            <Typography variant='h1'>{tag_chinese[2]}</Typography>
            {
                starTag3 ? <div className={classes.root}>
                    {starTag3.map((tag3, index) => (
                        <div key={index} className={classes.wrapper}>
                            {tag3.map((u) => (
                                <SubscribedStarInvestorBlock user={u} key={u.nick_name} />
                            ))}
                        </div>
                    ))}
                </div> : tag_chinese[2] ? <div>目前沒有相符合的明星投資者呦</div> : ''
            }
        </>
    );
};

export default RecommendStarInvestTag;
