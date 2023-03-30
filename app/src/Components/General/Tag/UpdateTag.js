import React, { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toogleTag, toogleTagChinese } from '../../../Reducer/User/UserSlice.js';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './UpdateTagStyle';
import getApi from '../../../Utils/Api/getApi';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import { GeneralButton } from '../CustomButton/CustomButton';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles(styles);

const UpdateTag = (props) => {
    const { id } = props;
    const classes = useStyles();
    const [chipData, setChipData] = useState();
    const [selectedchip, setselectedChip] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const getSelectItem = async () => {
            const responseAll = await getApi.post('/tag');
            const response = await getApi.post('/getUserTag', id);
            var allTag = responseAll.data;
            var selectTag = response.data;

            console.log(allTag, selectTag);
            selectTag.forEach((element) => {
                allTag = allTag.filter(function (item, index, array) {
                    return item.explanation != element.explanation;
                });

                console.log(allTag);
            });
            setChipData(allTag);
            setselectedChip(selectTag);
        };

        getSelectItem();
    }, []);

    const handleDelete = (chipToSelect) => () => {
        var newselectedChip = selectedchip.filter(function (item, index, array) {
            return item.value != chipToSelect.value;
        });
        setselectedChip(newselectedChip);
        var tagg = chipData;
        tagg.push(chipToSelect);
        setChipData(tagg);
    };

    const handleAddChip = (chipToSelect) => () => {
        var tagg = selectedchip;
        if (tagg.length < 3) {
            tagg.push(chipToSelect);
            setselectedChip(tagg);
            var newChip = chipData.filter(function (item, index, array) {
                return item.value != chipToSelect.value;
            });
            setChipData(newChip);
        } else {
            alert('標籤最多只能選三個呦~不好意思!');
        }
    };
    const clickHandle = async () => {
        console.log('要送出的喔喔喔', selectedchip);
        var tagString = '';
        var tagChinese = []
        selectedchip.forEach((element) => {
            tagString += ',' + element.value;
            tagChinese.push(element.explanation)
        });
        console.log(tagString);
        tagString += ','
        const data = { tagString: tagString, id: id };
        console.log(data, '更新tag的data');

        const response = await getApi.post('/updateUserTag', data);
        alert('已更新');

        var setItem = JSON.parse(localStorage.getItem('user_id'))
        setItem.tag = tagString
        setItem.tag_chinese = tagChinese
        console.log(setItem)
        localStorage.setItem('user_id', JSON.stringify(setItem));
        dispatch(toogleTag(tagString));
        dispatch(toogleTagChinese(tagChinese));

    };

    return (
        <>
            <div>
                <div className={classes.title}>請選擇您喜愛的標籤</div>
                {chipData ? (
                    chipData.map((data) => (
                        <Chip
                            id={`${data.value}`}
                            label={data.explanation}
                            onClick={handleAddChip(data)}
                            className={classes.chip}
                            value={data.value}
                        />
                    ))
                ) : (
                    <Skeleton animation='wave' />
                )}
                <div className={classes.selectedTag}>
                    <div className={classes.title}>您選擇的標籤</div>
                    {selectedchip ? (
                        selectedchip.map((data) => (
                            <Chip
                                id={`${data.value}`}
                                label={data.explanation}
                                // color={"secondary"}
                                className={classes.chipSelected}
                                onDelete={handleDelete(data)}
                            />
                        ))
                    ) : (
                        <Skeleton animation='wave' />
                    )}
                </div>
                <GeneralButton category='normal' onClick={clickHandle}>
                    修改tag
                </GeneralButton>
            </div>
        </>
    );
};

export default UpdateTag;
