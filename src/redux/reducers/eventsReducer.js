const initialState = []

const eventsReducer = ( state = [], action ) => {
    //console.log("EventsReducer action: ", action);
    switch (action.type) {
        case "GET_ALL_EVENTS":
            return { ...state, eventsList: action.payload }
        default:
            return initialState;
    }
}

export default eventsReducer;