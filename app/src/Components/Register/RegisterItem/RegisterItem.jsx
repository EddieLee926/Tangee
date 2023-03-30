import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styles from './RegisterItemStyle';
import { Controller, useFormContext } from 'react-hook-form';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(styles);

const RegisterItem = () => {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext();

    // const { control } = useFormContext();
    // const classes = useStyles();
    // const useStyles = makeStyles((theme) => ({
    //     formControl2: {
    //         margin: theme.spacing(1),
    //         minWidth: 150,
    //     },
    // }));
    const classes = useStyles();
    return (
        <div>
            <Typography variant='h3' align='center'>
                第二部分:註冊以太坊帳號
            </Typography>
            <div className={classes.secondLine}>
                <FormControl
                    variant='outlined'
                    error={errors.brokerId ? true : false}
                    className={classes.inputField}
                    margin='normal'
                    fullWidth
                >
                    <InputLabel id='demo-simple-select-outlined-label'>
                        您的所屬券商
                    </InputLabel>
                    <Select
                        {...register('brokerId')}
                        label='您的所屬券商'
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
            <div className={classes.firstLine}>
                <Controller
                    control={control}
                    name='securitiesAccount'
                    render={({ field }) => (
                        <TextField
                            id='account'
                            label='帳號名稱'
                            className={classes.inputField}
                            error={errors.securitiesAccount ? true : false}
                            helperText={errors.securitiesAccount?.message}
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            required
                            {...field}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='securitiespassword'
                    render={({ field }) => (
                        <TextField
                            id='password'
                            label='密碼'
                            className={classes.inputField}
                            error={errors.securitiespassword ? true : false}
                            helperText={errors.securitiespassword?.message}
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            required
                            {...field}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default RegisterItem;
