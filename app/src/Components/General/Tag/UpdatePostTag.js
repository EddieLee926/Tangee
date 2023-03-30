import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './UpdateTagStyle';
import getApi from '../../../Utils/Api/getApi';
import Chip from '@material-ui/core/Chip';
import { GeneralButton } from '../CustomButton/CustomButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(styles);

const UpdatePostTag = (props) => {
    const { id } = props;
    const classes = useStyles();
    const [chipData, setChipData] = useState();
    const [selectedchip, setselectedChip] = useState([]);

    useEffect(() => {
        const getSelectItem = async () => {
            const responseAll = await getApi.post('/tag');
            const response = await getApi.post('/article/getTag', id);
            var allTag = responseAll.data;
            var selectTag = response.data;

            //console.log(allTag, selectTag)
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
        //console.log("要送出的喔喔喔", selectedchip)
        var tagString = '';
        selectedchip.forEach((element) => {
            tagString += ',' + element.value;
        });
        //console.log(tagString + ',')
        const data = { tagString: tagString + ',', id: id };
        //console.log(data, "更新tag的data")

        const response = await getApi.post('/article/updateTag', data);
        alert('已更新');
    };

    return (
        <>
            <div>
                <Typography variant='h3'>請選擇文章適合的標籤</Typography>

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

                <div>
                    <Typography variant='h3'>您選擇的標籤</Typography>

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
                    {' '}
                    修改tag
                </GeneralButton>
                {/* <Button variant="contained" color="primary" onClick={clickHandle}>
                                修改tag
                        </Button> */}
            </div>
        </>
    );
};

export default UpdatePostTag;
