import React, { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './TagStyle';
import getApi from '../../../Utils/Api/getApi';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(styles);

const GenerateTag = ({ num }) => {
    const classes = useStyles();
    const { control } = useFormContext();
    // const tag_array = Array(num)
    //     .fill()
    //     .map((num, index) => index + 1);
    const [chipData, setChipData] = useState();
    const [selectedchip, setselectedChip] = useState([]);

    useEffect(() => {
        const getSelectItem = async () => {
            const response = await getApi.post('/tag');
            console.log(response, 'uuu');
            setChipData(response.data);
            console.log(setChipData(response.data), '哈哈');
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
    const [clickedChip, setclickedChip] = useState(false);

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

    return (
        <>
            <div>
                {/* {tag_array.map((num) => {
                return <Tag key={num} num={num} />;
            })} */}

                <Typography variant='h3' align='center'>
                    第四部份:選擇您感興趣的產業標籤
                </Typography>
                <div className={classes.chipContainer}>
                    {chipData ? (
                        chipData.map((data) => (
                            <Chip
                                id={`${data.value}`}
                                label={data.explanation}
                                onClick={handleAddChip(data)}
                                //icon={<DoneIcon />}
                                className={classes.chip}
                                value={data.value}
                                className={
                                    clickedChip ? classes.chipSelected : classes.chip
                                }
                            />
                        ))
                    ) : (
                        <Skeleton animation='wave' />
                    )}
                </div>
                <div>
                    <Typography variant='h3' align='center'>
                        您選擇的標籤
                    </Typography>
                    <div className={classes.chipContainer}>
                        {selectedchip ? (
                            <FormControl
                                variant='outlined'
                                className={classes.formControl}
                            >
                                {selectedchip.map((data) => (
                                    <Controller
                                        control={control}
                                        name={`tag_${data.value}`}
                                        render={({ field }) => (
                                            <Chip
                                                id={`${data.value}`}
                                                label={data.explanation}
                                                color={'primary'}
                                                className={classes.chipSelected}
                                                onDelete={handleDelete(data)}
                                                {...field}
                                            />
                                        )}
                                    />
                                ))}
                            </FormControl>
                        ) : (
                            <Skeleton animation='wave' />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default GenerateTag;
