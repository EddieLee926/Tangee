import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';
import { getDataLogic as getStar } from '../../../Containers/SearchStarInvestor/SearchStarInvestorLogic';
import { getDataLogic } from '../../../Containers/PopularPost/PopularPostLogic';
import styles from './StarInvestorBlockStyle';
const useStyles = makeStyles(styles);

const StarInvestorBlock = () => {
    const classes = useStyles();
    const [articles, setArticles] = useState();
    const [users, setUsers] = useState();
    useEffect(() => {
        getDataLogic().then((result) => {
            console.log(result);
            setArticles(result.data);
        });
        getStar().then((result) => {
            console.log(result);
            setUsers(result.data);
        });
    }, []);
    return (
        <div className={classes.root}>
            <div className={classes.upperSection}>
                <div className={classes.text}>
                    <div className={classes.icon}>
                        <StarIcon fontSize='medium' />
                    </div>
                    <Typography variant='h1' align='center'>
                        明星投資者帶領大家一起征戰股海!
                    </Typography>
                    <Typography variant='body1' align='center'>
                        如同傑西·李佛摩所說「Markets Are Never Wrong. Opinions Often Are.」
                        我們必須謙虛且不斷的向市場學習，在遇到股海雜亂的資訊和消息時，我們常無法有一套完整的思考路徑來判斷事實的真假，這是因為我們都還不夠有經驗，而經驗的累積除了直接實戰從市場中學習，我們更可以花費更少的時間和金錢來向這些股海老手們學習!
                    </Typography>
                </div>
            </div>
            <div className={classes.lowerSection}>
                <div className={classes.box}>
                    <div className={classes.boxText}>
                        <Typography variant='h2' align='center'>
                            明星投資者
                        </Typography>
                    </div>
                    <div className={classes.boxContent}>
                        <List>
                            {users &&
                                users.map((user, index) => (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar
                                                src={user.url}
                                                imgProps={{ style: { height: 'unset' } }}
                                            ></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={user.nick_name} />
                                    </ListItem>
                                ))}
                        </List>
                    </div>
                </div>
                <div className={classes.box}>
                    <div className={classes.boxText}>
                        <Typography variant='h2' align='center'>
                            熱門文章
                        </Typography>
                    </div>
                    <div className={classes.boxContent}>
                        <List>
                            {articles &&
                                articles.map((article, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={article.title}
                                            secondary={`作者:${article.nick_name}`}
                                        />
                                    </ListItem>
                                ))}
                        </List>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StarInvestorBlock;
