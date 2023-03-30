import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAccountAddress } from '../Reducer/Accounts/AccountsSlice';

const selectAccount = state => state.accounts.accountAddress;

const CurrentAccount = () =>{

    const accounts = useSelector(selectAccount);
    const dispatch = useDispatch();

    useEffect(()=>{
        //update the account when users change the account
        dispatch(getAccountAddress())
        window.ethereum.on("accountsChanged", () => {
            dispatch(getAccountAddress())
        });
    },[])

    return(
        <React.Fragment>
            <h1>Current Accounts:</h1>
            <span>{accounts}</span>
        </React.Fragment>
    )
    
}

export default CurrentAccount;
