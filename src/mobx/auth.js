import { makeAutoObservable } from "mobx";
class Auth {
  user = {};
  isLoading = false;
  display = "";
  displayPDF = "d-none";

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (data) => {
    this.user = data;
  };

  updateUser = (updatedData) => {
    let updatedUser = updatedData?.user
    let data = {}
    if (updatedData?.token) {
      data.token = updatedData?.token
    }
    else {
      data.token = this.user.token
    }
    data.user = { ...this.user?.user, ...updatedUser }
    this.setUser(data)
  };

  clear = () => {
    this.user = {}
  };
  setLoading = (value) => {
    this.isLoading = value;
  };

  setDisplay = (value) => {
    this.display = value;
  };
  setDisplayPDF = (value) => {
    this.displayPDF = value;
  };

}
const AuthStore = new Auth();
export default AuthStore;
