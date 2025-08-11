export const FETCH_USER = 'FETCH_USER';

export const doLogin = (data) => {
    return {
        type: FETCH_USER,
        payload: data
    };
};