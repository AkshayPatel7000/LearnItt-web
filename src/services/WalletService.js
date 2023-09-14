import { toast } from "react-toastify";
import { axiosInstance } from "../config/https";
import AuthStore from "../mobx/auth";
import { ApiPath } from "../utils/routes/constant";
import EbookStore from "../mobx/ebook";

class WalletService {
    createPayment = async (payload) => {
       // console.log("object",payload);
        try {
            AuthStore.setLoading(false);
            const resp = await axiosInstance.post(`${ApiPath?.createOrder}`, payload);
            if (resp?.data.isSuccess && resp?.data.responseCode === 200) {
                AuthStore.setLoading(false);
                return resp?.data?.data;
            } else {
                AuthStore.setLoading(false);
                return resp?.data?.data;
            }
        }
        catch (error) {
            AuthStore.setLoading(false);
            toast.error(error?.response?.data?.data?.[0]?.message)
            throw new Error(error);
        }
    };

    recharegewallet = async (payload) => {
        try {
            AuthStore.setLoading(false);
            const resp = await axiosInstance.post(`${ApiPath?.rechargewallet}`, payload);
            if (resp?.data.isSuccess && resp?.data.responseCode === 200) {
                AuthStore.setLoading(false);
                return resp?.data;
            } else {
                AuthStore.setLoading(false);
                return resp?.data;
            }
        }
        catch (error) {
            AuthStore.setLoading(false);
            toast.error(error?.response?.data?.data[0]?.message)
            throw new Error(error);
        }
    };

    getWalletHistory = async () => {
        let payload ={
                "pageNumber": 1,
                "pageSize": 10
        }
        try {
            AuthStore.setLoading(false);
            const resp = await axiosInstance.post(`${ApiPath?.walletHistory}`, payload);
            if (resp?.data.isSuccess && resp?.data.responseCode === 200) {
                AuthStore.setLoading(false);
                EbookStore.setWalletHistory(resp?.data?.data?.studentWalletHistory)
                return resp?.data?.data;
           } else {
                AuthStore.setLoading(false);
                return resp?.data;
            }
        }
        catch (error) {
            AuthStore.setLoading(false);
            toast.error(error?.response?.data?.data[0]?.message)
            throw new Error(error);
        }
    };

    getStudentBalance = async () => {
        try {
            AuthStore.setLoading(false);
            const resp = await axiosInstance.post(`${ApiPath?.getStudentBalance}`, '');
            if (resp?.data.isSuccess && resp?.data.responseCode === 200) {
                AuthStore.setLoading(false);
                return resp?.data?.data;
            } else {
                AuthStore.setLoading(false);
                return resp?.data?.data;
            }
        }
        catch (error) {
            AuthStore.setLoading(false);
            toast.error(error?.response?.data?.data[0]?.message)
            throw new Error(error);
        }
    };

    Checkout = async (payload) => {
        //console.log("payload1",payload);
        try {
            AuthStore.setLoading(false);
            const resp = await axiosInstance.post(`${ApiPath?.checkout}`, payload);
            if (resp?.data.isSuccess && resp?.data.responseCode === 200) {
                AuthStore.setLoading(false);
                return resp?.data;
            } else {
                AuthStore.setLoading(false);
                return resp?.data;
            }
        }
        catch (error) {
            AuthStore.setLoading(false);
            if(error?.response?.data?.data?.[0]?.message === "TotalAmount must be greater than zero!"){

                toast.error("Total Amount must be greater than zero!")
            }
            throw new Error(error);
        }
    };

}
const WalletDetail = new WalletService();
export default WalletDetail;