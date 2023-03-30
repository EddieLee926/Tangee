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
import styles from './TagStyle';
import getApi from '../../../Utils/Api/getApi';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import DoneIcon from '@material-ui/icons/Done';


const useStyles = makeStyles(styles);

const Tag = ({ num }) => {
        const classes = useStyles();
        const { control } = useFormContext();
        const [selectItems, setSelectItems] = useState();
        const [selectTag, setSelectTag] = useState(0);
        const [isFetching, setIsFetching] = useState(true);
        useEffect(() => {
                const getSelectItems = async () => {
                        const response = await getApi.post('/tag');
                        response.data.length == 0
                                ? setSelectItems('')
                                : setSelectItems(response.data);
                        setIsFetching(false);
                };
                getSelectItems();
        }, []);

        const handleChange = (event) => {
                console.log(selectTag);
                setSelectTag(event.target.value);
        };

        if (isFetching) {
                return <Skeleton variant='rect' width={120} height={56} />;
        }

        return (
                <div>
                        {selectItems ? (
                                <FormControl variant='outlined' className={classes.formControl}>
                                        <InputLabel id={`tag_${num}`}>選擇Tag</InputLabel>
                                        <Controller
                                                control={control}
                                                name={`tag_${num}`}
                                                defaultValue='0'
                                                render={({ field }) => (
                                                        <Select
                                                                labelId={`tag_${num}`}
                                                                label='股票'
                                                                {...field}
                                                        >
                                                                <MenuItem key='0' value='0'>
                                                                        選擇Tag
                                                                </MenuItem>
                                                                {selectItems.map((item) => (
                                                                        <MenuItem
                                                                                key={item.explanation}
                                                                                value={`,${item.value}`}
                                                                        >
                                                                                {item.explanation}
                                                                        </MenuItem>
                                                                ))}
                                                        </Select>
                                                )}
                                        />
                                </FormControl>
                        ) : (
                                <FormControl
                                        variant='outlined'
                                        className={classes.formControl}
                                        disabled
                                >
                                        <InputLabel id='disabled-label'>選擇Tag</InputLabel>
                                        <Select labelId='disabled-label' id='disabled'></Select>
                                </FormControl>
                        )}
                </div>

        );
};

// 若到時候要排版 可能就不用GenerateTag
// 直接在Register <Tag key={num} num={num} />
const GenerateTag = ({ num }) => {
        const classes = useStyles();
        const tag_array = Array(num)
                .fill()
                .map((num, index) => index + 1);
        const [chipData, setChipData] = useState();
        const [number, setNumber] = useState(0);
        const [selectedchip, setselectedChip] = useState([]);



        useEffect(() => {
                const getSelectItem = async () => {
                        const response = await getApi.post('/tag');
                        console.log(response, "uuu")
                        setChipData(response.data)
                        console.log(setChipData(response.data), "哈哈")
                };
                getSelectItem();
        },
                []);

        // useEffect(() => {
        //     setNumber(selectedchip.length)
        //     console.log("hi")

        // },
        //     [selectedchip.length]);

        var tagg = selectedchip;
        const handleDelete = (chipToSelect) => () => {
                setclickedChip(false)
                tagg.pop(chipToSelect)
                setselectedChip(tagg)
                console.log(tagg, "tagg")
                console.log(chipToSelect, "回傳")
                console.log(selectedchip, " setselectedChip222")

        };
        const [clickedChip, setclickedChip] = useState(false);

        const handleAddChip = (chipToSelect) => () => {
                //setclickedChip(true)
                // var chips = chipData
                // chips = chipData.filter((chip) => chip.key == chipToSelect.key);
                console.log(chipToSelect);
                tagg.push(chipToSelect)
                setselectedChip(tagg)
                console.log(selectedchip, " setselectedChip喔")

        };

        return <>
                <div>
                        {tag_array.map((num) => {
                                return <Tag key={num} num={num} />;
                        })}
                        chip-demo

                        <Paper component="ul" className={classes.root}>
                                {
                                        chipData ?
                                                chipData.map((data) => (
                                                        <li key={data.value}>
                                                                <Chip
                                                                        id={`${data.value}`}
                                                                        label={data.explanation}
                                                                        color={clickedChip ? "primary" : "secondary"}
                                                                        onClick={handleAddChip(data)}
                                                                        className={classes.chip}
                                                                        value={data.value}
                                                                        onDelete={handleDelete(data.value)}
                                                                        className={clickedChip ? classes.chipSelected : classes.chip}

                                                                />
                                                        </li>

                                                ))
                                                :
                                                <Skeleton animation="wave" />
                                }
                        </Paper>

                </div>


        </>
};

export default GenerateTag;