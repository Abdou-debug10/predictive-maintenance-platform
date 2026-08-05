import axios from "axios";

export const API = axios.create({
    baseURL: "https://predictive-maintenance-platform.onrender.com"
});

export const getPredictions = async () => {
    const response = await API.get("/predictions");
    return response.data;
};

export const predictMachine = async (data) => {
    const response = await API.post("/predict", data);
    return response.data;
};
