import * as ActionTypes from './ActionTypes';

export const Promotions = (state = {
    isLoading: true,
    errMess: null,
    Promotions:[],
}, action) =>{
    switch(action.type){
        case ActionTypes.ADD_PROMOS:
            return{...state,
                isLoading:false,
                errMess:null,
                Promotions:action.payload
            }

        case ActionTypes.PROMOS_LOADING:
            return{...state,
                isLoading:true,
                errMess:null,
                Promotions:[]
            }

        case ActionTypes.PROMOS_FAILED:
            return{...state,
                isLoading:false,
                errMess: action.payload,
                Promotions:[]
            }
        default:
            return state
    }
}