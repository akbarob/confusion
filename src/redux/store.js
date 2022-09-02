import { configureStore } from '@reduxjs/toolkit';
import { Promotions } from './promotions';
import { Dishes } from './dishes';
import { Leaders } from './leaders';
import { Comments } from './comments';
import { Auth } from './auth';
import logger from 'redux-logger';
import { createForms } from "react-redux-form";
import { InitialFeedback } from './forms';
import { InitialLogin } from './loginModal';
import { InitailReserve } from './Reserve';

import * as ActionTypes from "./ActionTypes";
import { InitialSignup } from './signupModal';


const store = configureStore({
    reducer:{
        Dishes,
        Promotions,
        Leaders,
        Comments,
        auth: Auth,
        ...createForms({
            feedback: InitialFeedback,
            login: InitialLogin,
            reserve: InitailReserve,
            signup: InitialSignup
        })
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck:  false,
        immutableCheck: false
        
        
    }).concat(logger)

    
},
)

export default store