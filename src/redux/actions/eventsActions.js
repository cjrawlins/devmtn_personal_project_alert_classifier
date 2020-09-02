export const get_all_events = (events) =>  {
    return {
        type: 'GET_ALL_EVENTS',
        payload: events
    };
};