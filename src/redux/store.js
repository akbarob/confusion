import { configureStore } from '@reduxjs/toolkit';
import { Promotions } from './promotions';
import { Dishes } from './dishes';
import { Leaders } from './leaders';
import { Comments } from './comments';





const store = configureStore({
    reducer:{
        Dishes,
        Promotions,
        Leaders,
        Comments
    }
    
})

export default store