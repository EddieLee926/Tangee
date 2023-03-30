import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Controller, useFormContext } from 'react-hook-form';
import { userSelector } from '../../../Reducer/User/UserSlice';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TableCell from '@material-ui/core/TableCell';
import Skeleton from '@material-ui/lab/Skeleton';
import getApi from '../../../Utils/Api/getApi';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import styles from './TagchipStyle'
import getDataLogic from './TagchipLogic';
import TableBody from '@material-ui/core/TableBody';

import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(styles);

const Tagchip = () => {
        const { tag } = useSelector(userSelector);
        console.log(tag, "tag喔")
        const classes = useStyles();
        const [chipData, setChipData] = useState();
        useEffect(() => {
                getDataLogic(tag).then(result => {
                        console.log(result.data, "回傳tag名稱喔")
                        setChipData(result.data)
                })
        }, []);


        return (
                <div>
                        chipchip


                        <React.Fragment>


                                <Paper component="ul" className={classes.root}>
                                        {
                                                chipData ?
                                                        chipData.map((data) => (
                                                                <li key={data.value}>
                                                                        <Chip
                                                                                label={data.explanation}
                                                                                // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                                                                                className={classes.chip}
                                                                        />
                                                                </li>

                                                        ))
                                                        :
                                                        <Skeleton animation="wave" />

                                        }

                                </Paper>




                        </React.Fragment>

                </div>


        );


};


export default Tagchip;