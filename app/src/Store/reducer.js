import * as actionTypes from './actions';

const initialState = {
    auth:null
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.LOGIN_AUTHENDICATION:
            return {
                ...state,
                auth:action.auth
            };
        case actionTypes.LOGOUT_AUTHENDICATION:
            return {
                ...state,
                auth:action.auth
            };
        default :
            return state;
        
    }
}

export default reducer;