import { toast } from "react-toastify";
import { axiosInstance } from "../config/https";
import AuthStore from "../mobx/auth";
import { ApiPath } from "../utils/routes/constant";
class Video {
 
    getAllVideoSubject = async (payload) => {
        try {
            AuthStore.setLoading(false);
            const resp = await axiosInstance.post(`${ApiPath?.getVideoSubjectList}`, payload);
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
    getAllVideoList = async (payload) => {
        try {
            AuthStore.setLoading(false);
            const resp = await axiosInstance.post(`${ApiPath?.getVideoList}`, payload);
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
    getVideoById = async (payload) => {
        try {
            AuthStore.setLoading(false);
            const resp = await axiosInstance.post(`${ApiPath?.getVideoById}`, payload);
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
    getTopics = async (payload) => {
        try {
            AuthStore.setLoading(false);
            const resp = await axiosInstance.post(`${ApiPath?.gettopiclistbysubjectidandsubcourseid}`, payload);
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
    
}
const VideoData = new Video();
export default VideoData;
