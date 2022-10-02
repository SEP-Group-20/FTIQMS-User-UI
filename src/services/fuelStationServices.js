import axios from './HttpsServices';

const APIEndPoint = "http://localhost:3001/api/fuelStation";

const isFuelStationRegistered = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/checkFuelStationRegistered",
        data: formData,
    });
};

const isFuelStationReal = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/checkFuelStationExistence",
        data: formData,
    });
};

const getFuelStationDetailsMFE = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getFuelStationDetailsMFE",
        data: formData,
    });
};

const getFuelStationDetails = (fid, formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getFuelStationDetails/" + fid,
        data: formData,
    });
};

const registerFuelStation = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/register",
        data: formData,
    });
};

export {isFuelStationRegistered, isFuelStationReal, getFuelStationDetailsMFE, getFuelStationDetails, registerFuelStation};