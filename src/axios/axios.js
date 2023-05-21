import axios from 'axios';
import qs from 'qs';

const Axios = axios.create({
    baseURL: 'http://localhost:8080'
});

Axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
Axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';

/*Axios.interceptors.request.use(
    config => {
        if (config.method === "post") {
            config.data = qs.stringify(config.data);
        }
        return config;
    }
);*/

Axios.interceptors.response.use(
    res => {
        if (res.data && res.data.code === 202) {
            localStorage.removeItem("username");
            localStorage.removeItem("Authorization");
            window.location.reload();
        } else if (res.data && res.data.code === 500) {
            res.data.description = "Error";
        }
        return res;
    }
);

export default Axios
