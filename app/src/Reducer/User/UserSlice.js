import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import getApi from '../../Utils/Api/getApi';

export const userLogin = createAsyncThunk(
    'user/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await getApi.post('/login', data);
            localStorage.setItem('user_id', JSON.stringify(response.data[0]));
            return response.data[0];
        } catch (err) {
            return rejectWithValue('帳號或密碼輸入錯誤，請重新輸入!');
        }
    }
);
export const userRegister = createAsyncThunk('user/register', async (data) => {
    const response = await getApi.post('/register-account', data);
    if (response.status === 200) {
        alert('請重新登入');
        return response.data[0];
    }
});
export const userRegister2 = createAsyncThunk('user/register2', async (data) => {
    const response = await getApi.post('/register-star', data);
    if (response.status === 200) {
        alert('請重新登入');
        return response.data[0];
    }
});

export const userLogout = createAction('userLogout');

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: JSON.parse(localStorage.getItem('user_id'))
            ? JSON.parse(localStorage.getItem('user_id')).nick_name
            : '',
        userid: JSON.parse(localStorage.getItem('user_id'))
            ? JSON.parse(localStorage.getItem('user_id')).user_id
            : '',
        brokerId: JSON.parse(localStorage.getItem('user_id'))
            ? JSON.parse(localStorage.getItem('user_id')).brokerId
            : '',
        securitiesAccount: JSON.parse(localStorage.getItem('user_id'))
            ? JSON.parse(localStorage.getItem('user_id')).securitiesAccount
            : '',
        isLogin: JSON.parse(localStorage.getItem('user_id')) ? true : false,
        isStarInvestor: JSON.parse(localStorage.getItem('user_id'))
            ? JSON.parse(localStorage.getItem('user_id')).status == 'star'
                ? true
                : false
            : '',
        isFetching: false,
        isError: false,
        errorMessage: '',
        broScheme: JSON.parse(localStorage.getItem('user_id'))
            ? JSON.parse(localStorage.getItem('user_id'))?.explanation
            : '',
        tag: JSON.parse(localStorage.getItem('user_id'))
            ? JSON.parse(localStorage.getItem('user_id'))?.tag
            : '',
        tag_chinese: JSON.parse(localStorage.getItem('user_id'))
            ? JSON.parse(localStorage.getItem('user_id'))?.tag_chinese
            : ''

    },
    reducers: {
        toggleLogIn(state, action) {
            state.isLogin = !state.isLogin;
        },
        toogleStarInvestor(state, action) {
            state.isStarInvestor = !state.isStarInvestor;
        },
        toogleTag(state, action) {
            state.tag = action.payload;
        },
        toogleTagChinese(state, action) {
            state.tag_chinese = action.payload;
        }
    },
    //another way to implement extraReducers
    extraReducers: {
        [userLogin.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.isError = false;
            state.isLogin = true;
            state.isFetching = false;
            state.isStarInvestor = payload.status === 'star' ? true : false;
            state.username = payload.name;
            state.userid = payload.user_id;
            state.brokerId = payload.brokerId;
            state.securitiesAccount = payload.securitiesAccount;
            state.broScheme = payload.explanation;
            state.tag = payload.tag;
            state.tag_chinese = payload.tag_chinese;
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.isError = true;
            state.errorMessage = payload;
        },
        [userLogout]: (state, action) => {
            state.isLogin = false;
            state.isFetching = false;
            state.isStarInvestor = false;
            state.username = '';
            state.userid = '';
            state.brokerId = '';
            state.securitiesAccount = '';
            state.broScheme = '';
            state.tag = '';
        },
    },
});

export const { toggleLogIn, toogleStarInvestor, toogleTag, toogleTagChinese } = userSlice.actions;

export const userSelector = (state) => state.user;

export default userSlice.reducer;
