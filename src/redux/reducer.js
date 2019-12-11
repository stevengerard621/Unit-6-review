const initialState = {
    user: {}
}

const GET_USER = 'GET_USER';
const LOGOUT = 'LOGOUT';

//action builder//
//exported so they can be imported into components that need them//
export function getUser(userObj){
    return{
        ///type is an identifier for case///
        type: GET_USER,
        ///payload is the ummmm actual data///
        payload: userObj
    }
}

export function logout(){
    return {
        type: LOGOUT,
        payload: null
    }
}

//reducer function//
//action builders go in the action params////
export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_USER:
            ///...state makes copy of state, for imutabiliy///
            return {...state, user: payload}
        case LOGOUT:
            return {...state, use: {}}
            ///OR RETURN initialState////
        default:
            return state;
    }
};