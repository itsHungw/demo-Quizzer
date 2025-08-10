import axios from "../utils/CustomizeAxios";

const postCreateNewUser = (email, password, username, role, image) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);
    formData.append('role', role);
    formData.append('userImage', image);
    return axios.post('api/v1/participant', formData)
}

const getAllUser = () => {
    return axios.get('api/v1/participant/all')
}

const putUpdateUser = (id, username, role, image) => {
    const formData = new FormData();
    formData.append('id', id);

    formData.append('username', username);
    formData.append('role', role);
    formData.append('userImage', image);
    return axios.put('api/v1/participant', formData)
}

const deleteUser = (id) => {
    return axios.delete('api/v1/participant', { data: { id } })
}

const getListWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}
const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, {
        email, password
    })
}
export {
    postCreateNewUser,
    getAllUser,
    putUpdateUser,
    deleteUser,
    getListWithPaginate,
    postLogin
}