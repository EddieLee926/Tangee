import React, { useState, useEffect } from 'react';
import contract from '@truffle/contract';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { quorumNodesSelector } from '../../../Reducer/QuorumNodes/QuorumNodesSlice';
import { useSelector } from 'react-redux';
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
import CancelSubscribeShareAccountButton from '../../../Components/StarInvestorDetails/Button/CancelSubscribeShareAccountButton.js';
import CancelSubscribeShareArticleButton from '../Button/CancelSubscribeShareArticleButton.js';
import { makeStyles } from '@material-ui/core/styles';
import getApi from '../../../Utils/Api/getApi';
import PublicInvestmentDataSharingPlatform from '../../../contracts/PublicInvestmentDataSharingPlatform.json';
import ListeningCancelSubscribeShareAccount from '../../../Utils/Listening/ListeningSubscribeShareAccount';
import styles from './KeyVisualStyle';

const useStyle = makeStyles(styles);

const followLinks = [
    { icon: <FacebookIcon />, link: '' },
    { icon: <InstagramIcon />, link: '' },
    { icon: <LinkedInIcon />, link: '' },
    { icon: <TwitterIcon />, link: '' },
];

const KeyVisual = ({ id }) => {
    const classes = useStyle();
    const [articleNum, setArticleNum] = useState('');
    const [followers, setFollowers] = useState('');
    const [subscribed, setSubscribed] = useState();
    const [subscribedPost, setSubscribedPost] = useState();
    const { userid, brokerId, securitiesAccount } = useSelector(userSelector);
    const { currentProvider, brokerIdAddress, web3 } = useSelector(quorumNodesSelector);
    const [publicInvestment, setPublicInvestment] = useState('');
    const [starData, setStarData] = useState('');
    const FollowLinks = followLinks.map((link, index) => (
        <IconButton key={index} className={classes.followlink}>
            {link.icon}
        </IconButton>
    ));

    useEffect(() => {
        getArticleNumber(id).then((result) => {
            const num = result.data.length;
            setArticleNum(num);
        });
        getFollowersNumber(id).then((result) => {
            const { num } = result.data[0];
            setFollowers(num);
        });
    }, [id]);

    useEffect(() => {
        const getStarData = async () => {
            const starId = {
                id: id,
            };
            // console.log('投資者?', starId);
            const starResponse = await getApi.post('getData/starData', starId);
            setStarData(starResponse.data);
            // console.log('投資者資料', starResponse.data);
        };
        getStarData();

        const getIfSubscribed = async () => {
            const data = {
                userid: userid,
                shareID: id,
            };
            const response = await getApi.post('getData/subscribe', data);
            setSubscribed(response.data);
            // console.log('是否有訂閱', response.data);
        };
        getIfSubscribed();
        const getIfSubscribedPost = async () => {
            const data = {
                userid: userid,
                shareID: id,
            };
            const response = await getApi.post('getData/subscribePost', data);
            console.log('是否有訂閱文章吃到飽~~~', response.data);
            setSubscribedPost(response.data);
            // console.log('是否有訂閱', response.data);
        };
        getIfSubscribedPost();
    }, []);

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
            ListeningCancelSubscribeShareAccount(publicInvestment.address, web3);
        }
        return () => {
            web3.eth.clearSubscriptions();
        };
    }, [publicInvestment]);

    return (
        <div className={classes.root}>
            <div className={classes.starBackground}></div>
            <LoadImage userid={id} className={classes.imgCircle} />
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
                        <NickName id={id} />
                    </Typography>
                    <div className={classes.buttonsWrap}>
                        {subscribedPost ? (
                            subscribedPost == 'True' ? (
                                <CancelSubscribeShareArticleButton
                                    shareID={id}
                                    userid={userid}
                                ></CancelSubscribeShareArticleButton>
                            ) : (
                                <LinkButton category='normal' to={`/postpayment/${id}`}>
                                    訂閱文章吃到飽方案
                                </LinkButton>
                            )
                        ) : (
                            <GeneralButton disableRipple>
                                目前沒有文章吃到飽方案喔
                            </GeneralButton>
                        )}
                        {/* <GeneralButton disableRipple>Button2</GeneralButton> */}
                        {subscribed ? (
                            subscribed == 'True' ? (
                                <CancelSubscribeShareAccountButton
                                    publicInvestment={publicInvestment}
                                    brokerIdAddress={brokerIdAddress}
                                    subscribeBrokerId={brokerId}
                                    subscriberSecuritiesAccount={securitiesAccount}
                                    shareBrokerId={starData.brokerId}
                                    shareSecuritiesAccount={starData.securitiesAccount}
                                    shareID={id}
                                    userid={userid}
                                ></CancelSubscribeShareAccountButton>
                            ) : (
                                <LinkButton category='normal' to={`/payment/${id}`}>
                                    訂閱明星投資者
                                </LinkButton>
                            )
                        ) : (
                            <GeneralButton disableRipple>
                                目前該明星投資者沒有分享證券帳號喔
                            </GeneralButton>
                        )}
                    </div>
                    <div>
                        <Typography variant='body1'>
                            學會如何找到有發展潛力的公司，告訴你如何透過大數據資料、特殊券商籌碼、基本面財報、主流產業、產業鏈彼此間的重要關係，可轉債CB，找到適合投資波段持有公司的方法；
                            瞭解總體經濟發展，科斯托蘭尼老人與狗理論，一間公司的發展不離基本面與總體經濟，大盤指數深刻影響個股，透過各項經濟指標，剖析國際政經局勢，動態記錄大盤走勢，分享應對策略
                        </Typography>
                    </div>
                </div>
                <div className={classes.links}>
                    <GeneralButton category='normal'>Follow</GeneralButton>
                    <div className={classes.linksWrap}>{FollowLinks}</div>
                </div>
            </div>
        </div>
    );
};

export default KeyVisual;
