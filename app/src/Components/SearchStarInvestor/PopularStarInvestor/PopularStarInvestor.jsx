import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Carousel from 'react-material-ui-carousel';
import StarInvestorBlock from '../../General/StarInvestorBlock/StarInvestorBlock';
import { getDataLogic } from '../../../Containers/SearchStarInvestor/SearchStarInvestorLogic';
import styles from './PopularStarInvestorStyle';

const useStyles = makeStyles(styles);

const PopularStarInvestor = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [users, setUsers] = useState();
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
            // set the carousel to apply 3 content
            while (result.data.length) newArr.push(result.data.splice(0, 3));
            setUsers(newArr);
        });
    }, []);
    return (
        <div className={classes.root}>
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

export default PopularStarInvestor;
