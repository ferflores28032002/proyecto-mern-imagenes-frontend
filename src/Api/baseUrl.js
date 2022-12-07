import axios from "axios";

const baseUrl = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
});

//TODO: Configuraciones de los interceptores

baseUrl.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };

  return config;
});

export default baseUrl;
