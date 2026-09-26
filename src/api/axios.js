import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const axiosApi = axios.create({
    baseURL: apiUrl,
    params: {
        api_key: apiKey,
    },
});

export const fetchData = async (url, params = {}) => {
    const { data } = await axiosApi.get(url, { params });
    return data;
};

export default axiosApi;