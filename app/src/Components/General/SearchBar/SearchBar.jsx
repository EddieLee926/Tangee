import React, { useState, useRef, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { getSearch } from './SearchBarLogic.js';
import StarInvestorBlock from '../StarInvestorBlock/StarInvestorBlock';
import { history } from '../../../Helper/history.js';
import styles from './SearchBarStyle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import getHintLogic from './SearchBarHintLogic.js';

const useStyles = makeStyles(styles);

const Searchbar = () => {
    const classes = useStyles();
    const [amount, setAmount] = useState();
    const [showText, setShowText] = useState(false);
    const [users, setUsers] = useState();
    const resultRef = useRef();
    /*const [hints, setHints] = useState();

    useEffect(() => {
        getHintLogic().then((result) => {
            setHints(result);
        });
    }, []);*/

    const clickHandle = (e) => {
        e.preventDefault();
        const data = {
            title: amount,
        };
        if (amount) {
            setShowText(true);
            getSearch(data).then((result) => {
                const newArr = [];
                while (result.data.length) newArr.push(result.data.splice(0, 3));
                setUsers(newArr);
                history.push(`/search-star-investor#results`);
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
        <div>
            {users ? (
                <div className={classes.root}>
                    <Typography variant='h1' align='center'>
                        搜尋結果
                    </Typography>
                    {users.map((user, index) => (
                        <div key={index} className={classes.wrapper}>
                            {user.map((u) => (
                                <StarInvestorBlock user={u} key={u.nick_name} />
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <CircularProgress color='secondary' />
            )}
        </div>
    );

    // scrollIntoView does not support safari
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
                        搜尋明星投資者
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

export default Searchbar;

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
];

/*
<Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            //options={top100Films.map((option) => option.title)}
                            // top100Films title
                            options={(option) => option.tag_name}
                            renderInput={(params) => (
                                <TextField {...params} label="搜尋" margin="normal" variant="outlined"
                                    //inputProps={{ 'aria-label': 'naked' }}
                                    onChange={handleChange}
                                    style={{ flexGrow: 1 }}
                                />

                                <InputBase {...params}
                                    placeholder='搜尋'
                                    inputProps={{ 'aria-label': 'naked' }}
                                    onChange={handleChange}
                                    style={{ flexGrow: 1 }}
                                />
                                )}
                                />

*/