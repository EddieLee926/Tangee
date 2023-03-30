import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import contract from '@truffle/contract';
import { userSelector } from "../../../Reducer/User/UserSlice";
import { quorumNodesSelector } from "../../../Reducer/QuorumNodes/QuorumNodesSlice";
import PublicInvestmentDataSharingPlatform from '../../../contracts/PublicInvestmentDataSharingPlatform.json';
import ListeningShareAccount from '../../../Utils/Listening/ListeningShareAccount.js';
const abiDecoder = require('abi-decoder');

const SharedSecurityAccount = () => {
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
        const getSubscribeAmount = () =>{
            // get struct value
            publicInvestment.getAccountProperty("C", "1234567").then((value)=>{
                //const current_value = value.words[0]
                console.log(value)
            })

            //get params in specifif transaction
            let transaction = "0x2a7f9e94d47832cf1de970eabc6fd2e0cd58daf26d24a7c48ec9ce315588a41c"
            web3.eth.getTransaction(transaction, function(err, tx){
                abiDecoder.addABI(PublicInvestmentDataSharingPlatform.abi);
                let tx_data = tx.input;
                let decoded_data = abiDecoder.decodeMethod(tx_data);
                let params = decoded_data.params;
                console.log(params);
            });
        }
        if (publicInvestment){
            ListeningShareAccount(publicInvestment.address,web3)
            //getSubscribeAmount()
        } else {
            getContract()
        }
    }, [publicInvestment])

    const handleSharedAccount = e => {
        e.preventDefault();
        const month = e.target.month.value;
        const subscribeAmount = e.target.subscribeAmount.value;

        publicInvestment.shareSecuritiesAccount(
            brokerId, securitiesAccount, month, subscribeAmount, { from: brokerIdAddress.toString() }
        ).then(result => {
            console.log(result)
        })
    }
    return (
        <React.Fragment>
            <h3>shareSecuritiesAccount 分享證券帳號</h3>
            <p>確認是否為明星投資者證券帳戶，輸入券商ID和證券帳號，再輸入欲分享帳戶之起始月份和金額</p>
            <form onSubmit={handleSharedAccount}>
                <input name="brokerId" value="C"/>
                <input name="securitiesAccount" value="1234567"/>
                <input name="month" />
                <input name="subscribeAmount" />
                <button type="submit">submit</button>
            </form>
            <br></br>
        </React.Fragment>
    )
}

export default SharedSecurityAccount;