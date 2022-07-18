import * as ActionTypes from './ActionTypes';

export const Leaders = (state = {
    isLoading: true,
    errMess: null,
    Leaders:[],
}, action) =>{
    switch(action.type){
        case ActionTypes.ADD_LEADERS:
            return{...state,
                isLoading:false,
                errMess:null,
                Leaders:action.payload
            }

        case ActionTypes.LEADERS_LOADING:
            return{...state,
                isLoading:true,
                errMess:null,
                Leaders:[]
            }

        case ActionTypes.LEADERS_FAILED:
            return{...state,
                isLoading:false,
                errMess: action.payload,
                Leaders:[]
            }
        default:
            return state
    }
}