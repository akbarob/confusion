import { configureStore } from '@reduxjs/toolkit';
import { Promotions } from './promotions';
import { Dishes } from './dishes';
import { Leaders } from './leaders';
import { Comments } from './comments';
import logger from 'redux-logger';
import { createForms } from "react-redux-form";
import { InitialFeedback } from './forms';
import { InitialLogin } from './loginModal';



const store = configureStore({
    reducer:{
        Dishes,
        Promotions,
        Leaders,
        Comments,
        ...createForms({
            feedback: InitialFeedback,
            login: InitialLogin
        })
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)

    
},
)

export default store