import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import styles from './NormalMemberHomeStyle';
// const useStyles = makeStyles(styles);
import getDataLogic from './Personal.js';
import Skeleton from '@material-ui/lab/Skeleton';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import LoadImage from '../../General/image/LoadImage.jsx';
import UpdateItem from '../../Register/RegisterItem/UpdateSA.jsx';
import PaperBlock from '../../General/PaperBlock/PaperBlock.jsx';
import { makeStyles } from '@material-ui/core/styles';
import style from './PersonalStyle';
import { GeneralButton } from '../../General/CustomButton/CustomButton.jsx';
import RegisterSecurityAccount from '../RegisterSecurityAccount/RegisterSecurityAccount.js';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ShowTag from '../../General/Tag/ShowTag.js';
import CreateIcon from '@material-ui/icons/Create';
import UploadImage from '../../General/image/UploadImage.js';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const useStyles = makeStyles(style);

const Personal = () => {
    const { userid } = useSelector(userSelector);
    const [users, setUsers] = useState();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [open2, setOpen2] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        setOpen2(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleOpen2 = () => {
        setOpen2(true);
    };

    useEffect(() => {
        getDataLogic(userid).then((result) => {
            setUsers(result.data);
        });
    }, []);

    const UsersDiv = ({ users }) => {
        if (users) {
            return (
                <div className={classes.div1}>
                    <Typography variant='body1' align='center'>
                        {users.nick_name}
                    </Typography>
                    <Typography variant='body1' align='center'>
                        {users.email}
                    </Typography>
                    <Typography variant='body1' align='center'>
                        {users.phone}
                    </Typography>
                </div>
            );
        }
        return <Skeleton animation='wave' />;
    };

    const UsersDiv2 = ({ users }) => {
        if (users) {
            return (
                <div>
                    <div className={classes.contentList}>
                        <div className={classes.contentIcon}>
                            <ArrowForwardIosIcon fontSize='small' />
                        </div>
                        <Typography variant='h3' align='left'>
                            投資經驗:{' '}
                            <span style={{ fontWeight: 'normal' }}>
                                {users.Q4_InvestExperience}
                            </span>
                        </Typography>
                    </div>
                    <div className={classes.contentList}>
                        <div className={classes.contentIcon}>
                            <ArrowForwardIosIcon fontSize='small' />
                        </div>
                        <Typography variant='h3' align='left'>
                            投資頻率:{' '}
                            <span style={{ fontWeight: 'normal' }}>
                                {users.Q2_InvestCycle}
                            </span>
                        </Typography>
                    </div>
                    <div className={classes.contentList}>
                        <div className={classes.contentIcon}>
                            <ArrowForwardIosIcon fontSize='small' />
                        </div>
                        <Typography variant='h3' align='left'>
                            投資目標:{' '}
                            <span style={{ fontWeight: 'normal' }}>
                                {users.Q3_InvestReason}
                            </span>
                        </Typography>
                    </div>
                    <div className={classes.contentList}>
                        <div className={classes.contentIcon}>
                            <ArrowForwardIosIcon fontSize='small' />
                        </div>
                        <Typography variant='h3' align='left'>
                            風險偏好:{' '}
                            <span style={{ fontWeight: 'normal' }}>
                                {users.Q1_InvestStyle}
                            </span>
                        </Typography>
                    </div>

                    {/* <h3>會員等級:{users.member_level}</h3> */}
                    {/* <h3>投資金額:{users.invest_amount}</h3>
                            <h3>投資目標:{users.invest_goal}</h3>
                            <h3> 風險偏好:{users.risk}</h3> */}
                </div>
            );
        }
        return <Skeleton animation='wave' />;
    };

    return (
        <>
            <div className={classes.root}>
                <PaperBlock className={classes.personalInfo}>
                    <div className={classes.imageInfo}>
                        <LoadImage
                            key={userid}
                            userid={userid}
                            className={classes.imgCircle}
                        />
                        <div className={classes.iconn}>
                            <IconButton onClick={handleOpen2}>
                                <AddAPhotoIcon />
                            </IconButton>
                            <Dialog
                                open={open2}
                                onClose={handleClose}
                                aria-labelledby='alert-dialog-title'
                                aria-describedby='alert-dialog-description'
                            >
                                <DialogActions>
                                    <GeneralButton
                                        category='normal'
                                        onClick={handleClose}
                                    >
                                        x
                                    </GeneralButton>
                                </DialogActions>
                                <DialogTitle id='alert-dialog-title'>
                                    更改您的大頭貼
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id='alert-dialog-description'>
                                        <UploadImage id={userid} type={1} />
                                    </DialogContentText>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <UsersDiv users={users} />
                </PaperBlock>
                <PaperBlock className={classes.lineGraph}>
                    <Typography variant='h2'>About me</Typography>
                    <UsersDiv2 users={users} />
                    <Typography variant='h2'>喜愛的標籤</Typography>
                    <ShowTag key={userid} id={userid} />
                </PaperBlock>
            </div>
        </>
    );
};

export default Personal;
