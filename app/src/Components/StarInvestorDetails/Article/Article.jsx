import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import styles from './StarInvestorDetailsStyle';
// const useStyles = makeStyles(styles);
import getDataLogic from './Article.js';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PostBlock from '../../General/PostBlock/PostBlock.jsx';
import { makeStyles } from '@material-ui/core/styles';
import style from './ArticleStyle';

const useStyles = makeStyles(style);

const Article = ({ id }) => {
    const [articles, setArticles] = useState();
    const classes = useStyles();

    useEffect(() => {
        getDataLogic(id).then((result) => {
            const newArr = [];
            while (result.data.length) newArr.push(result.data.splice(0, 6));
            setArticles(newArr);
        });
    }, []);

    if (!articles) return <div>尚無文章</div>;

    return (
        <div className={classes.result}>
            {articles.map((article, index) => (
                <div key={index} className={classes.postWrapper}>
                    {article.map((a, ind) => (
                        <PostBlock article={a} key={ind} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Article;
