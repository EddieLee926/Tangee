import React from 'react';
import { userSelector } from '../../Reducer/User/UserSlice';
import { useSelector } from 'react-redux';
import NickName from '../../Components/General/NickName/NickName.js';
import PostAnalysis from '../../Components/StartInvestorPost/PostAnalysis/PostAnalysis.js';
import PostStatistics from '../../Components/StartInvestorPost/PostStatistics/PostStatistics.js';
import SetPostSubscribedAmount from '../../Components/StartInvestorPost/SetPostSubscribedAmount/SetPostSubscribedAmount.js';
import PostSettingButton from '../../Components/StartInvestorPost/PostSettingButton/PostSettingButton.js';
import {
    GeneralButton,
    LinkButton,
} from '../../Components/General/CustomButton/CustomButton.jsx';
import PaperBlock from '../../Components/General/PaperBlock/PaperBlock';
import style from './StarInvestorPostStyle';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { getImage } from '../../Config/images';
const useStyles = makeStyles(style);
const StarInvestorPost = () => {
    const { userid } = useSelector(userSelector);
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
    return (
        <React.Fragment>
            <PaperBlock className={classes.root}>
                <div className={classes.leftSection}>
                    <div>
                        <Typography variant='h1' className={classes.title}>
                            我的文章
                        </Typography>
                        <Typography variant='h1' className={classes.title}>
                            Welcome back!&nbsp;
                            <NickName key={userid} id={userid} />
                        </Typography>
                    </div>
                    <div>
                        <Typography variant='h2'>開始撰寫文章吸引訂閱者吧</Typography>
                        <div className={classes.content}>
                            <div className={classes.buttonsWrap}>
                                <GeneralButton category='normal' onClick={handleOpen2}>
                                    變更文章吃到飽
                                </GeneralButton>
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
                                            X
                                        </GeneralButton>
                                    </DialogActions>
                                    <DialogTitle id='alert-dialog-title'>
                                        確定變更嗎?
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id='alert-dialog-description'>
                                            <PostSettingButton />
                                        </DialogContentText>
                                    </DialogContent>
                                </Dialog>

                                <LinkButton category='normal' to='/star/insert-post'>
                                    撰寫新文章
                                </LinkButton>
                                <GeneralButton category='normal' onClick={handleOpen}>
                                    修改文章訂閱費用
                                </GeneralButton>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby='alert-dialog-title'
                                    aria-describedby='alert-dialog-description'
                                >
                                    <DialogActions className={classes.closeBtn}>
                                        <GeneralButton
                                            category='normal'
                                            onClick={handleClose}
                                        >
                                            X
                                        </GeneralButton>
                                    </DialogActions>
                                    <DialogTitle id='alert-dialog-title'>
                                        修改訂閱費用
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id='alert-dialog-description'>
                                            <SetPostSubscribedAmount
                                                key={userid}
                                                userid={userid}
                                            />
                                            {/* <PostSettingButton /> */}
                                            {/* <SetSubscribedAmount key={userid} userid={userid} /> */}
                                        </DialogContentText>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.starBackground}>
                    <img
                        src={getImage('star_home', 'background', 'happen_background2')}
                    />
                </div>
            </PaperBlock>
            <Typography variant='h2' align='center'>
                統計資料
            </Typography>
            <PostAnalysis />
            <div className={classes.graphWrapper2}>
                <PaperBlock className={classes.barGraph2}>
                    <Typography variant='h2' align='center'>
                        綜合數據分析
                    </Typography>
                    <PostStatistics />
                </PaperBlock>
            </div>
        </React.Fragment>
    );
};

export default StarInvestorPost;
