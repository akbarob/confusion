import * as ActionTypes from './ActionTypes';

export const Comments=(state={
    errMess:null,
    Comments:[]
} ,action) => {
    switch(action.type){
        case ActionTypes.ADD_COMMENTS:
            return{...state,
                isLoading:false,
                errMess:null,
                Comments:action.payload
            }
        case ActionTypes.COMMENTS_FAILED:
            return{...state,
                isLoading:false,
                errMess: action.payload,
                Comments:[]
            }
        case ActionTypes.ADD_COMMENT:
            var Comment = action.payload;
            return {...state, Comments: state.Comments.concat(Comment)};
        case ActionTypes.DELETE_COMMENT:
            return{
                id:action.payload
            }
        default:
            return state;
    };
}