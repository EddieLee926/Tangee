import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import IconButton from '@material-ui/core/IconButton';
import LoadImage from '../../General/image/LoadImage';
import NickName from '../../General/NickName/NickName';
import { GeneralButton, LinkButton } from '../../General/CustomButton/CustomButton';
import getArticleNumber from '../../StarInvestorDetails/Article/Article.js';
import getFollowersNumber from '../../StarInvestorManagement/Revenue/Revenu2.js';
import { makeStyles } from '@material-ui/core/styles';
import styles from './KeyVisualStyle';
import ShowTag from '../../General/Tag/ShowTag';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SetSubscribedAmount from '../SetSubscribedAmount/SetSubscribedAmount';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import UploadImage from '../../General/image/UploadImage';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SecuritesAccountButton from '../Buttons/SecuritesAccountButton';
import ShareSecuritesAccountButton from '../Buttons/ShareSecuritesAccountButton';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../Reducer/User/UserSlice';
import { quorumNodesSelector } from '../../../Reducer/QuorumNodes/QuorumNodesSlice';
const useStyle = makeStyles(styles);

const followLinks = [
    { icon: <FacebookIcon />, link: '' },
    { icon: <InstagramIcon />, link: '' },
    { icon: <LinkedInIcon />, link: '' },
    { icon: <TwitterIcon />, link: '' },
];

const KeyVisual = ({ userid }) => {
    const { brokerId, securitiesAccount } = useSelector(userSelector);
    const { currentProvider, brokerIdAddress, web3 } = useSelector(quorumNodesSelector);
    const [publicInvestment, setPublicInvestment] = useState('');
    const classes = useStyle();
    const [articleNum, setArticleNum] = useState('');
    const [followers, setFollowers] = useState('');
    const FollowLinks = followLinks.map((link, index) => (
        <IconButton key={index} className={classes.followlink}>
            {link.icon}
        </IconButton>
    ));

    useEffect(() => {
        getArticleNumber(userid).then((result) => {
            const num = result.data.length;
            setArticleNum(num);
        });
        getFollowersNumber(userid).then((result) => {
            const { num } = result.data[0];
            setFollowers(num);
        });
    }, [userid]);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        setOpen2(false);
        setOpen3(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleOpen2 = () => {
        setOpen2(true);
    };
    const handleOpen3 = () => {
        setOpen3(true);
    };

    return (
        <div className={classes.root}>
            <div className={classes.starBackground}></div>
            <div>
                <LoadImage userid={userid} className={classes.imgCircle} />
                <div className={classes.iconn}>
                    <Button startIcon={<AddAPhotoIcon />} onClick={handleOpen2}></Button>
                    <Dialog
                        open={open2}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >

                        <DialogActions>
                            {/* <Button onClick={handleClose} color="primary" autoFocus component={Link} to='/star/home'>
                            x
                        </Button> */}
                            <LinkButton category='normal' onClick={handleClose}>  x</LinkButton>

                        </DialogActions>
                        <DialogTitle id="alert-dialog-title">更改您的大頭貼</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <UploadImage id={userid} type={1} />
                            </DialogContentText>
                        </DialogContent>

                    </Dialog>
                </div>
            </div>
            <div className={classes.content}>
                <div className={classes.popularity}>
                    <div className={classes.popularityItem}>
                        <Typography variant='h2'>{articleNum}</Typography>
                        Posts
                    </div>
                    <div className={classes.popularityItem}>
                        <Typography variant='h2'>{followers}</Typography>
                        Followers
                    </div>
                </div>
                <div className={classes.details}>
                    <Typography variant='h1'>
                        <NickName key={userid} id={userid} />
                    </Typography>
                    <div className={classes.buttonsWrap}>
                        <SecuritesAccountButton
                            brokerId={brokerId}
                            securitiesAccount={securitiesAccount}
                            brokerIdAddress={brokerIdAddress}
                            publicInvestment={publicInvestment}
                        />
                        {/* <SecuritesAccountButton brokerId={brokerId}
                            securitiesAccount={securitiesAccount}
                            brokerIdAddress={brokerIdAddress}
                            publicInvestment={publicInvestment} />
                        <LinkButton category='normal' onClick={handleOpen3}> 分享證券帳號</LinkButton>
                        <Dialog
                            open={open3}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogActions>
                                <LinkButton category='normal' onClick={handleClose}> X</LinkButton>

                            </DialogActions>
                            <DialogTitle id="alert-dialog-title">是否確定分享證券帳號</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <SecuritesAccountButton></SecuritesAccountButton>
                                </DialogContentText>
                            </DialogContent>

                        </Dialog> */}
                        {/* <LinkButton category='normal' to='/star/management'>  管理我的帳號</LinkButton>
                        <LinkButton category='normal' to='/star/post'> 管理我的文章</LinkButton> */}
                        <LinkButton category='normal' onClick={handleOpen}> 修改訂閱費用</LinkButton>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >

                            <DialogActions>
                                <LinkButton category='normal' onClick={handleClose}> X</LinkButton>

                            </DialogActions>
                            <DialogTitle id="alert-dialog-title">修改訂閱費用</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <SetSubscribedAmount key={userid} userid={userid} />
                                </DialogContentText>
                            </DialogContent>

                        </Dialog>

                        {/* <GeneralButton category='normal' disableRipple>
                            管理我的帳號
                        </GeneralButton>
                        <GeneralButton disableRipple>管理我的文章</GeneralButton>
                        <GeneralButton disableRipple>修改訂閱費用</GeneralButton> */}
                    </div>
                    <div>
                        <Typography variant='body1'>
                            學會如何找到有發展潛力的公司，告訴你如何透過大數據資料、特殊券商籌碼、基本面財報、主流產業、產業鏈彼此間的重要關係，可轉債CB，找到適合投資波段持有公司的方法；
                            瞭解總體經濟發展，科斯托蘭尼老人與狗理論，一間公司的發展不離基本面與總體經濟，大盤指數深刻影響個股，透過各項經濟指標，剖析國際政經局勢，動態記錄大盤走勢，分享應對策略
                        </Typography>
                    </div>
                    <ShowTag key={"showTag" + userid} id={userid} />
                </div>
                <div className={classes.links}>
                    <GeneralButton category='normal'>Follow</GeneralButton>
                    <div className={classes.linksWrap}>{FollowLinks}</div>
                </div>
            </div>
        </div >
    );
};

export default KeyVisual;
