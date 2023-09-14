import { toast } from "react-toastify";
import { axiosInstance } from "../config/https";
import AuthStore from "../mobx/auth";
import { ApiPath } from "../utils/routes/constant";

class MyPurchaseData {

    getModuleList = async () => {
        try {
            AuthStore.setLoading(true);
            const responce = await axiosInstance.post(`${ApiPath?.getModuleList}`);
            if (responce?.data.isSuccess && responce?.data.responseCode === 200) {
                AuthStore.setLoading(false);
                return responce?.data;
            } else {
                AuthStore.setLoading(false);
                return responce?.data;
            }
        }
        catch (e) {
            AuthStore.setLoading(false);
            toast.error(e?.response?.data?.data[0]?.message)
            throw new Error(e);
        }
    };

    getPurchasedMocktest = async (payload) => {
        try {
            AuthStore.setLoading(true);
            const responce = await axiosInstance.post(`${ApiPath?.getPurchasedMocktest}`, payload);
            if (responce?.data.isSuccess && responce?.data.responseCode === 200) {
                AuthStore.setLoading(false);
                return responce?.data;
            } else {
                AuthStore.setLoading(false);
                return responce?.data;
            }
        }
        catch (e) {
            AuthStore.setLoading(false);
            toast.error(e?.response?.data?.data[0]?.message)
            throw new Error(e);
        }

    };

    getPurchasedEbooks = async (payload) => {
        try {
            AuthStore.setLoading(true);
            const responce = await axiosInstance.post(`${ApiPath?.getPurchasedEbooks}`, payload);
            if (responce?.data.isSuccess && responce?.data.responseCode === 200) {
                AuthStore.setLoading(false);
                return responce?.data;
            } else {
                AuthStore.setLoading(false);
                return responce?.data;
            }
        }
        catch (e) {
            AuthStore.setLoading(false);
            toast.error(e?.response?.data?.data[0]?.message)
            throw new Error(e);
        }

    };

    getPurchasedVideos = async (payload) => {
        try {
            AuthStore.setLoading(true);
            const responce = await axiosInstance.post(`${ApiPath?.getPurchasedVideos}`, payload);
            if (responce?.data.isSuccess && responce?.data.responseCode === 200) {
                AuthStore.setLoading(false);
                return responce?.data;
            } else {
                AuthStore.setLoading(false);
                return responce?.data;
            }
        }
        catch (e) {
            AuthStore.setLoading(false);
            toast.error(e?.response?.data?.data[0]?.message)
            throw new Error(e);
        }

    };

    getPurchasedPYP = async (payload) => {
        try {
            AuthStore.setLoading(true);
            const responce = await axiosInstance.post(`${ApiPath?.getPurchasedPYP}`, payload);
            if (responce?.data.isSuccess && responce?.data.responseCode === 200) {
                AuthStore.setLoading(false);
                return responce?.data;
            } else {
                AuthStore.setLoading(false);
                return responce?.data;
            }
        }
        catch (e) {
            AuthStore.setLoading(false);
            toast.error(e?.response?.data?.data[0]?.message)
            throw new Error(e);
        }

    };

}

const MyPurchaseService = new MyPurchaseData();
export default MyPurchaseService;
