import { toast } from "react-toastify";
import { axiosInstance } from "../config/https";
import AuthStore from "../mobx/auth";
import { ApiPath } from "../utils/routes/constant";

class MockTest {

  mockTestByFilter = async (payload) => {
    if (!payload) {
      payload = { pageNumber: 0, pageSize: 0 };
    }
    AuthStore.setLoading(true);
    const mocktestData = await axiosInstance.post(`${ApiPath?.mockTestByFilter}`, payload);
    if (
      mocktestData?.data.isSuccess &&
      mocktestData?.data.responseCode === 200
    ) {
      AuthStore.setLoading(false);
      return mocktestData?.data;
    } else {
      AuthStore.setLoading(false);
      return mocktestData?.data;
    }
  };

  mocktestLang = async () => {
    try {
      AuthStore.setLoading(true);
      const mockLangData = await axiosInstance.get(`${ApiPath?.mocktestLang}`);
      if (
        mockLangData?.data.isSuccess &&
        mockLangData?.data.responseCode === 200
      ) {
        AuthStore.setLoading(false);
        return mockLangData?.data?.data;
      } else {
        AuthStore.setLoading(false);
        return mockLangData?.data;
      }
    }
    catch (e) {
      AuthStore.setLoading(false);
      toast.error(e?.response?.data?.data[0]?.message)
      throw new Error(e);
    }

  };

  mocktestPrice = async () => {
    try {
      AuthStore.setLoading(true);
      const mockLangData = await axiosInstance.get(`${ApiPath?.mockTestPrice}`);
      if (
        mockLangData?.data.isSuccess &&
        mockLangData?.data.responseCode === 200
      ) {
        AuthStore.setLoading(false);
        return mockLangData?.data?.data;
      } else {
        AuthStore.setLoading(false);
        return mockLangData?.data;
      }
    }
    catch (e) {
      AuthStore.setLoading(false);
      toast.error(e?.response?.data?.data[0]?.message)
      throw new Error(e);
    }

  };

  mocktestStatus = async () => {
    try {
      AuthStore.setLoading(true);
      const mockLangData = await axiosInstance.get(`${ApiPath?.mockTestStatus}`);
      if (
        mockLangData?.data.isSuccess &&
        mockLangData?.data.responseCode === 200
      ) {
        AuthStore.setLoading(false);
        return mockLangData?.data?.data;
      } else {
        AuthStore.setLoading(false);
        return mockLangData?.data;
      }
    }
    catch (e) {
      AuthStore.setLoading(false);
      toast.error(e?.response?.data?.data[0]?.message)
      throw new Error(e);
    }

  };

  generateCustomMock = async (payload) => {
    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.generateCustomMock}`, payload);
      if (resp?.data.isSuccess) {
        AuthStore.setLoading(false);
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on generateCustomMock --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };

  getCustomMock = async (payload) => {
    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.getCustomMock}`, payload);
      if (resp?.data.isSuccess) {
        AuthStore.setLoading(false);
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on getCustomMock --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };

  saveMocktestStatus = async (payload) => {
    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.saveMocktestStatus}`, payload);
      if (resp?.data.isSuccess) {
        AuthStore.setLoading(false);
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on saveMocktestStatus --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };

  getGeneralInst = async (payload) => {
    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.getGeneralInst}`, payload);
      if (resp?.data.isSuccess) {
        AuthStore.setLoading(false);
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on getGeneralInst --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };

  getStudentResult = async (payload) => {
    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.getStudentResult}`, payload);
      if (resp?.data.isSuccess) {
        AuthStore.setLoading(false);
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on getGeneralInst --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };

  getStudentPreviousResult = async (payload) => {
    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.getStudentPreviousResult}`, payload);
      if (resp?.data.isSuccess) {
        AuthStore.setLoading(false);
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on getGeneralInst --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };
}

const MockTestData = new MockTest();
export default MockTestData;
