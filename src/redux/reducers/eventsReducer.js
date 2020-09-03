const initialState = []

const eventsReducer = ( state = [], action ) => {
    switch (action.type) {
        case "GET_ALL_EVENTS":
            return { ...state, eventsList: action.payload }
        default:
            return initialState;
    }
}

export default eventsReducer;