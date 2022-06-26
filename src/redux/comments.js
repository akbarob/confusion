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
            Comment.id = state.Comments.length;
            Comment.date = new Date().toISOString();
            console.log("Comment: ", Comment);
            console.log(state.Comments.concat(Comment))
            return {...state, Comments: state.Comments.concat(Comment)};
            
        default:
            return state;
    };
}