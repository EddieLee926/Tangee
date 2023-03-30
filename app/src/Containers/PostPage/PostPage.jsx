import React from 'react';
import Divider from '@material-ui/core/Divider';
import PostContent from '../../Components/PostPage/PostContent/PostContent';
import PostCounter from '../../Components/PostPage/PostCounter/PostCounter';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ShowPostTag from '../../Components/General/Tag/ShowPostTag';
import styles from './PostPageStyle';
const useStyles = makeStyles(styles);

const PostPage = () => {
    const classes = useStyles();
    let { PostId } = useParams();
    return (
        <div className={classes.root}>
            <PostContent key={PostId} postId={PostId} />
            <Divider className={classes.divider} />
            <ShowPostTag key={'showTag' + PostId} id={PostId} />
            <PostCounter />
        </div>
    );
};

export default PostPage;
