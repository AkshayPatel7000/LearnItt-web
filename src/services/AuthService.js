import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { axiosInstance } from "../config/https";
import AuthStore from "../mobx/auth";
import { ApiPath } from "../utils/routes/constant";

class Auth {
  login = async (data) => {
    AuthStore.setLoading(true);
    try {
      const loginres = await axiosInstance.post(`${ApiPath?.login}`, data);
      if (loginres.data.isSuccess && loginres.data.responseCode === 200) {
        if (data?.rememberme) {
          sessionStorage.setItem("Credential", JSON.stringify(data));
        }
        let decoded = jwt_decode(loginres?.data?.data?.token);
        let userToken = {
          token: loginres?.data?.data?.token,
          user: { ...decoded },
        };
        localStorage.setItem("key", JSON.stringify(userToken));
        AuthStore.setUser(userToken);
        AuthStore.setLoading(false);
        return loginres?.data;
      } else {
        AuthStore.setLoading(false);
        return loginres?.data;
      }
    } catch (e) {
      AuthStore.setLoading(false);
      toast.error(e?.response?.data?.data[0]?.message)
    }
  };

  signUp = async (data) => {
    try {
      AuthStore.setLoading(true);
      const loginres = await axiosInstance.post(`${ApiPath?.signup}`, data);
      if (loginres?.data.isSuccess && loginres?.data.responseCode === 200) {
        AuthStore.setLoading(false);
        let decoded = jwt_decode(loginres?.data?.data);
        let userToken = {
          token: loginres?.data?.data,
          user: { ...decoded },
        };
        localStorage.setItem("key", JSON.stringify(userToken));
        AuthStore.setUser(userToken);
        AuthStore.setLoading(false);
        return loginres?.data;
      } else {
        AuthStore.setLoading(false);
        return loginres?.data;
      }
    } catch (error) {
      console.log("Error on signUp --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };

  forgotPassword = async (data) => {
    AuthStore.setLoading(true);
    const loginres = await axiosInstance.post(`${ApiPath?.forgotPasswod}`, data);
    if (loginres?.data.isSuccess && loginres?.data.responseCode === 200) {
      AuthStore.setLoading(false);
      return loginres?.data;
    } else {
      AuthStore.setLoading(false);
      return loginres?.data;
    }
  };

  getUserInstitute = async (data) => {
    try {
      AuthStore.setLoading(true);
      const loginres = await axiosInstance.get(`${ApiPath?.getUserInstitute}`, data);
      if (loginres?.data.isSuccess && loginres?.data.responseCode === 200) {
        AuthStore.setLoading(false);
        return loginres?.data;
      } else {
        AuthStore.setLoading(false);
        return loginres?.data;
      }
    }
    catch (e) {
      AuthStore.setLoading(false);  
      toast.error(e?.response?.data?.data[0]?.message)
    }
  };

  updateProfile = async (payload) => {
    try {
      AuthStore.setLoading(true);
      const userUpdateres = await axiosInstance.post(`${ApiPath?.editUser}`, payload);
      if (userUpdateres?.data.isSuccess && userUpdateres?.data.responseCode === 200) {
        AuthStore.setLoading(false);
        let decoded = jwt_decode(userUpdateres?.data?.data);
        let userToken = {
          token: userUpdateres?.data?.data,
          user: { ...decoded },
        };
        localStorage.setItem("key", JSON.stringify(userToken));
        AuthStore.setUser(userToken);
        AuthStore.setLoading(false);
        return userUpdateres?.data;
      } else {
        AuthStore.setLoading(false);
        return userUpdateres?.data;
      }
    }
    catch (error) {
      console.log("Error on updateProfile --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };

  removeLogin = async () => {
    localStorage.removeItem("key");
    localStorage.clear();
    AuthStore?.setUser({});
  };
}
const AuthServices = new Auth();
export default AuthServices;
