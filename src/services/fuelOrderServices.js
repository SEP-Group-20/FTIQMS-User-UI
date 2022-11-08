import axios from './HttpsServices';

const APIEndPoint = "http://localhost:3001/api/fuelOrder";

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

export {isFuelDeliveryRegistered, isFuelOrderReal, getFuelOrderDetailsMFE, getFuelOrderDetails, registerFuelDelivery};