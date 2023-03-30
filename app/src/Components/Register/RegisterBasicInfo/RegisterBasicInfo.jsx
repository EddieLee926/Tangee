import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useFormContext } from 'react-hook-form';
import styles from './RegisterBasicInfoStyle';
const useStyles = makeStyles(styles);

const RegisterBasicInfo = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const classes = useStyles();

    return (
        <div>
            <Typography variant='h3' align='center'>
                第一部分:填寫基本資料
            </Typography>
            <div className={classes.firstLine}>
                <TextField
                    {...register('name')}
                    id='name'
                    label='姓名'
                    className={classes.inputField}
                    error={errors.name ? true : false}
                    helperText={errors.name?.message}
                    margin='normal'
                    variant='outlined'
                    required
                />
                <TextField
                    {...register('nick_name')}
                    id='nick_name'
                    variant='outlined'
                    label='暱稱'
                    className={classes.inputField}
                    margin='normal'
                    error={errors.nick_name ? true : false}
                    helperText={errors.nick_name?.message}
                    required
                />
            </div>
            <div className={classes.secondLine}>
                <FormControl
                    variant='outlined'
                    error={errors.gender ? true : false}
                    className={classes.inputField}
                    margin='normal'
                >
                    <InputLabel id='demo-simple-select-outlined-label'>性別</InputLabel>
                    <Select
                        {...register('gender')}
                        label='性別'
                        labelId='demo-simple-select-outlined-label'
                    >
                        <MenuItem value='male'>男性</MenuItem>
                        <MenuItem value='female'>女性</MenuItem>
                        <MenuItem value='other'>其他</MenuItem>
                    </Select>
                    {errors.gender && (
                        <FormHelperText>{errors.gender.message}</FormHelperText>
                    )}
                </FormControl>
                <TextField
                    {...register('birth')}
                    id='birth'
                    label='birth'
                    type='date'
                    variant='outlined'
                    margin='normal'
                    error={errors.birth ? true : false}
                    helperText={
                        errors.birth
                            ? errors.birth.message.length > 10
                                ? '請輸入正確日期格式'
                                : errors.birth.message
                            : ''
                    }
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.dateField}
                    required
                />
                <TextField
                    {...register('email')}
                    id='email'
                    label='email'
                    error={errors.email ? true : false}
                    helperText={errors.email?.message}
                    margin='normal'
                    variant='outlined'
                    className={classes.emailField}
                    required
                />
            </div>

            <TextField
                {...register('account')}
                id='account'
                label='帳號'
                className={classes.inputField}
                error={errors.account ? true : false}
                helperText={errors.account?.message}
                fullWidth
                margin='normal'
                variant='outlined'
                required
            />
            <TextField
                {...register('password')}
                id='password'
                label='密碼'
                className={classes.inputField}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
                fullWidth
                margin='normal'
                variant='outlined'
                required
            />
        </div>
    );
};

export default RegisterBasicInfo;
