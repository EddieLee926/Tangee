import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import { getFullSubs } from '../../../Containers/PopularPost/PopularPostLogic';
import styles from './MostSubscribeStyle';

const useStyles = makeStyles(styles);

const MostSubscribe = () => {
    const [starImg, setStarImg] = useState();
    const classes = useStyles();

    const userImageURL = (url) => {
        return { '--background-image': `url('${url}')` };
    };

    useEffect(() => {
        getFullSubs().then((result) => {
            console.log(result.data);
            setStarImg(result.data);
        });
    }, []);

    if (!starImg) {
        return <div />;
    }

    return (
        <div className={classes.root}>
            <Typography variant='h2'>Most Subscribed</Typography>
            <div className={classes.avatarWrapper}>
                {starImg.map((item, index) => (
                    <ButtonBase
                        disableRipple
                        component={Link}
                        to={item.StarHref}
                        key={index}
                    >
                        <div>
                            <div
                                style={userImageURL(item.imgUrl)}
                                className={classes.avatar}
                            />
                            <Typography variant='h3' align='center'>
                                {item.nick_name}
                            </Typography>
                        </div>
                    </ButtonBase>
                ))}
            </div>
        </div>
    );
};

export default MostSubscribe;
