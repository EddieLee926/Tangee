import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from 'web3';

const initialState = {
    accountAddress: '',
    userID: '7',
    isLogIn: false,
    isStarInvestor: false,
    brokerId: 'A',
    securitiesAccount: 'nccu123'
}

export const getAccountAddress = createAsyncThunk(
    'accounts/getAccountAddress',
    async () => {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const account_address = await web3.eth.getAccounts();
        return account_address;
    }
)

const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        //normal reducer without async logic
        toggleLogIn(state, action) {
            state.isLogIn = !state.isLogIn;
        },
        toogleStarInvestor(state, action) {
            state.isStarInvestor = !state.isStarInvestor;
        }
    },
    // async logic must be defined in thunk
    extraReducers: builder => {
        builder
            .addCase(getAccountAddress.fulfilled, (state, action) => {
                state.accountAddress = action.payload;
            })
    }
})

export const { toggleLogIn, toogleStarInvestor } = accountsSlice.actions;

export default accountsSlice.reducer;
