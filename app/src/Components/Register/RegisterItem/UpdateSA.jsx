import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styles from './RegisterItemStyle';
import { Controller, useFormContext } from 'react-hook-form';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import getApi from '../../../Utils/Api/getApi';


const useStyles = makeStyles(styles);

const UpdateSA = () => {
        const { userid } = useSelector(userSelector);
        const handleRegister = async (e) => {
                const data = { user_id: userid, brokerId: e.target.brokerId.value, securitiesAccount: e.target.securitiesAccount.value, securitiesPassword: e.target.securitiesPassword.value }
                console.log(data, "updatevalue")
                const response = await getApi.post("/update_SA", data)
                alert("輸入完成,請重新登入")
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

                                                <h3>第二部分:建立乙太坊帳號(optional!!!)</h3>
                                                <FormControl className={classes.formControl2}>
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
                                                <p>證券帳號:</p>
                                                <input type="text" name="securitiesAccount" />
                                                <p>建立密碼:</p>
                                                <input type="text" name="securitiesPassword" />
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Button variant="contained" color="primary" component={Link} to='/normal-member-home'>返回</Button>
                                                        <button type="summit" variant="contained" >Summit</button>
                                                </div>
                                        </div>

                                </form>

                                <br></br>
                        </div>
                </React.Fragment >
        )
};

export default UpdateSA;
