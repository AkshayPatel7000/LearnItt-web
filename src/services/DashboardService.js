
import { toast } from "react-toastify";
import { axiosInstance } from "../config/https";
import AuthStore from "../mobx/auth";
import { ApiPath } from "../utils/routes/constant";

class Dashboard {

    getAllMockTest = async (payload) => {
        try {
            AuthStore.setLoading(true);
            const resp = await axiosInstance.post(`${ApiPath?.getAllMockTest}`, payload);
            if (resp?.data.isSuccess && resp?.data.responseCode === 200) {
                AuthStore.setLoading(false);
                return resp?.data;
            } else {
                AuthStore.setLoading(false);
                return resp?.data;
            }
        }
        catch (error) {
            console.log("Error on getAllMockTest --> ", error);
            AuthStore.setLoading(false);
            toast.error(error?.response?.data?.data[0]?.message)
            throw new Error(error);
        }
    };
    
    mockTestList = async (payload) => {
        try {
            AuthStore.setLoading(true);
            const resp = await axiosInstance.post(`${ApiPath?.mockTestList}`, payload);
            if (resp?.data.isSuccess && resp?.data.responseCode === 200) {
                AuthStore.setLoading(false);
                return resp?.data;
            } else {
                AuthStore.setLoading(false);
                return resp?.data;
            }
        }
        catch (error) {
            console.log("Error on mockTestList --> ", error);
            AuthStore.setLoading(false);
            toast.error(error?.response?.data?.data[0]?.message)
            throw new Error(error);
        }
    };
}
const DashboardService = new Dashboard();
export default DashboardService;
