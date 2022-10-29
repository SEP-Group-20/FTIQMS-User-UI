import axios from './HttpsServices';

const APIEndPoint = "http://localhost:3001/api/auth";

const loginUser = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/login",
        data: formData,
        withoutToken: true,
    });
};

const logoutBackend = () => {
    return axios({
        method: "get",
        url: APIEndPoint + "/logout"
    });
};

export {loginUser,logoutBackend};