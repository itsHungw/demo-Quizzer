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
const postRegister = (email, username, password) => {
    return axios.post(`api/v1/register`, {
        email, username, password
    })
}

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}

const getQuizById = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)
}

const postSubmitQuiz = (data) => {

    return axios.post("api/v1/quiz-submit", { ...data })
}
const postAddNewQuiz = (description, name, difficulty, quizImage) => {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('name', name);
    formData.append('difficulty', difficulty);
    formData.append('quizImage', quizImage);

    return axios.post("api/v1/quiz", formData)
}

const getAllQuiz = () => {
    return axios.get('api/v1/quiz/all')
}

const deleteQuiz = (id) => {
    return axios.delete(`api/v1/quiz/${id}`)
}
const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
    const formData = new FormData();
    formData.append('id', id);

    formData.append('description', description);
    formData.append('name', name);
    formData.append('difficulty', difficulty);
    formData.append('quizImage', quizImage);

    return axios.put('api/v1/quiz', formData)
}
export {
    postCreateNewUser,
    getAllUser,
    putUpdateUser,
    deleteUser,
    getListWithPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
    getQuizById,
    postSubmitQuiz,
    postAddNewQuiz,
    getAllQuiz,
    deleteQuiz,
    putUpdateQuiz
}