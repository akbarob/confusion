import { DISHES } from '../shared/dishes'
import { COMMENTS } from '../shared/Comments'
import { PROMOTIONS } from '../shared/Promotions'
import { LEADERS } from '../shared/Leaders'

export const initialState ={
    dishes: DISHES,
    Comments: COMMENTS,
    Promotions: PROMOTIONS,
    Leaders: LEADERS
}

function Reducer (state = initialState, action){
    return state;
}
export default Reducer;