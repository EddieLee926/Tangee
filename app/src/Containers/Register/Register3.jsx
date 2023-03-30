import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import getApi from '../../Utils/Api/getApi';
import { history } from '../../Helper/history.js';
import { initWeb3 } from '../../Reducer/QuorumNodes/QuorumNodesSlice.js';
import { userRegister2 } from '../../Reducer/User/UserSlice.js';
import { Link } from 'react-router-dom';
import getDataLogic from './RegisterLogic.js';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const Register3 = () => {
        const dispatch = useDispatch()
        const handleRegister = e => {

                const data = {
                        name: e.target.name.value,
                        nick_name: e.target.nick_name.value,
                        email: e.target.email.value,
                        account: e.target.account.value,
                        password: e.target.password.value,
                        type: e.target.type.value,
                        frequency: e.target.frequency.value,
                        consider: e.target.consider.value,
                        experience: e.target.experience.value,
                        fluctuation: e.target.fluctuation.value,
                        action: e.target.action.value,
                        brokerIdAddress: e.target.brokerIdAddress.value,
                        brokerId: e.target.brokerId.value,
                        securitiesAccount: e.target.securitiesAccount.value,
                        birth: e.target.birth.value,


                };
                dispatch(userRegister(data))
                alert("資料輸入完成")
                history.push("/login")

        }
        const useStyles = makeStyles(theme => ({
                formControl: {
                        margin: theme.spacing(1),
                        minWidth: 530,
                },
                formControl2: {
                        margin: theme.spacing(1),
                        minWidth: 150,
                },
                selectEmpty: {
                        marginTop: theme.spacing(2),
                },
                container: {
                        display: 'flex',
                        flexWrap: 'wrap',
                },
                textField: {
                        marginLeft: theme.spacing(1),
                        marginRight: theme.spacing(1),
                        width: 180,
                },
        }));
        const classes = useStyles();


        return (
                <React.Fragment>
                        <div>
                                <form onSubmit={handleRegister}>
                                        <h3>REGISTER</h3>
                                        <div style={{
                                                backgroundColor: 'whitesmoke',
                                                width: '280px',
                                                height: '550px',
                                                float: 'left'
                                        }}>
                                                <h3>第一部分:建立基本資料</h3>
                                                <p>姓名:</p>
                                                <input type="text" name="name" />
                                                <p>匿稱:</p>
                                                <input type="text" name="nick_name" />
                                                <p>生日: </p>

                                                <TextField
                                                        id="date"
                                                        label=" "
                                                        type="date"
                                                        name="birth"
                                                        defaultValue="2000-08-19"
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                                shrink: true,
                                                        }}
                                                />
                                                <p>email:</p>
                                                <input type="text" name="email" />
                                                <p>帳號名稱:</p>
                                                <input type="text" name="account" />
                                                <p>密碼:</p>
                                                <input type="text" name="password" />
                                        </div>
                                        <div style={{
                                                backgroundColor: 'white',
                                                width: '80px',
                                                height: '550px',
                                                float: 'left'
                                        }}> </div>
                                        <div style={{
                                                backgroundColor: 'whitesmoke',
                                                width: '300px',
                                                height: '550px',
                                                float: 'left'
                                        }}>
                                                <h3>第二部分:建立乙太坊帳號(optional!!!)</h3>
                                                <FormControl className={classes.formControl2}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                是否建立???
                                                        </InputLabel>
                                                        <NativeSelect name="brokerIdAddress">
                                                                <option value=""></option>
                                                                <option value="3">是</option>
                                                                <option value="2">否(以下免填)</option>

                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                <FormControl className={classes.formControl2}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                所屬券商:
                                                        </InputLabel>
                                                        <NativeSelect name="brokerId">
                                                                <option value=""></option>
                                                                <option value="A">A</option>
                                                                <option value="B">B</option>

                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                {/* <p>所屬券商:</p>
                        <input type="text" name="brokerId" /> */}
                                                <p>證券帳號:</p>
                                                <input type="text" name="securitiesAccount" />
                                                <p>使用者暱稱:</p>
                                                <input type="text" name="???" />
                                                <p>建立密碼:</p>
                                                <input type="text" name="??" />
                                        </div>
                                        <div style={{
                                                backgroundColor: 'white',
                                                width: '60px',
                                                height: '550px',
                                                float: 'left'
                                        }}> </div>

                                        <div style={{
                                                backgroundColor: 'whitesmoke',
                                                width: '550px',
                                                height: '460px',
                                                float: 'left'
                                        }}>
                                                <h3>第三部分:問卷調查</h3>
                                                <FormControl className={classes.formControl}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                Q1:請問您的投資風格是?
                                                        </InputLabel>
                                                        <NativeSelect name="type">
                                                                <option value=""></option>
                                                                <option value="激進">激進</option>
                                                                <option value="適中">適中</option>
                                                                <option value="保守">保守</option>
                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                <div></div>
                                                <FormControl className={classes.formControl}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                Q2:請問您的操作週期是?
                                                        </InputLabel>
                                                        <NativeSelect name="frequency">
                                                                <option value=""></option>
                                                                <option value="一個禮拜以下">一個禮拜以下</option>
                                                                <option value="一個禮拜至一個月">一個禮拜至一個月</option>
                                                                <option value="一個月以上">一個月以上</option>
                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                <div></div>
                                                <FormControl className={classes.formControl}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                Q3:請問您投資金融商品最主要的考量因素為何？
                                                        </InputLabel>
                                                        <NativeSelect name="consider">
                                                                <option value=""></option>
                                                                <option value="追求總投資報酬最大">追求總投資報酬最大</option>
                                                                <option value="賺取固定的利息收益">賺取固定的利息收益</option>
                                                                <option value="保持資產的流動性">保持資產的流動性 </option>
                                                                <option value="保本">保本 </option>
                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                <div></div>
                                                <FormControl className={classes.formControl}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                Q4:請問您的投資經驗為何？
                                                        </InputLabel>
                                                        <NativeSelect name="experience">
                                                                <option value=""></option>
                                                                <option value="沒有經驗">沒有經驗</option>
                                                                <option value="1 〜 3 年">1 〜 3 年</option>
                                                                <option value="4 〜 6 年">4 〜 6 年 </option>
                                                                <option value="6 年以上">6 年以上 </option>
                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                <div></div>
                                                <FormControl className={classes.formControl}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                Q5:在一般情況下，您所能接受之價格波動，大約在那種程度？
                                                        </InputLabel>
                                                        <NativeSelect name="fluctuation">
                                                                <option value=""></option>
                                                                <option value="價格波動介於-5% 〜 +5%之間">價格波動介於-5% 〜 +5%之間</option>
                                                                <option value="價格波動介於-10% 〜 +10%之間">價格波動介於-10% 〜 +10%之間</option>
                                                                <option value="價格波動介於-15% 〜 +15%之間 ">價格波動介於-15% 〜 +15%之間 </option>
                                                                <option value="價格波動超過±15% ">價格波動超過±15% </option>
                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                <div></div>
                                                <FormControl className={classes.formControl}>
                                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                                Q6:當您的投資超過預設的停損或停利點時，請問您會採取那種處置方式？
                                                        </InputLabel>
                                                        <NativeSelect name="action">
                                                                <option value=""></option>
                                                                <option value="立即賣出所有部位">立即賣出所有部位</option>
                                                                <option value="先賣出一半或一半以上部位">先賣出一半或一半以上部位</option>
                                                                <option value="先賣出一半以內部位">先賣出一半以內部位 </option>
                                                                <option value="暫時觀望，視情況再因應 ">暫時觀望，視情況再因應 </option>
                                                                <option value="繼續持有至回本或不漲為止">繼續持有至回本或不漲為止</option>
                                                        </NativeSelect>
                                                        <FormHelperText></FormHelperText>
                                                </FormControl>
                                                <div><br></br></div>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Button variant="contained" color="primary" component={Link} to='/registerchoose'>返回</Button>
                                                        <button type="summit" variant="contained" >Summit</button>
                                                </div>
                                        </div>
                                </form>

                                <br></br>
                        </div>
                </React.Fragment >
        )
};

export default Register3;
