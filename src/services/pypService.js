import { axiosInstance } from "../config/https";
import AuthStore from "../mobx/auth";
import { ApiPath } from "../utils/routes/constant";
class Pyp {

    getPypList = async (payload) => {
        AuthStore.setLoading(true);
        const pypListData = await axiosInstance.post(`${ApiPath?.getPYPListByFilter}`, payload);
        if (
            pypListData?.data.isSuccess &&
            pypListData?.data.responseCode === 200
        ) {
            AuthStore.setLoading(false);
            return pypListData?.data;
        } else {
            AuthStore.setLoading(false);
            return pypListData?.data;
        }
    };
    getYearList = async () => {
        AuthStore.setLoading(true);
        const pypListData = await axiosInstance.get(`${ApiPath?.yearList}`);
        if (
            pypListData?.data.isSuccess &&
            pypListData?.data.responseCode === 200
        ) {
            AuthStore.setLoading(false);
            return pypListData?.data;
        } else {
            AuthStore.setLoading(false);
            return pypListData?.data;
        }
    };


}
const PypData = new Pyp();
export default PypData;
