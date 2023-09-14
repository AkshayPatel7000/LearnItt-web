import { toast } from "react-toastify";
import { axiosInstance } from "../config/https";
import AuthStore from "../mobx/auth";
import { ApiPath } from "../utils/routes/constant";

class AccountService {

  getStudentProfile = async (Id) => {
    try {
      AuthStore.setLoading(true);
      const respProfile = await axiosInstance.post(`${ApiPath?.getStudentById}`, { id: Id, });
      if (respProfile?.data.isSuccess) {
        AuthStore.setLoading(false);
        return respProfile?.data;
      } else {
        AuthStore.setLoading(false);
        return respProfile?.data;
      }
    } catch (error) {
      console.log("Error on getCustomMock --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message);
      throw new Error(error);
    }
  };
}
const Account = new AccountService();
export default Account;
