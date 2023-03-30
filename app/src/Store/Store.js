import { configureStore } from '@reduxjs/toolkit';
import QuorumNodesReducer from '../Reducer/QuorumNodes/QuorumNodesSlice';
import UserReducer from '../Reducer/User/UserSlice';

const store = configureStore({
    reducer: {
        quorumNodes: QuorumNodesReducer,
        user: UserReducer
    }
})

export default store;
