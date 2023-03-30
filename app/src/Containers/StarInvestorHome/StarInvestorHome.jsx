import React, { useEffect, useState } from 'react';
import Article from '../../Components/StarInvestorDetails/Article/Article.jsx';
import RecentTransaction from '../../Components/StarInvestorDetails/RecentTransaction/RecentTransaction.jsx';
import Performance from '../../Components/StarInvestorDetails/Performance/Performance.jsx';
import { userSelector } from '../../Reducer/User/UserSlice.js';
import { quorumNodesSelector } from '../../Reducer/QuorumNodes/QuorumNodesSlice';
import { useSelector } from 'react-redux';
import KeyVisual from '../../Components/starInvestorHome/KeyVisual/KeyVisual.jsx';
import SettingButton from '../../Components/starInvestorHome/SettingButton.js';
import SetSubscribedAmount from '../../Components/starInvestorHome/SetSubscribedAmount/SetSubscribedAmount.js';
import SetStarMemo from '../../Components/starInvestorHome/SetStarMemo/SetStarMemo.js';
import SecuritesAccountButton from '../../Components/starInvestorHome/Buttons/SecuritesAccountButton.jsx';
import PublicInvestmentDataSharingPlatform from '../../contracts/PublicInvestmentDataSharingPlatform.json';
import ListeningShareAccount from '../../Utils/Listening/ListeningShareAccount.js';
import ListeningCancelShareAccount from '../../Utils/Listening/ListeningCancelShareAccount.js';
import contract from '@truffle/contract';
import RegisterSecurityAccount from '../../Components/NormalMemberHome/RegisterSecurityAccount/RegisterSecurityAccount.js';
import ShowTag from '../../Components/General/Tag/ShowTag.js';
import CreateIcon from '@material-ui/icons/Create';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import UploadImage from '../../Components/General/image/UploadImage.js';
import LoadImage from '../../Components/General/image/LoadImage.jsx';
import NickName from '../../Components/General/NickName/NickName.js';
const StarInvestorHome = () => {
    const { userid, brokerId, securitiesAccount } = useSelector(userSelector);
    const { currentProvider, brokerIdAddress, web3 } = useSelector(quorumNodesSelector);
    const [publicInvestment, setPublicInvestment] = useState('');

    const getContract = async () => {
        const MyContract = contract(PublicInvestmentDataSharingPlatform);
        MyContract.setProvider(currentProvider);
        const MyContractInstance = await MyContract.deployed();
        setPublicInvestment(MyContractInstance);
    };

    useEffect(() => {
        if (brokerIdAddress) {
            getContract();
        }
    }, [brokerIdAddress]);

    useEffect(() => {
        if (publicInvestment) {
            ListeningShareAccount(publicInvestment.address, web3);
            ListeningCancelShareAccount(publicInvestment.address, web3);
        }
        return () => {
            web3.eth.clearSubscriptions();
        };
    }, [publicInvestment]);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <React.Fragment>
            {/* <h1>明星投資者個人頁面</h1> */}
            <div
                style={{
                    float: 'left',
                }}
            >

                {/* <LoadImage key={userid} userid={userid} /> */}

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >

                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus component={Link} to='/star/home'>
                            x
                        </Button>

                    </DialogActions>
                    <DialogTitle id="alert-dialog-title">改你的大頭</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <UploadImage id={userid} type={1} />
                        </DialogContentText>
                    </DialogContent>

                </Dialog>
            </div>
            <div>
                <KeyVisual userid={userid} />
                {/* <Button startIcon={<CreateIcon />} onClick={handleOpen}>改你的大頭</Button> */}
                {/* <SettingButton key={userid} userid={userid} /> */}
                {/* <SecuritesAccountButton
                    brokerId={brokerId}
                    securitiesAccount={securitiesAccount}
                    brokerIdAddress={brokerIdAddress}
                    publicInvestment={publicInvestment}
                />
                <RegisterSecurityAccount /> */}
            </div>
            <React.Fragment>
                {/* <NickName key={userid} id={userid} />
                <ShowTag key={"showTag" + userid} id={userid} />
                <SetSubscribedAmount key={userid} userid={userid} /> */}
                <SetStarMemo key={userid} userid={userid} />
                <Performance key={userid} id={userid} />
                <RecentTransaction key={userid} id={userid} />
                <Article key={userid} id={userid} />
            </React.Fragment>
        </React.Fragment>
    );
};

export default StarInvestorHome;
