import getApi from '../../../Utils/Api/getApi';
import React, { useEffect, useState } from "react";
import NotifyStockDataLogic from './NotifyStockDataLogic.js';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NotifyStockData = props => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [data, updateData] = useState(null);
    const { userid, broScheme } = useSelector(userSelector);
    // const handleClick = () => {
    //     setOpen(true);
    // };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    useEffect(() => {

        const source = new EventSource("http://localhost:8080/SSE");

        source.onmessage = function logEvents(event) {
            var data = JSON.parse(event.data)
            data.broScheme = broScheme;
            data.normalUserid = userid;
            console.log(data)
            NotifyStockDataLogic(data).then(result => {
                console.log(result.data)
                if (result.data != "False") {
                    //alert(result.data)
                    updateData(result.data);
                    setOpen(true);
                }

            })



        }
    }, [])

    var vertical = 'top'
    var horizontal = 'center'
    return (
        <div className={classes.root}>
            {/* <Button variant="outlined" onClick={handleClick}>
                Open success snackbar
            </Button> */}
            <Snackbar open={open}
                anchorOrigin={{ vertical, horizontal }}
                autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {data ? data : '有明星投資者更新囉!快去查看'}
                </Alert>
            </Snackbar>

        </div>
    );
}

export default NotifyStockData;

