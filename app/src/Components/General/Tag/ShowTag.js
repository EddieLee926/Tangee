import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../Reducer/User/UserSlice';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './ShowTagStyle';
import getApi from '../../../Utils/Api/getApi';
import Chip from '@material-ui/core/Chip';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UpdateTag from './UpdateTag';
import { GeneralButton } from '../CustomButton/CustomButton';
const useStyles = makeStyles(styles);

const ShowTag = (props) => {
    const { userid } = useSelector(userSelector);
    const classes = useStyles();
    const { id } = props;
    //const { control } = useFormContext();
    // const tag_array = Array(num)
    //     .fill()
    //     .map((num, index) => index + 1);
    const [chipData, setChipData] = useState();
    // console.log('tag的', id);
    useEffect(() => {
        const getSelectItem = async () => {
            const response = await getApi.post('/getUserTag', id);
            // console.log(response, 'uuu');
            setChipData(response.data);
        };
        getSelectItem();
    }, []);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            {chipData ? (
                chipData.map((data) => (
                    <Chip
                        id={`${data.value}`}
                        label={data.explanation}
                        className={classes.chipSelected}
                        value={data.value}
                    />
                ))
            ) : (
                <Skeleton animation='wave' />
            )}
            <IconButton onClick={handleOpen}>
                <CreateIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogActions className={classes.closeBtn}>
                    <GeneralButton onClick={handleClose} category='normal'>
                        x
                    </GeneralButton>
                </DialogActions>
                <DialogTitle id='alert-dialog-title'>更改tag</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        <UpdateTag key={'updateTag' + userid} id={userid} />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ShowTag;
