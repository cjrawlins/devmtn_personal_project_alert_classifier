export const login_user = (user) =>  {
    return {
        type: 'LOGIN_USER',
        payload: user
    };
};

export const logout_user = () =>  {
    return {
        type: 'LOGOUT_USER'
    };
};

export const get_user = (user) => {
    return {
        type: 'GET_USER',
        payload: user
    };
};
