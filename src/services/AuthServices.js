import axios from './HttpsServices';
import Axios from 'axios';
import config from '../config/default';
import Token from './Token';


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

const refreshLogin = async () => {
    try {
        const user = Token.getAuth()
        // refresh token in cookie get the request
        const response = await Axios({
            method: "get",
            url: config.DOMAIN_NAME + `/api/auth/refresh/${user.role}`,
            withCredentials: true,
        });

        Token.removeAccessToken();
        // const bearer_token = response.data.access_token;
        Token.setAccessToken(response.data.access_token);
    }
    catch (err) {
        console.log(err);
    }
}

export { loginUser, logoutBackend, refreshLogin };