import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import contract from '@truffle/contract';
import { userSelector } from "../../../Reducer/User/UserSlice";
import { quorumNodesSelector } from "../../../Reducer/QuorumNodes/QuorumNodesSlice";
import PublicInvestmentDataSharingPlatform from '../../../contracts/PublicInvestmentDataSharingPlatform.json';

const RegisterSecurityAccount = () => {

    const [publicInvestment, setPublicInvestment] = useState('');
    const { brokerId, securitiesAccount } = useSelector(userSelector);
    const { institutionAddress, currentProvider, brokerIdAddress } = useSelector(quorumNodesSelector);

    useEffect(() => {

        const getContract = async () => {
            const MyContract = contract(PublicInvestmentDataSharingPlatform);
            MyContract.setProvider(currentProvider);
            const MyContractInstance = await MyContract.deployed();
            setPublicInvestment(MyContractInstance)
            
        }
        getContract()
    }, [])

    const handleRegister = e => {
        e.preventDefault();
        publicInvestment.registerBrokerIdSecuritiesAccountAddress(
            brokerId, securitiesAccount, brokerIdAddress, { from: institutionAddress.toString() }
        ).then(result => {
            console.log(result)
        })
    }
    return (
        <React.Fragment>
            <h3>註冊乙太坊帳戶</h3>
            <p>contract address: {publicInvestment.address}</p>
            <p>registerBrokerIdSecuritiesAccountAddress</p>
            <p>由於有msg.sender的緣故一定要用deploy這個合約的帳號才能進行交易</p>
            <form onSubmit={handleRegister}>
                <input name="brokerId" value="C"/>
                <input name="securitiesAccount" value="1234567"/>
                <input name="brokerIdAddress" value="0x88980aDc96b74b74603D236B42fBD4293E2ea7A5"/>
                <button type="submit">submit</button>
            </form>
        </React.Fragment>
    )
}

export default RegisterSecurityAccount;