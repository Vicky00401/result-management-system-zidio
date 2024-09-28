import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/useraccount'

export const store = configureStore({
    reducer:{
        userd:userReducer
    }
}) 