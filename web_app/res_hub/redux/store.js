import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {persistReducer, persistStore} from 'redux-persist';
import { appApi } from '../api/app_api';
import { authApi } from '../api/auth_api';


const storage = { getItem: (key) => { 
    return Promise.resolve(localStorage.getItem(key)); },
     setItem: (key, value) => { localStorage.setItem(key, value); 
        return Promise.resolve(value); }, 
        removeItem: (key) => { localStorage.removeItem(key); return Promise.resolve(); }, };

const appReducer = combineReducers({
    [appApi.reducerPath]: appApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
})

const rootReducer = (state,action)=>{
    if (action.type === 'RESET_STORE') {
        state = undefined;
    }

    return appReducer(state, action);
}

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist:[appApi.reducerPath, authApi.reducerPath]
}

const persistedState=persistReducer(persistConfig,rootReducer)
export const store=configureStore({

    reducer:persistedState,

    middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare({
        serializableCheck:false,
        immutableCheck: false
    }).concat(appApi.middleware, authApi.middleware)
})

export const persistor=persistStore(store)
setupListeners(store.dispatch);
