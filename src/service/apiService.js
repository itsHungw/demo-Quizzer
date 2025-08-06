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




export { postCreateNewUser }