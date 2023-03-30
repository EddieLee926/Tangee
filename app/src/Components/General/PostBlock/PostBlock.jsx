import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import styles from './PostBlockStyle';

const useStyle = makeStyles(styles);

const PostBlock = ({ article }) => {
    const classes = useStyle();
    const postImageURL = {
        '--background-image': `url('${article.post_url}')`,
    };
    const userImageURL = {
        '--background-image': `url('${article.user_url}')`,
    };
    const path = '/post-page/' + article.post_id;

    const titleTimeClasses = clsx({
        [classes.titleTime]: article.nick_name ? false : true,
    });
    return (
        <div className={classes.root}>
            <ButtonBase
                disableRipple
                component={Link}
                to={path}
                className={classes.buttonBlock}
            >
                <div className={classes.image} style={postImageURL}></div>
                <div className={classes.content}>
                    {article.nick_name ? (
                        <div className={classes.headline}>
                            <div className={classes.headimage} style={userImageURL}></div>
                            <Typography variant='h3' className={classes.headname}>
                                {article.nick_name}
                            </Typography>
                        </div>
                    ) : (
                        <div className={titleTimeClasses}>
                            <AccessTimeRoundedIcon />
                            <span className={classes.updateTime}>
                                {article.updateTime}
                            </span>
                        </div>
                    )}
                    <div className={classes.title}>
                        <Typography variant='h2'>{article.title}</Typography>
                    </div>
                    <div className={classes.description}>
                        <Typography variant='body1'></Typography>
                    </div>

                    <div className={classes.time}>
                        <div>觀看數:{article.views}</div>
                        {article.nick_name && (
                            <div>
                                <AccessTimeRoundedIcon />
                                <span className={classes.updateTime}>
                                    {article.updateTime}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </ButtonBase>
        </div>
    );
};

export default PostBlock;
