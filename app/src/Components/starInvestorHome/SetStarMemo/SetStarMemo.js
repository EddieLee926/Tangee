import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { SetStarMemoLogic, GetStarMemoLogic } from './SetStarMemoLogic.js';
import { GeneralButton, LinkButton } from '../../General/CustomButton/CustomButton.jsx';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    root: {
        "& .MuiFilledInput-root": {
            background: `${theme.palette.primaryOrange.main}`
        }
    }
}));

const SetStarMemo = (props) => {
    const { userid } = props;
    //const classes = useStyles();
    const [memo, setMemo] = useState();
    useEffect(() => {
        GetStarMemoLogic(userid).then((result) => {
            setMemo(result.data.memo);
            console.log('memo', result.data.memo);
        });
    }, []);
    const classes = useStyles();


    const clickHandle = () => {
        var data = {
            userid: userid,
            memo: memo,
        };
        if (window.confirm('是否確定修改Memo?')) {
            SetStarMemoLogic(data).then((result) => {
                alert(result.data);
            });
        }
    };

    const handleChange = (prop) => (event) => {
        setMemo(event.target.value);
    };
    return (
        <>
            <TextField
                id='filled-multiline-static'
                label='想說的話'
                multiline
                rows={4}
                value={memo ? memo : ''}
                onChange={handleChange()}
                variant='filled'
                className={classes.root}
                fullWidth
            />
            {/* <Button variant='contained' color='primary' onClick={clickHandle}>
                修改想說的話
            </Button> */}
            <GeneralButton onClick={clickHandle} category='normal'>
                修改想說的話
            </GeneralButton>
        </>
    );
};

export default SetStarMemo;
