import axios from './HttpsServices';

const APIEndPoint = "/api/user";

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

const getAllUserDetails = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getAllUserDetails",
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


const getFSMDetails = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getFSMDetails",
        data: formData,
    });
}

const getAdminDetails = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getAdminDetails",
        data: formData,
    });
}

const getFSMCount = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getFSMCount",
        data: formData,
    });
}

const getCustomerCount = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getCustomerCount",
        data: formData,
    });
}


const resetFSMPassword = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/resetFSMPassword",
        data: formData,
    });
};

const resetUserPwd = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/resetUserPwd",
        data: formData,
    });
};

export {
    getUserName,
    isEmailRegistered,
    registerAdmin,
    getAllAdminDetails,
    getAllFSMDetails,
    updatePwd,
    getFSMDetails,
    getAdminDetails,
    getAllUserDetails,
    getFSMCount,
    getCustomerCount,
    resetFSMPassword,
    resetUserPwd

};
