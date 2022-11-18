import axios from './HttpsServices';

const APIEndPoint = "/api/fuelStation";

const getFuelStationDetails = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getFuelStationDetails",
        data: formData,
    });
}

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

const getFuelStationRegistrationNumber = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getFuelStationRegistrationNumber",
        data: formData,
    });
};

const getFuelDetails = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getFuelDetails",
        data: formData,
    });
};

const setFuelStatus = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/setFuelStatus",
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

const getAllFuelDeliveryDetails = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getAllFuelDeliveryDetails",
        data: formData,
    });
};

const getFuelStationLocation = (managerId) => {
    return axios({
        method: "get",
        url: APIEndPoint + `/getFuelStationLocation/${managerId}`,
    });
};

const setFuelStationLocation = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/setFuelStationLocation",
        data: formData,
    });
};

const setInitalFuelStat = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/setInitFuelStatus",
        data: formData,
    });
};

const getDashboardDetails = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getDashboardDetails",
        data: formData,
    });
};

const resetFSSPassword = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/resetFSSPassword",
        data: formData,
    });
};

const getFuelStationCount = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getFuelStationCount",
        data: formData,
    });
};



export {
    isFuelStationRegistered,
    isFuelStationReal,
    getFuelStationDetailsMFE,
    getFuelStationRegistrationNumber,
    getFuelStationDetails,
    getFuelDetails,
    setFuelStatus,
    registerFuelStation,
    getAllFuelDeliveryDetails,
    getFuelStationLocation,
    setFuelStationLocation,
    setInitalFuelStat,
    getFuelStationCount,
    getDashboardDetails,
    resetFSSPassword

};
