import Axios from 'axios';import Token from './Token';
import jwtDecode from 'jwt-decode';
import dayJS from 'dayjs'
import config from '../config/default';

let bearer_token = Token.getAccessToken();

const axiosInstance = Axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001",
    headers: { Authorization: `Bearer ${bearer_token}` }
});

axiosInstance.interceptors.request.use(async (req) => {
    if(req.withoutToken){
        delete req.withoutToken;
        return req
    };

    if (!bearer_token) {
        bearer_token = Token.getAccessToken();
        req.headers.Authorization = `Bearer ${bearer_token}`
    }
    if (bearer_token) {
        bearer_token = Token.getAccessToken();

        const user = await jwtDecode(bearer_token);
        // unix time expired 
        const isExpired = dayJS(user.exp * 1000).isBefore(dayJS());
        console.log("expired :", isExpired);

        if (!isExpired) {
            req.headers.Authorization = `Bearer ${bearer_token}`
            return req;
        }

        try {
            console.log("Refresh block reached!");
            const user = Token.getAuth()
            // refresh token in cookie get the request
            const response = await Axios({
                method: "get",
                url: config.DOMAIN_NAME + `/api/auth/refresh/${user.userInfo.role}`,
                // credentials true
                withCredentials: true,
            })
            console.log("response :", response);

            Token.removeAccessToken();

            bearer_token = response.data.access_token;
            Token.setAccessToken(response.data.access_token);

            req.headers.Authorization = `Bearer ${bearer_token}`;
        } catch (err) {
            Token.removeAccessToken();
            return Promise.reject(err);
        }
    }
    return req;

});

export default axiosInstance;