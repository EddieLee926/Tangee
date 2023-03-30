import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Controller, useFormContext } from 'react-hook-form';
import { userSelector } from '../../../Reducer/User/UserSlice';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './ShowTagStyle';
import getApi from '../../../Utils/Api/getApi';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import DoneIcon from '@material-ui/icons/Done';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UpdateTag from './UpdateTag';
const useStyles = makeStyles(styles);

const ShowPostTag = props => {
        const { userid } = useSelector(userSelector);
        const classes = useStyles();
        const { id } = props;
        //const { control } = useFormContext();
        // const tag_array = Array(num)
        //     .fill()
        //     .map((num, index) => index + 1);
        const [chipData, setChipData] = useState();
        console.log("文章的", id)
        useEffect(() => {
                const getSelectItem = async () => {
                        const response = await getApi.post('/article/getTag', id);
                        console.log(response, "uuu")
                        setChipData(response.data)
                };
                getSelectItem();
        },
                []);
        const [open, setOpen] = React.useState(false);

        const handleClose = () => {
                setOpen(false);
        };
        const handleOpen = () => {
                setOpen(true);
        };



        return <>
                <div>
                        <div>文章所屬標籤
                        </div>
                        {
                                chipData ?
                                        chipData.map((data) => (
                                                <Chip
                                                        id={`${data.value}`}
                                                        label={data.explanation}
                                                        className={classes.chipSelected}
                                                        value={data.value}

                                                />
                                        ))
                                        :
                                        <Skeleton animation="wave" />
                        }


                </div>

        </>
};

export default ShowPostTag;