export const FETCH_USER = 'FETCH_USER';
export const LOGOUT_USER = 'LOGOUT_USER';


export const doLogin = (data) => {
    return {
        type: FETCH_USER,
        payload: data
    };
};

export const doLogout = () => {
    return {
        type: LOGOUT_USER,

    };
};