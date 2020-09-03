const initialState = {};

const userReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case "LOGIN_USER": 
            return { ...state, ...action.payload}
        case "LOGOUT_USER": 
            return { ...state, ...action.payload }
        case "GET_USER_PENDING":
            return state
        case "GET_USER_FULFILLED":
                return { ...state, user: action.payload.data,}
        case "GET_USER_REJECTED":
            return initialState
        default: 
            return initialState
    }
}

export default userReducer;