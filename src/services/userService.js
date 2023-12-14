// import axios from "axios";
import axios from "./axios";

const fetchAllUser = () => {
    var myToken = localStorage.getItem('accessToken');
    return axios.get(`/api/users/get/all/user`, { headers: { "Authorization": `Bearer ${myToken}` } });
}

const fetchUser = () => {
    var myToken = localStorage.getItem('accessToken');
    return axios.post(`/api/getUser`, {}, { headers: { "Authorization": `Bearer ${myToken}` } });
}

const postCreateUser = (email, password, Role, Rate, First_name, Last_name, Active) => {
    return axios.post('/api/addNewUser', { email, password, Role, Rate, First_name, Last_name, Active })
}

const putUpdateUserRole = (email, Role) => {
    var myToken = localStorage.getItem('accessToken');
    return axios.post('/api/users/change/user/role', { email, Role }, { headers: { "Authorization": `Bearer ${myToken}` } })
}

const putUpdateUserEmail = (email, changeEmail) => {
    var myToken = localStorage.getItem('accessToken');
    return axios.post('/api/users/change/user/email', { email, changeEmail }, { headers: { "Authorization": `Bearer ${myToken}` } })
}

const deleteUser = (email) => {
    var myToken = localStorage.getItem('accessToken');
    return axios.post(`/api/users/deactive/user`, { email }, { headers: { "Authorization": `Bearer ${myToken}` } });
}

const loginApi = (email, password) => {
    var myToken = localStorage.getItem('accessToken');
    return axios.post('/api/user/login', { email, password }, { headers: { "Authorization": `Bearer ${myToken}` } });
}

const postForgot = (email) => {
    return axios.post('/api/user/forgot/password', { email })
}

const postOTP = (email, OTP) => {
    return axios.post('/api/user/check/valid/OTP', { email, OTP })
}

const postUserPassword = (email, password) => {
    var myToken = localStorage.getItem('accessToken');
    return axios.post('/api/user/change/password', { email, password }, { headers: { "Authorization": `Bearer ${myToken}` } })
}

const postUserAttendance = () => {
    var myToken = localStorage.getItem('accessToken');
    return axios.post('/api/user/take/attendance', {}, { headers: { "Authorization": `Bearer ${myToken}` } })
}

const postUserCheckOut = () => {
    var myToken = localStorage.getItem('accessToken');
    return axios.post('/api/user/check/out', {}, { headers: { "Authorization": `Bearer ${myToken}` } })
}

const getAllUserAttendance = () => {
    var myToken = localStorage.getItem('accessToken');
    return axios.get('/api/users/get/all/atten/user', { headers: { "Authorization": `Bearer ${myToken}` } })
}

const getRole = () => {
    var myToken = localStorage.getItem('accessToken');
    return axios.get('/api/user/get/Role', { headers: { "Authorization": `Bearer ${myToken}` } })
}

export {
    fetchAllUser,
    postCreateUser,
    putUpdateUserRole,
    putUpdateUserEmail,
    deleteUser,
    loginApi,
    postForgot,
    postOTP,
    postUserPassword,
    fetchUser,
    postUserAttendance,
    postUserCheckOut,
    getAllUserAttendance,
    getRole
};