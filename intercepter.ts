import axios from 'axios';
const api = axios.create({
    baseURL: 'https://pinsoft.onrender.com/',
});

api.interceptors.request.use(
    async (config) => {
        const tokenLocale = localStorage.getItem('userTokenTry')
        const token = { tokenLocale };
        if (token) {
            config.headers['Authorization'] = `Bearer ${tokenLocale}`;
        }

        config.headers[`accept`] = "application/json"
        config.headers[`Content-Type`] = "application/json"

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;