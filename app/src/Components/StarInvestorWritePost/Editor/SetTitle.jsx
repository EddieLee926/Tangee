import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import { SetPostTitle } from './SetTitleLogic.js';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import getApi from '../../../Utils/Api/getApi.js';
import { GeneralButton } from '../../General/CustomButton/CustomButton.jsx';

const useStyles = makeStyles((theme) => ({
    title: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiButton-root': {
            width: 135,
            height: 'fit-content',
        },
        '& .MuiFormControl-root': {
            marginRight: 28,
        },
    },
}));

const SetTitle = (props) => {
    const { postId, handleSelectedInput } = props;
    const { userid } = useSelector(userSelector);
    const classes = useStyles();
    const [amount, setAmount] = useState('');
    useEffect(() => {
        const getArticleTitle = async () => {
            const response = await getApi.post('/article/get-edit-title', {
                postId: postId,
            });
            setAmount(response.data[0]);
            // console.log(response.data[0].title, "title喔")
        };
        getArticleTitle();
    }, []);
    const clickHandle = () => {
        var data = {
            post_id: postId,
            user_id: userid,
            // title: JSON.stringify(JSON.parse(amount))
            title: amount,
        };
        // console.log(data, 'aaa');
        if (window.confirm('是否確定修改文章標題?')) {
            SetPostTitle(data).then((result) => {
                alert(result.data);
            });
        }
    };

    const handleChange = (event) => {
        setAmount(event.target.value);
    };
    return (
        <>
            <div className={classes.title}>
                <FormControl className={classes.margin} variant='outlined' fullWidth>
                    <OutlinedInput
                        id='outlined-adornment-amount'
                        value={amount ? amount.title : ''}
                        onChange={handleChange}
                        onFocus={() => handleSelectedInput(0)}
                    />
                </FormControl>
                <GeneralButton category='normal' onClick={clickHandle}>
                    修改文章標題
                </GeneralButton>
            </div>
        </>
    );
};

export default SetTitle;
