import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/https';
import AuthStore from '../../mobx/auth';
import { ApiPath } from '../routes/constant';

const GetOTP = async (payload) => {
    try {
        AuthStore.setLoading(true);
        const resp = await axiosInstance.post(`${ApiPath?.getOTP}`, payload);
        AuthStore.setLoading(false);
        if (resp?.data?.responseCode === 200) {
            return resp?.data;
        } else {
            toast.error(resp?.data?.messages)
        }

    } catch (error) {
        console.log("Error on GetOTP --> ", error);
        AuthStore.setLoading(false);
        toast.error(error?.response?.data?.data[0]?.message)
        throw new Error(error);
    }
}

export default GetOTP
