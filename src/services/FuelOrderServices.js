import axios from './HttpsServices';

const APIEndPoint = "http://localhost:3001/api/fuelOrder";

const getFuelOrders = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getFuelOrders",
        data: formData,
    });
};

export {getFuelOrders};