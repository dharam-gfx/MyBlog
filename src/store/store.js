import { configureStore} from '@reduxjs/toolkit';
import {AuthReducer} from '../features/AuthSlice'
const store = configureStore({
    reducer:{
        AuthReducer
    }
})

export default store