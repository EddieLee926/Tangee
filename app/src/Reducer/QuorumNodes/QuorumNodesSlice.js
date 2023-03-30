import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Web3 from 'web3';
import getApi from '../../Utils/Api/getApi';

export const quorumNodeSettings = createAsyncThunk(
    'quorumNodes/settings',
    async (data) => {
        const response = await getApi.post('getData/quorum-settings', data);
        if (response.status === 200) {
            localStorage.setItem('quorumNodes', JSON.stringify(response.data[0]));
            return response.data[0];
        }
    }
);

const quorumNodesSlice = createSlice({
    name: 'quorumNodes',
    initialState: {
        //default institution addr & provider
        institutionAddress: '0x066386aAF37574F3B2e1Ec37E826Ca971acEF0F8',
        currentProvider: localStorage.getItem('quorumNodes')
            ? JSON.parse(localStorage.getItem('quorumNodes')).web_socket_conn
            : 'ws://140.119.19.14:23000',
        brokerIdAddress: localStorage.getItem('quorumNodes')
            ? JSON.parse(localStorage.getItem('quorumNodes')).brokerId_addr
            : '',
        web3: localStorage.getItem('quorumNodes')
            ? new Web3(JSON.parse(localStorage.getItem('quorumNodes')).web_socket_conn)
            : new Web3('ws://140.119.19.14:23000'),
    },
    reducers: {
        //normal reducer without async logic
        setCurrentProvider(state, action) {
            state.currentProvider = action.payload;
        },
        setBrokerIdAddress(state, action) {
            state.brokerIdAddress = action.payload;
        },
        initWeb3(state, action) {
            state.web3 = new Web3(action.payload);
        },
    },
    extraReducers: {
        [quorumNodeSettings.fulfilled]: (state, { payload }) => {
            state.currentProvider = payload.web_socket_conn;
            state.brokerIdAddress = payload.brokerId_addr;
            state.web3 = new Web3(payload.web_socket_conn);
        },
    },
});

export const { setCurrentProvider, setBrokerIdAddress, initWeb3 } =
    quorumNodesSlice.actions;

export const quorumNodesSelector = (state) => state.quorumNodes;

export default quorumNodesSlice.reducer;
