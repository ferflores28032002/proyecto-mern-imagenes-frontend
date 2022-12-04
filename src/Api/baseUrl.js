import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://localhost:4000",
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
