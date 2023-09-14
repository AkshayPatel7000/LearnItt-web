
import { toast } from "react-toastify";
import { axiosInstance } from "../config/https";
import AuthStore from "../mobx/auth";
import { ApiPath } from "../utils/routes/constant";

class Student {

  addFeedback = async (payload) => {
    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.addFeedback}`, payload);
      if (resp?.data.isSuccess && resp?.data.responseCode === 200) {
        AuthStore.setLoading(false);
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on addFeedback --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };

  getAllInstitute = async () => {
    AuthStore.setLoading(true);
    const institutedata = await axiosInstance.post(`${ApiPath?.getAllInstitute}`,);
    if (institutedata?.data.isSuccess && institutedata?.data.responseCode === 200) {
      AuthStore.setLoading(false);
      return institutedata?.data?.data;
    } else {
      AuthStore.setLoading(false);
      return institutedata?.data;
    }

  };

  getCourseByInstitute = async (Id) => {
    AuthStore.setLoading(true);
    const institutedata = await axiosInstance.post(`${ApiPath?.getCoursebyInstitute}`, {
      instituteId: Id
    });
    if (institutedata?.data.isSuccess && institutedata?.data.responseCode === 200) {
      AuthStore.setLoading(false);
      return institutedata?.data?.data;
    } else {
      AuthStore.setLoading(false);
      return institutedata?.data;
    }

  };

  getTokenByNumber = async (data) => {
    AuthStore.setLoading(true);
    const forgotNumber = await axiosInstance.post(`${ApiPath?.getTokenByNumber}`, {
      mobileNumber: data
    })
    if (forgotNumber?.data.isSuccess && forgotNumber?.data.responseCode === 200) {
      AuthStore.setLoading(false);
      return forgotNumber?.data;

    } else {
      AuthStore.setLoading(false);
      return forgotNumber?.data;
    }

  }

  getSubCourseById = async (Id) => {
    AuthStore.setLoading(true);
    const institutedata = await axiosInstance.post(`${ApiPath?.getSubCourseById}`, {
      id: Id
    });
    if (institutedata?.data.isSuccess && institutedata?.data.responseCode === 200) {
      AuthStore.setLoading(false);
      return institutedata?.data?.data;
    } else {
      AuthStore.setLoading(false);
      return institutedata?.data;
    }

  };

  getAllLevel = async () => {
    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.getAllLevel}`,);
      if (resp?.data.isSuccess && resp?.data.responseCode === 200) {
        AuthStore.setLoading(false);
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on getAllLevel --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };

  getSubjectByMaster = async (payload) => {

    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.getSubjectsBySubcourseId}`, payload);
      if (resp?.data.isSuccess && resp?.data.responseCode === 200) {
        AuthStore.setLoading(false);
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on getSubjectByMaster --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };

  profileImageUpload = async (data) => {
    let config;
    config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },

    };
    AuthStore.setLoading(true);
    const loginres = await axiosInstance.post(`${ApiPath?.uploadProfileImg}`, data, { headers: config.headers });
    if (loginres?.data.isSuccess && loginres?.data.responseCode === 200) {
      AuthStore.setLoading(false);
      return loginres?.data;
    } else {
      AuthStore.setLoading(false);
      return loginres?.data;
    }
  };
}


const StudentDetail = new Student();
export default StudentDetail;
