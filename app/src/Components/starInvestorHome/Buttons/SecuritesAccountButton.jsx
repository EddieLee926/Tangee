import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { GetShareAccountStateLogic, UpdateShareAccountStateLogic } from './SecuritesAccountButtonLogic.js';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { GeneralButton } from '../../General/CustomButton/CustomButton.jsx';
import { LinkButton } from '../../General/CustomButton/CustomButton.jsx';
//這個頁面會根據明星投資者是否有分享證券帳號去動態呈現


const SecuritesAccountButton = ({
    brokerId,
    securitiesAccount,
    brokerIdAddress,
    publicInvestment,
}) => {
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();
    const { userid } = useSelector(userSelector);
    const [shareAccount, setShareAccount] = useState()
    const [open, setOpen] = React.useState(false);
    var date = new Date();
    const [selectedDate, setSelectedDate] = React.useState(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var timeArray = [];
    for (var i = 0; i < 12; i++) {
        if (month == 0) {
            year -= 1;
            month = 12
        }
        var data = {
            value: year + "/" + month,
            date: year + "年" + month + "月"
        }
        timeArray.push(data)
        month -= 1;
    }
    console.log(timeArray);
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        GetShareAccountStateLogic(userid).then(result => {
            setShareAccount(result.data.shareAccount)
            console.log("是否有分享證券", result.data.shareAccount)
            console.log(shareAccount)
        })

    }, []);

    const clickHandle = () => {
        setOpen(false);
        var modshareAccount = "False";
        var transactionHash = '';
        console.log(brokerId, securitiesAccount, {
            from: brokerIdAddress.toString()
        })
        if (shareAccount == "True") {
            publicInvestment
                .cancelShareSecuritiesAccount(brokerId, securitiesAccount, {
                    from: brokerIdAddress.toString(),
                })
                .then((result) => {
                    console.log(result);
                    console.log("取消的transactionHash", result.receipt.transactionHash);
                    modshareAccount = "False";
                    var data = {
                        userid: userid,
                        shareAccount: modshareAccount,
                        transactionHash: result.receipt.transactionHash
                    }
                    UpdateShareAccountStateLogic(data).then(result => {
                        setShareAccount(modshareAccount)
                        alert(result.data)
                    })
                })
                .catch((err) => {
                    console.log(err);
                });


        } else {

            const month = new Date().getMonth().toString();
            console.log(brokerId, securitiesAccount, selectedDate, brokerIdAddress.toString())
            publicInvestment
                .shareSecuritiesAccount(brokerId, securitiesAccount, month, {
                    from: brokerIdAddress.toString(),
                })
                .then((result) => {
                    console.log("分享證券帳號result", result);
                    console.log("分享的transactionHash", result.receipt.transactionHash);
                    modshareAccount = "True";
                    var data = {
                        userid: userid,
                        shareAccount: modshareAccount,
                        transactionHash: result.receipt.transactionHash
                    }
                    console.log("出去的資料")
                    UpdateShareAccountStateLogic(data).then(result => {
                        setShareAccount(modshareAccount)
                        alert(result.data)
                    })
                })
                .catch((err) => {
                    console.log(err);
                });


        }

    };

    return <>
        {/* {shareAccount ? shareAccount == "False" ? <Button variant="contained" color="inherant" onClick={handleClickOpen} >分享證券帳號</Button> :
            <Button variant="contained" color="inherant" onClick={handleClickOpen} >取消分享證券帳號</Button>
            : <LinearProgress />
        } */}
        {shareAccount ? shareAccount == "False" ? <LinkButton category='normal' onClick={handleClickOpen}> 分享證券帳號</LinkButton> :
            <LinkButton category='outline' onClick={handleClickOpen} > 取消分享證券帳號</LinkButton>
            : <LinearProgress />
        }
        {shareAccount ? shareAccount == "False" ? <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">分享證券帳號</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    您好!是否確定分享證券帳號?
                    若願意分享證券帳號請選擇欲開始分享之月份
                </DialogContentText>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">選擇月份</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedDate}
                        onChange={handleDateChange}
                    >
                        {
                            timeArray.map((time) => {
                                return (
                                    <MenuItem
                                        key={time.value}
                                        value={time.value}
                                    >
                                        {time.date}
                                    </MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    取消
                </Button>
                <Button onClick={clickHandle} color="primary">
                    確定
                </Button>
            </DialogActions>
        </Dialog> :
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">取消分享證券帳號</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        您好!是否確定取消分享證券帳號?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={clickHandle} color="primary">
                        確定
                    </Button>
                </DialogActions>
            </Dialog>
            : <LinearProgress />
        }



    </>;
};


export default SecuritesAccountButton;