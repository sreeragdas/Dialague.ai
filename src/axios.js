import axios from "axios";

const uiClient = axios.create({
  baseURL: "http://20.65.184.13/ui/api"
});
uiClient.interceptors.request.use(
  function (config) {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user && user.token) {
      config.headers.Authorization = `token ${user.token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


uiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      sessionStorage.clear()
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export const client = uiClient;

export const aiClient = axios.create({
  baseURL: "http://20.65.184.13/ai/api"
});

