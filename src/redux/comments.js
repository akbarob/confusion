import {COMMENTS} from '../shared/Comments';
import * as ActionType from './ActionTypes';

export const Comments=(state=COMMENTS ,action) => {
    switch(action.type){
        case ActionType.ADD_COMMENT:
            var Comment = action.payload;
            Comment.id = state.length;
            Comment.date = new Date().toISOString();
            console.log("Comment: ", Comment);
            console.log("ran")
            console.log(state.concat(Comment))
            return state.concat(Comment);
            
        default:
            return state;
    };
}