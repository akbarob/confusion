import * as ActionTypes from './ActionTypes';

export const Favorites = (state = {
        isLoading: true,
        errMess: null,
        Favorites: null
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FAVORITES:
            return {...state, isLoading: false, errMess: null, Favorites: action.payload};

        case ActionTypes.FAVORITES_LOADING:
            return {...state, isLoading: true, errMess: null, Favorites: null};

        case ActionTypes.FAVORITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, Favorites: null};

        default:
            return state;
    }
}