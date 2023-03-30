import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
// import styles from "./InvestmentQuestionnaireStyle";
import { Controller, useFormContext } from "react-hook-form";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './ShareDateStyle';
const useStyles = makeStyles(styles);

const ShareDate = () => {
        const {
                control,
                register,
                formState: { errors },
        } = useFormContext();
        const classes = useStyles();
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
        return (
                <div
                >
                        <Typography variant='h3' align='center'>
                                第五部分:分享時間設定
                        </Typography>
                        {/* <div className={classes.secondLine}>
                                <FormControl
                                        variant='outlined'
                                        error={errors.brokerId ? true : false}
                                        className={classes.inputField}
                                        margin='dense'
                                        fullWidth
                                >
                                        <InputLabel id='demo-simple-select-outlined-label'> 您的所屬券商:</InputLabel>
                                        <Select
                                                {...register('brokerId')}
                                                label='brokerId'
                                                labelId='demo-simple-select-outlined-label'
                                        >
                                                <MenuItem value='A'>A</MenuItem>
                                                <MenuItem value='B'>B</MenuItem>
                                                <MenuItem value='C'>C</MenuItem>
                                        </Select>
                                        {errors.brokerId && (
                                                <FormHelperText>{errors.brokerId.message}</FormHelperText>
                                        )}
                                </FormControl>

                        </div>
                        <div className={classes.secondLine}>
                                <FormControl
                                        variant='outlined'
                                        error={errors.brokerId ? true : false}
                                        className={classes.inputField}
                                        margin='dense'
                                        fullWidth
                                >
                                        <InputLabel id='demo-simple-select-outlined-label'> 您的所屬券商:?</InputLabel>
                                        <Select
                                                {...register('brokerId')}
                                                label='brokerId'
                                                labelId='demo-simple-select-outlined-label'
                                        >
                                                <MenuItem value='A'>A</MenuItem>
                                                <MenuItem value='B'>B</MenuItem>
                                                <MenuItem value='C'>C</MenuItem>
                                        </Select>
                                        {errors.brokerId && (
                                                <FormHelperText>{errors.brokerId.message}</FormHelperText>
                                        )}
                                </FormControl>

                        </div> */}
                        <Controller
                                control={control}
                                name='StartDate'
                                render={({ field }) => (
                                        <FormControl className={classes.firstLine}>
                                                <InputLabel
                                                        shrink
                                                        htmlFor='age-native-label-placeholder'>
                                                        開始分享時間!
                                                </InputLabel>
                                                <NativeSelect name='StartDate'
                                                        error={errors.StartDate ? true : false}
                                                        helperText={errors.StartDate?.message}
                                                        InputLabelProps={{
                                                                shrink: true,
                                                        }}
                                                        required {...field}>
                                                        <option></option>
                                                        {
                                                                timeArray.map((time) => {
                                                                        return (
                                                                                <option
                                                                                        key={time.value}
                                                                                        value={time.value}
                                                                                >
                                                                                        {time.date}
                                                                                </option>
                                                                        )
                                                                })
                                                        }

                                                </NativeSelect>
                                                <FormHelperText></FormHelperText>
                                        </FormControl>
                                )}
                        />
                        <Controller
                                control={control}
                                name='subPrice'
                                render={({ field }) => (
                                        <TextField
                                                id='subPrice'
                                                label='訂閱金額'
                                                error={errors.subPrice ? true : false}
                                                helperText={errors.subPrice?.message}
                                                fullWidth
                                                margin='dense'
                                                variant='outlined'
                                                required
                                                {...field}
                                        />
                                )}
                        />

                </div>
        );
};

export default ShareDate;
