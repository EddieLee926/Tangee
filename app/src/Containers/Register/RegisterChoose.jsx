import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import PaperBlock from '../../Components/General/PaperBlock/PaperBlock';
import { getImage } from '../../Config/images';
import style from './RegisterStyle';
import {
    GeneralButton,
    LinkButton,
} from '../../Components/General/CustomButton/CustomButton.jsx';
const useStyles = makeStyles(style);
//選擇註冊身分
const RegisterChoose = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    //const classesModel = useStylesModel();
    // getModalStyle is not a pure function, we roll the style only on the first render
    //const [modalStyle] = React.useState(getModalStyle);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className={classes.root}>
            <Typography variant='h1' align='center'>
                加入Tangee
            </Typography>
            <div className={classes.graphWrapper}>
                <PaperBlock className={classes.barGraph}>
                    <img
                        src={getImage('register', 'logo', 'normal_user')}
                        className={classes.image}
                    />
                    <Typography variant='h2' align='center'>
                        我想要參考高手的策略!
                    </Typography>
                    <div>
                        <LinkButton category='outline' to='/register'>
                            一般使用者
                        </LinkButton>
                    </div>
                </PaperBlock>

                <PaperBlock className={classes.barGraph2}>
                    <img
                        src={getImage('register', 'logo', 'star_user')}
                        className={classes.image}
                    />
                    <Typography variant='h2' align='center'>
                        我是高手，我想分享我的交易資訊!
                    </Typography>
                    <div>
                        <LinkButton category='normal' onClick={handleOpen}>
                            明星投資者
                        </LinkButton>

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby='alert-dialog-title'
                            aria-describedby='alert-dialog-description'
                        >
                            <DialogTitle id='alert-dialog-title'>
                                是否確定成為明星投資者
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id='alert-dialog-description'>
                                    隱私權保護政策的適用範圍隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color='primary'>
                                    不同意
                                </Button>
                                <Button
                                    onClick={handleClose}
                                    color='primary'
                                    autoFocus
                                    component={Link}
                                    to='/register2'
                                >
                                    我同意
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </PaperBlock>
            </div>
        </div>
    );
};

export default RegisterChoose;
