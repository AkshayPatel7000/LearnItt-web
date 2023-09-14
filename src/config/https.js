import axios from "axios";
import { Navigate } from "react-router-dom";
import AuthServices from "../services/AuthService";

let baseURL = process.env.REACT_APP_API_URL
export const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
  async (config) => {
    // const token =""
    // if (token) {
    //   config.headers.accessToken = token;
    // }
    var token = localStorage.getItem("key");
    const authToken = JSON.parse(token);
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + authToken?.token;
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = "application/json";
      }
    }
    return config;
  },
  // function (error) {
  //   console.log("error", error)
  // return Promise.reject(error);
  // if (error && error.response) {
  //   if (error.response.status === 401) {
  //     AuthServices.removeLogin();
  //     <Navigate to={"/auth/login"} replace />
  //     return Promise.reject(error.response)
  //   }
  //   return Promise.reject(error)
  // }
  // }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // console.log("error-->", error)
    if (error.response.status === 401) {
      AuthServices.removeLogin();
      <Navigate to={"/auth/login"} />
    }
    return Promise.reject(error);
  }
);