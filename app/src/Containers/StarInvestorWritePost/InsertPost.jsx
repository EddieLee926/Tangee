import React, { useState, useEffect } from 'react';
import { userSelector } from '../../Reducer/User/UserSlice';
import { useSelector } from 'react-redux';
import UploadImage from '../../Components/General/image/UploadImage';
import InsertEditor from '../../Components/StarInvestorWritePost/Editor/InsertEditor';
// import PaperBlock from '../../Components/General/PaperBlock/PaperBlock';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { GeneralButton } from '../../Components/General/CustomButton/CustomButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { history } from '../../Helper/history.js';
import style from './StarInvestorWritePostStyle';

const useStyles = makeStyles(style);

const InsertPost = () => {
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
    const handleBack = () => {
        history.goBack();
    };

    return (
        <>
            <div className={classes.title}>
                <GeneralButton
                    category='normal'
                    onClick={handleBack}
                    className={classes.backButton}
                >
                    <ArrowBackIcon />
                </GeneralButton>
                <Typography variant='h2'>撰寫新文章</Typography>
            </div>
            <div>
                <Dialog
                    open={open2}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >
                    <DialogActions>
                        <GeneralButton category='normal' onClick={handleClose}>
                            x
                        </GeneralButton>
                    </DialogActions>
                    <DialogTitle id='alert-dialog-title'>選擇封面</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            <UploadImage id={userid} type={2} />
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
            {/* <Typography variant='h3' align='center'>新增封面照片:</Typography> */}
            {/* 傳入type=2以及postid */}
            {/* <UploadImage key={userid} type={2} /> */}
            {/* </PaperBlock> */}
            <InsertEditor key={userid} id={userid} />
        </>
    );
};

export default InsertPost;
