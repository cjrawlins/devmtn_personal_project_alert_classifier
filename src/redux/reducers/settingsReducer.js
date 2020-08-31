const initialState = {
    enabledSources: {},
    enabledUsers: {}
}

const settingsReducer = ( state = {}, action ) => {
    switch (action.type) {
        default:
            return initialState;
    }
}

export default settingsReducer;