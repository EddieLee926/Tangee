import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import contract from '@truffle/contract';
import { userSelector } from "../../../Reducer/User/UserSlice";
import { quorumNodesSelector } from "../../../Reducer/QuorumNodes/QuorumNodesSlice";
import ListeningUpdateSubscribeAmount from "../../../Utils/Listening/ListeningUpdateSubscribeAmount";
import PublicInvestmentDataSharingPlatform from '../../../contracts/PublicInvestmentDataSharingPlatform.json';

const UpdateSubscribeAmount = () => {
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
        publicInvestment ? ListeningUpdateSubscribeAmount(publicInvestment.address,web3) : getContract()
    }, [publicInvestment])

    const handleUpdateSubscribeAmount = e => {
        e.preventDefault();
        const subscribeAmount = e.target.subscribeAmount.value;

        publicInvestment.updateShareSecuritiesAccountSubscribeAmount(
            brokerId, securitiesAccount, subscribeAmount, { from: brokerIdAddress.toString() }
        ).then(result => {
            console.log(result)
        })
    }

    return (
        <React.Fragment>
            <h3>updateShareSecuritiesAccountSubscribeAmount 更新訂閱金額</h3>
            <p>確認是否為明星投資者證券帳戶，輸入券商ID和證券帳號，再輸入欲改變之訂閱金額</p>
            <form onSubmit={handleUpdateSubscribeAmount}>
                <input name="brokerId" value="C"/>
                <input name="securitiesAccount" value="1234567"/>
                <input name="subscribeAmount" />
                <button type="submit">submit</button>
            </form>
            <br></br>
        </React.Fragment>
    )
}

export default UpdateSubscribeAmount;