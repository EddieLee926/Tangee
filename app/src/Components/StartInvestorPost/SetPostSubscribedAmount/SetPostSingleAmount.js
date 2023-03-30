import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import { SetPostSingleAmountLogic, GetPostSingleAmountLogic } from './SetPostSubscribedAmountLogic.js';
import Button from '@material-ui/core/Button';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import { LinkButton } from '../../General/CustomButton/CustomButton.jsx';
//const SetSubscribedAmountLogic = require('./SetSubscribedAmountLogic.js');


const useStyles = makeStyles((theme) => ({
        margin: {
                margin: theme.spacing(1),
        }
}));

const SetPostSingleAmount = props => {
        const { userid } = useSelector(userSelector);
        const classes = useStyles();
        const [amount, setAmount] = useState()
        const { id } = props;
        console.log(id, "postiddd")
        useEffect(() => {
                GetPostSingleAmountLogic(id).then(result => {
                        setAmount(result.data)
                        console.log("Articleamount", result.data)
                })
        }, []);

        const clickHandle = () => {
                var data = {
                        id: id,
                        amount: amount
                }
                console.log(data)
                if (window.confirm("是否確定修改單篇文章訂閱金額?")) {
                        SetPostSingleAmountLogic(data).then(result => {
                                alert(result.data)
                        })
                }

        };

        const handleChange = (prop) => (event) => {
                setAmount(event.target.value)
        };
        return <>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">單篇訂閱費用</InputLabel>
                        <OutlinedInput
                                id="outlined-adornment-amount"
                                value={amount ?
                                        amount.price
                                        : ""}
                                onChange={handleChange('amount')}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                labelWidth={5}
                        />
                </FormControl>
                <LinkButton category='normal' onClick={clickHandle}> 修改單篇文章訂閱費用</LinkButton>
                {/* <Button variant="contained" color="primary" onClick={clickHandle}>
            修改文章訂閱費用
        </Button> */}
        </>;
};


export default SetPostSingleAmount;