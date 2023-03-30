import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import contract from '@truffle/contract';
import PublicInvestmentDataSharingPlatform from '../contracts/PublicInvestmentDataSharingPlatform.json';

const selectAccount = state => state.accounts.accountAddress;

const PublicInvestmentContract = () => {
    const [publicInvestment, setPublicInvestment] = useState('');
    const accounts = useSelector(selectAccount);

    useEffect(() => {

        const getContract = async () => {
            const MyContract = contract(PublicInvestmentDataSharingPlatform);
            MyContract.setProvider(window.web3.currentProvider);
            const MyContractInstance = await MyContract.deployed();
            setPublicInvestment(MyContractInstance)
        }
        getContract();
    }, [])

    const handleRegister = e => {
        e.preventDefault();
        const brokerId = e.target.brokerId.value;
        const securitiesAccount = e.target.securitiesAccount.value;
        const brokerIdAddress = e.target.brokerIdAddress.value;

        publicInvestment.registerBrokerIdSecuritiesAccountAddress(
            brokerId, securitiesAccount, brokerIdAddress, { from: accounts.toString() }
        ).then(result => {
            console.log(result)
        })
    }
    return (
        <React.Fragment>
            <h1>PublicInvestmentDataSharingPlatform</h1>
            <p>contract address: {publicInvestment.address}</p>
            <p>registerBrokerIdSecuritiesAccountAddress</p>
            <p>由於有msg.sender的緣故一定要用deploy這個合約的帳號才能進行交易</p>
            <form onSubmit={handleRegister}>
                <input name="brokerId" />
                <input name="securitiesAccount" />
                <input name="brokerIdAddress" />
                <button type="submit">submit</button>
            </form>
        </React.Fragment>
    )
}

export default PublicInvestmentContract;
