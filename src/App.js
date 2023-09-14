import { MathJaxContext } from "better-react-mathjax";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useLayoutEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PrivateLayout from "./Pages/PublicPages/PrivateRoute";
import SelectCourse from "./Pages/PublicPages/selectCourse";
import SelectInstitute from "./Pages/PublicPages/selectInstitute";
import PrivacyPolicy from "./Pages/PublicPages/staticContent/PrivacyPolicy";
import TermsAndCondition from "./Pages/PublicPages/staticContent/termsAndCondition";
import NewPassword from "./Pages/auth/newPassword/newPassword";
import Otp from "./Pages/auth/password/otp";
import UploadPage from "./Pages/auth/uploadPhoto";
import BaseLayout from "./common/baseLayout";
import Loader from "./customComponents/loader/loader";
import Success from "./mobilepayment/Success";
import AuthStore from "./mobx/auth";
import Header from "./navigations/header";
import CheckAuth from "./utils/hooks/checkAuth";
import { RouteConstant } from "./utils/routes/constant";

function App() {
  const [toggle, setToggle] = useState(false)
  const auth = toJS(AuthStore?.user?.user);
  const loading = toJS(AuthStore?.isLoading);
  const loginData = localStorage.getItem("key");
  const isVerifiedUser = CheckAuth();
 
  useLayoutEffect(() => {
    AuthStore.setUser(JSON.parse(loginData));

  }, [loginData]);

  useEffect(() => {
    
    setToggle(true)
  }, [])
  //console.log("loginData", JSON.parse(loginData)?.user?.isVerified)
 
  if (!toggle) return <></>
  return (
    <div style={{height:"100%"}}>
      <MathJaxContext>
        <ToastContainer />
        {loading &&  <Loader />}
        {auth &&
          (isVerifiedUser && !localStorage?.isForgot ? (
            <Routes>
              <Route path="/*" element={<PrivateLayout />} />
            </Routes>)
            : (
              <>
                <Header />
                <Routes>
                  <Route path="/" element={
                  JSON.parse(loginData)?.user?.isVerified  ?
                  <Navigate to="institute" />:<Navigate to="verification" />                 
                  } />
                  <Route path="verification" element={<Otp />} />
                  <Route path="institute" element={<SelectInstitute />} />
                  <Route path="course" element={<SelectCourse />} />
                  <Route path="upload-photo" element={<UploadPage />} />
                  <Route path='newpassword' element={<NewPassword />} />
                  <Route path="*" element={<Navigate to="/verification" />} />
                </Routes>
              </>
            ))}
        {!auth && (
          <Routes>
            <Route path="auth/*" element={<BaseLayout />} />
            <Route path="/" element={<Navigate to={RouteConstant.login} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
            <Route path="/termsCondition" element={<TermsAndCondition/>} />
            <Route path="/mobilePayment" element={<Success/>} />
            <Route path="*" element={<Navigate to="auth/login" />} />
          </Routes>
        )}
      </MathJaxContext>
    </div>
  );
}
export default observer(App);
