import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import { getSubscribedStarPost } from './SubscribedStarPostLogic';
import styles from './SubscribedStarPostStyle';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(styles);

const SubscribedStarPost = () => {
    const [starImg, setStarImg] = useState();
    const classes = useStyles();
    const { userid } = useSelector(userSelector);
    const userImageURL = (url) => {
        return { '--background-image': `url('${url}')` };
    };

    useEffect(() => {
        var data = { userid: userid }
        getSubscribedStarPost(data).then((result) => {
            setStarImg(result.data);
        });
    }, []);

    if (!starImg) {
        return <div />;
    }

    return (
        <div className={classes.root}>
            <Typography variant='h2'>My Subscribed</Typography>
            <div className={classes.avatarWrapper}>
                {starImg.map((item, index) => (
                    <ButtonBase
                        disableRipple
                        component={Link}
                        to={"/star-investor-details/" + item.subs_star_id}
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

export default SubscribedStarPost;
