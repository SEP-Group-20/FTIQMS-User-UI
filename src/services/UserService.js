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

const getAllAdminDetails = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getAllAdminDetails",
        data: formData,
    });
};

const getAllFSMDetails = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getAllFSMDetails",
        data: formData,
    });
};

const updatePwd = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/updatePwd",
        data: formData
    });
};

export {
    getUserName,
    isEmailRegistered,
    registerAdmin,
    getAllAdminDetails,
    getAllFSMDetails,
    updatePwd
};