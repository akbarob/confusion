import { configureStore } from '@reduxjs/toolkit';
import { Promotions } from './promotions';
import { Dishes } from './dishes';
import { Leaders } from './leaders';
import { Comments } from './comments';
import logger from 'redux-logger';






const store = configureStore({
    reducer:{
        Dishes,
        Promotions,
        Leaders,
        Comments
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)

    
},
)

export default store