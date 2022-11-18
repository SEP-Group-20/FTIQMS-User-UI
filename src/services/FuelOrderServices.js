import axios from './HttpsServices';

const APIEndPoint = "/api/fuelOrder";

const isFuelDeliveryRegistered = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/checkFuelDeliveryRegistered",
        data: formData,
    });
};

const isFuelOrderReal = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/checkFuelOrderExistence",
        data: formData,
    });
};

const getFuelOrderDetailsMFE = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getFuelOrderDetailsMFE",
        data: formData,
    });
};

const getFuelOrderDetails = (oid, formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getFuelOrderDetails/" + oid,
        data: formData,
    });
};

const registerFuelDelivery = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/register",
        data: formData,
    });
};

const getFuelOrderCount = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getOrderCount",
        data: formData,
    });
};

const getRecentFuelOrders = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getRecentFuelOrders",
        data: formData,
    });
};

export {isFuelDeliveryRegistered, isFuelOrderReal, getFuelOrderDetailsMFE, getFuelOrderDetails, registerFuelDelivery, getFuelOrderCount, getRecentFuelOrders};