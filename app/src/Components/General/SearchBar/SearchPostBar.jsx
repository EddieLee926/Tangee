import React, { useState, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { getDataLogic } from './SearchBarLogic.js';
import PostBlock from '../PostBlock/PostBlock.jsx';
import { history } from '../../../Helper/history.js';
import styles from './SearchBarStyle';

const useStyles = makeStyles(styles);

const SearchPostBar = () => {
    const classes = useStyles();
    const [articles, setArticles] = useState();
    const [amount, setAmount] = useState();
    const [showText, setShowText] = useState(false);
    const resultRef = useRef();

    const clickHandle = (e) => {
        e.preventDefault();
        setShowText(true);
        const data = {
            title: amount,
        };
        if (amount) {
            setShowText(true);
            getDataLogic(data).then((result) => {
                const newArr = [];
                while (result.data.length) newArr.push(result.data.splice(0, 6));
                setArticles(newArr);
                history.push(`/popular-post#results`);
                scrollResult();
            });
        }
    };
    const eraseHandle = (e) => {
        e.preventDefault();
        setShowText(false);
        setAmount();
    };
    const handleChange = (event) => {
        setAmount(event.target.value);
    };
    const Result = () => (
        <div className={classes.result}>
            {articles ? (
                <React.Fragment>
                    <Typography variant='h1' align='center'>
                        搜尋結果
                    </Typography>
                    {articles.map((article, index) => (
                        <div key={index} className={classes.postWrapper}>
                            {article.map((a, ind) => (
                                <PostBlock article={a} key={ind} />
                            ))}
                        </div>
                    ))}
                </React.Fragment>
            ) : (
                <CircularProgress color='secondary' />
            )}
        </div>
    );

    const scrollResult = () => {
        if (resultRef) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <>
            <div className={classes.background}>
                <div className={classes.inputWrapper}>
                    <Typography
                        variant='h2'
                        align='center'
                        className={classes.searchTitle}
                    >
                        搜尋文章
                    </Typography>
                    <form className={classes.searchInput}>
                        {/* <FormControl className={classes.margin} variant='outlined'>
                    <InputLabel htmlFor='outlined-adornment-amount'>搜尋</InputLabel>
                    <OutlinedInput
                        id='outlined-adornment-amount'
                        value={amount ? amount.title : ''}
                        onChange={handleChange('amount')}
                        startAdornment={
                            <InputAdornment position='start'></InputAdornment>
                        }
                    />
                </FormControl> */}
                        <InputBase
                            placeholder='搜尋'
                            inputProps={{ 'aria-label': 'naked' }}
                            onChange={handleChange}
                            style={{ flexGrow: 1 }}
                        />
                        <IconButton
                            edge='end'
                            size='small'
                            onClick={clickHandle}
                            type='submit'
                        >
                            <SearchIcon />
                        </IconButton>
                    </form>
                </div>

                {/* <Button variant='contained' color='primary' onClick={clickHandle}>
                    搜尋
                </Button>
                <Button variant='contained' color='primary' onClick={eraseHandle}>
                    清除
                </Button> */}
            </div>
            <div ref={resultRef}>{showText ? <Result /> : null}</div>
        </>
    );
};

export default SearchPostBar;
