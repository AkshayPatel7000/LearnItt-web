import { toast } from "react-toastify";
import { axiosInstance } from "../config/https";
import AuthStore from "../mobx/auth";
import { ApiPath } from "../utils/routes/constant";
class ResultService {

    getCompletedExisting = async () => {
        try {
          AuthStore.setLoading(true);
          const mockTestCompleted = await axiosInstance.get(`${ApiPath?.getCompletedExisting}`);
          if (mockTestCompleted?.data.isSuccess) {
            AuthStore.setLoading(false);
            return mockTestCompleted?.data?.data;
          } else {
            AuthStore.setLoading(false);
            return mockTestCompleted?.data?.data;
          }
        } catch (error) {
          console.log("Error on getCustomMock --> ", error);
          AuthStore.setLoading(false);
          toast.error(error?.response?.data?.data[0]?.message);
          throw new Error(error);
        }
      };
      getOverallResult = async () => {
        try {
          AuthStore.setLoading(true);
          const mockTestRank = await axiosInstance.get(`${ApiPath?.getOverallResult}`);
          if (mockTestRank?.data.isSuccess) {
            AuthStore.setLoading(false);
            return mockTestRank?.data?.data;
          } else {
            AuthStore.setLoading(false);
            return mockTestRank?.data?.data;
          }
        } catch (error) {
          console.log("Error on getCustomMock --> ", error);
          AuthStore.setLoading(false);
          toast.error(error?.response?.data?.data[0]?.message);
          throw new Error(error);
        }
      };
}
const Result = new ResultService();
export default Result;