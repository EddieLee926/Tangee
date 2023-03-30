import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import styles from './RecommendPostBlockStyle';

const useStyle = makeStyles(styles);

const RecommendPostBlock = ({ article }) => {
    const classes = useStyle();
    const postImageURL = {
        '--background-image': `url('${article.post_url}')`,
    };
    const userImageURL = {
        '--background-image': `url('${article.user_url}')`,
    };
    const path = '/post-page/' + article.post_id;
    return (
        <div className={classes.root}>
            <ButtonBase
                disableRipple
                component={Link}
                to={path}
                className={classes.buttonBlock}
            >
                <div className={classes.image} style={postImageURL}>
                    <div className={classes.content}>
                        <div className={classes.title}>
                            <Typography variant='h2'>{article.title}</Typography>
                        </div>
                        <div className={classes.headline}>
                            <div className={classes.headimage} style={userImageURL}></div>
                            <Typography variant='h3' className={classes.headname}>
                                {article.nick_name}
                            </Typography>
                            <Typography variant='body1' className={classes.time}>
                                {article.updateTime}
                            </Typography>
                        </div>
                    </div>
                </div>
            </ButtonBase>
        </div>
    );
};

export default RecommendPostBlock;
