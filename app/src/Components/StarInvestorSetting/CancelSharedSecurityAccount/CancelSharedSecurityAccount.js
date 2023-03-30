import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import contract from '@truffle/contract';
import { userSelector } from "../../../Reducer/User/UserSlice";
import { quorumNodesSelector } from "../../../Reducer/QuorumNodes/QuorumNodesSlice";
import ListeningCancelShareAccount from "../../../Utils/Listening/ListeningCancelShareAccount";
import PublicInvestmentDataSharingPlatform from '../../../contracts/PublicInvestmentDataSharingPlatform.json';

const CancelSharedSecurityAccount = () => {
    const [publicInvestment, setPublicInvestment] = useState('');
    const { brokerId, securitiesAccount } = useSelector(userSelector);
    const { currentProvider, brokerIdAddress, web3 } = useSelector(quorumNodesSelector);

    useEffect(() => {

        const getContract = async () => {
            const MyContract = contract(PublicInvestmentDataSharingPlatform);
            MyContract.setProvider(currentProvider);
            const MyContractInstance = await MyContract.deployed();
            setPublicInvestment(MyContractInstance)
        }
        publicInvestment ? ListeningCancelShareAccount(publicInvestment.address,web3) : getContract()
    }, [publicInvestment])

    const handleCancelSharedAccount = e => {
        e.preventDefault();
        
        publicInvestment.cancelShareSecuritiesAccount(
            brokerId, securitiesAccount, { from: brokerIdAddress.toString() }
        ).then(result => {
            console.log(result)
        })
    }

    return (
        <React.Fragment>
            <h3>cancelShareSecuritiesAccount 取消分享證券帳號</h3>
            <p>確認是否為以分享之明星投資者證券帳戶，輸入券商ID和證券帳號</p>
            <form onSubmit={handleCancelSharedAccount}>
                <input name="brokerId" value="C"/>
                <input name="securitiesAccount" value="1234567"/>
                <button type="submit">submit</button>
            </form>
            <br></br>
        </React.Fragment>
    )
}

export default CancelSharedSecurityAccount;