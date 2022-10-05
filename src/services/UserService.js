import axios from './HttpsServices';

const APIEndPoint = "http://localhost:3001/api/user";

const getUserName = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getUsername",
        data: formData,
    });
};

const isEmailRegistered = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/isEmailRegistered",
        data: formData,
    });
}

const registerAdmin = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/registerAdmin",
        data: formData,
    });
}

export {getUserName, isEmailRegistered,registerAdmin};