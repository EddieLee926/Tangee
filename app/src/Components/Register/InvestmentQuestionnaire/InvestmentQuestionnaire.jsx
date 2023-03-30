import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styles from './InvestmentQuestionnaireStyle';
import { Controller, useFormContext } from 'react-hook-form';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles(styles);

const InvestmentQuestionnaire = () => {
    // const { control } = useFormContext();
    const {
        register,
        formState: { errors },
    } = useFormContext();
    // const classes = useStyles();
    const classes = useStyles();
    return (
        <div>
            <Typography variant='h3' align='center'>
                第三部分:投資習慣問卷調查
            </Typography>
            <div className={classes.firstLine}>
                <FormControl
                    variant='outlined'
                    error={errors.type ? true : false}
                    className={classes.inputField}
                    margin='normal'
                    fullWidth
                >
                    <InputLabel id='demo-simple-select-outlined-label'>
                        Q1:請問您的投資風格是?
                    </InputLabel>
                    <Select
                        {...register('type')}
                        label='Q1:請問您的投資風格是?'
                        labelId='demo-simple-select-outlined-label'
                    >
                        <MenuItem value='激進'>激進</MenuItem>
                        <MenuItem value='保守'>保守</MenuItem>
                        <MenuItem value='適中'>適中</MenuItem>
                    </Select>
                    {errors.type && (
                        <FormHelperText>{errors.type.message}</FormHelperText>
                    )}
                </FormControl>
            </div>
            <div className={classes.firstLine}>
                <FormControl
                    variant='outlined'
                    error={errors.frequency ? true : false}
                    className={classes.inputField}
                    margin='normal'
                    fullWidth
                >
                    <InputLabel id='demo-simple-select-outlined-label'>
                        Q2:請問您的操作週期是?
                    </InputLabel>
                    <Select
                        {...register('frequency')}
                        label='Q2:請問您的操作週期是?'
                        labelId='demo-simple-select-outlined-label'
                    >
                        <MenuItem value='一個禮拜以下'>一個禮拜以下</MenuItem>
                        <MenuItem value='一個禮拜至一個月'>一個禮拜至一個月</MenuItem>
                        <MenuItem value='一個月以上'>一個月以上</MenuItem>
                    </Select>
                    {errors.frequency && (
                        <FormHelperText>{errors.frequency.message}</FormHelperText>
                    )}
                </FormControl>
            </div>
            <div className={classes.firstLine}>
                <FormControl
                    variant='outlined'
                    error={errors.consider ? true : false}
                    className={classes.inputField}
                    margin='normal'
                    fullWidth
                >
                    <InputLabel id='demo-simple-select-outlined-label'>
                        Q3:請問您投資金融商品最主要的考量因素為何？
                    </InputLabel>
                    <Select
                        {...register('consider')}
                        label='Q3:請問您投資金融商品最主要的考量因素為何？'
                        labelId='demo-simple-select-outlined-label'
                    >
                        <MenuItem value='追求總投資報酬最大'>追求總投資報酬最大</MenuItem>
                        <MenuItem value='賺取固定的利息收益'>賺取固定的利息收益</MenuItem>
                        <MenuItem value='保持資產的流動性'>保持資產的流動性</MenuItem>
                        <MenuItem value='保本'>保本</MenuItem>
                    </Select>
                    {errors.consider && (
                        <FormHelperText>{errors.consider.message}</FormHelperText>
                    )}
                </FormControl>
            </div>
            <div className={classes.firstLine}>
                <FormControl
                    variant='outlined'
                    error={errors.experience ? true : false}
                    className={classes.inputField}
                    margin='normal'
                    fullWidth
                >
                    <InputLabel id='demo-simple-select-outlined-label'>
                        Q4:請問您的投資經驗為何？
                    </InputLabel>
                    <Select
                        {...register('experience')}
                        label='Q4:請問您的投資經驗為何？'
                        labelId='demo-simple-select-outlined-label'
                    >
                        <MenuItem value='沒有經驗'>沒有經驗</MenuItem>
                        <MenuItem value='1 〜 3 年'>1 〜 3 年</MenuItem>
                        <MenuItem value='4 〜 6 年'>4 〜 6 年</MenuItem>
                        <MenuItem value='6 年以上'>6 年以上</MenuItem>
                    </Select>
                    {errors.experience && (
                        <FormHelperText>{errors.experience.message}</FormHelperText>
                    )}
                </FormControl>
            </div>
            <div className={classes.firstLine}>
                <FormControl
                    variant='outlined'
                    error={errors.fluctuation ? true : false}
                    className={classes.inputField}
                    margin='normal'
                    fullWidth
                >
                    <InputLabel id='demo-simple-select-outlined-label'>
                        Q5:在一般情況下，您所能接受之價格波動，大約在那種程度？
                    </InputLabel>
                    <Select
                        {...register('fluctuation')}
                        label='Q5:在一般情況下，您所能接受之價格波動，大約在那種程度？'
                        labelId='demo-simple-select-outlined-label'
                    >
                        <MenuItem value='價格波動介於-5% 〜 +5%之間'>
                            價格波動介於-5% 〜 +5%之間
                        </MenuItem>
                        <MenuItem value='價格波動介於-10% 〜 +10%之間'>
                            價格波動介於-10% 〜 +10%之間
                        </MenuItem>
                        <MenuItem value='價格波動介於-15% 〜 +15%之間'>
                            價格波動介於-15% 〜 +15%之間
                        </MenuItem>
                        <MenuItem value='價格波動超過±15% '>價格波動超過±15% </MenuItem>
                    </Select>
                    {errors.fluctuation && (
                        <FormHelperText>{errors.fluctuation.message}</FormHelperText>
                    )}
                </FormControl>
            </div>
            <div className={classes.firstLine}>
                <FormControl
                    variant='outlined'
                    error={errors.action ? true : false}
                    className={classes.inputField}
                    margin='normal'
                    fullWidth
                >
                    <InputLabel id='demo-simple-select-outlined-label'>
                        Q6:當您的投資超過預設的停損或停利點時，請問您會採取那種處置方式？
                    </InputLabel>
                    <Select
                        {...register('action')}
                        label='Q6:當您的投資超過預設的停損或停利點時，請問您會採取那種處置方式？'
                        labelId='demo-simple-select-outlined-label'
                    >
                        <MenuItem value='立即賣出所有部位'>立即賣出所有部位</MenuItem>
                        <MenuItem value='先賣出一半或一半以上部位'>
                            先賣出一半或一半以上部位
                        </MenuItem>
                        <MenuItem value='暫時觀望，視情況再因應'>
                            暫時觀望，視情況再因應
                        </MenuItem>
                        <MenuItem value='繼續持有至回本或不漲為止'>
                            繼續持有至回本或不漲為止
                        </MenuItem>
                    </Select>
                    {errors.action && (
                        <FormHelperText>{errors.action.message}</FormHelperText>
                    )}
                </FormControl>
            </div>
        </div>
    );
};

export default InvestmentQuestionnaire;
