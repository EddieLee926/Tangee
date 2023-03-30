import React ,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { listening_events } from '../../../Utils/Listening/ListeningEvents';
import { notificationToggle } from '../../../Reducer/Listening/ListeningSlice';

import styles from './NotificationStyle';
const useStyles = makeStyles(styles);

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const selectNotification = state => state.listening.haveNotification;

const Notification = () => {
    const classes = useStyles();
    //const haveNotification = useSelector(selectNotification);
    //const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("yyy");
    
    const handleClick = () => {
        //console.log(notificationToggle());
        //dispatch(notificationToggle())
        setOpen(true)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        //dispatch(notificationToggle())
        setOpen(false)
    };

    useEffect(()=>{
        listening_events(setOpen,setAlertMsg);
    },[])

  return (
    <div className={classes.root}>
        <Button variant="outlined" onClick={handleClick}>
            Open success snackbar
        </Button>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
            {alertMsg}
            </Alert>
        </Snackbar>
    </div>
  );
};

export default Notification;
