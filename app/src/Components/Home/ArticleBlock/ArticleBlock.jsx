import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import getApi from '../../../Utils/Api/getApi';
import styles from './ArticleBlockStyle';
const useStyles = makeStyles(styles);

const ArticleBlock = () => {
    const classes = useStyles();
    const [chipData, setChipData] = useState();
    useEffect(() => {
        const getSelectItem = async () => {
            const response = await getApi.post('/tag');
            setChipData(response.data);
        };
        getSelectItem();
    }, []);
    return (
        <div className={classes.root}>
            <div className={classes.leftSection}>
                <div className={classes.boxText}>
                    <Typography variant='h2' align='center'></Typography>
                </div>
                <div className={classes.boxContent}>
                    <List>
                        {chipData &&
                            chipData.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={item.explanation} />
                                </ListItem>
                            ))}
                    </List>
                </div>
            </div>
            <div className={classes.rightSection}>
                <Typography variant='h2' align='center'>
                    標籤化選擇想關注的台股產業!
                </Typography>
                <Typography variant='body1' align='center'>
                    相信大家都有自己喜歡或是擅長的領域，而在股市中也不例外，一定會有自己比較喜歡的產業類別和特別熟悉的族群。因此，我們分門別類整理出台股中25種不同的標籤，讓大家可以根據自己的喜好來選擇，並且我們會根據選擇的標籤來推薦您相關的明星投資者和文章
                </Typography>
            </div>
        </div>
    );
};

export default ArticleBlock;
