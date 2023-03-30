import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import { GetSubscribedAmountLogic, SetSubscribedAmountLogic } from './SetSubscribedAmountLogic.js';
import Button from '@material-ui/core/Button';
import { GeneralButton } from '../../General/CustomButton/CustomButton.jsx';
//const SetSubscribedAmountLogic = require('./SetSubscribedAmountLogic.js');


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    }
}));

const SetSubscribedAmount = props => {
    const { userid } = props;
    const classes = useStyles();
    const [amount, setAmount] = useState()
    useEffect(() => {
        GetSubscribedAmountLogic(userid).then(result => {
            setAmount(result.data)
            console.log("amount", result.data)
        })
    }, []);

    const clickHandle = () => {
        var data = {
            userid: userid,
            amount: amount
        }
        if (window.confirm("是否確定修改訂閱金額?")) {
            SetSubscribedAmountLogic(data).then(result => {
                alert(result.data)
            })
        }
    };

    const handleChange = (prop) => (event) => {
        setAmount(event.target.value)
    };
    return <>
        <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">訂閱費用</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                value={amount ?
                    amount.sub_price
                    : ""}
                onChange={handleChange('amount')}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                labelWidth={5}
            />
        </FormControl>
        {/* <Button variant="contained" color="primary" onClick={clickHandle}>
            修改訂閱費用
        </Button> */}
        <GeneralButton onClick={clickHandle} category='normal'>
            確定修改
        </GeneralButton>
    </>;
};


export default SetSubscribedAmount;