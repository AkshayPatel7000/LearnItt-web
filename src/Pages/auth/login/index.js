import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  CrossEyeIcon,
  EyeIcon,
  PasswordIcon,
  UserIcon,
} from "../../../assets/icon/inputIcon";
import img from "../../../assets/images/layoutImg.png";
import { emailregex, mobileNumber, passwordRegex } from "../../../assets/regex";
import CustomButton from "../../../customComponents/button/customButton";
import Checkbox from "../../../customComponents/checkbox/Checkbox";
import CustomInput from "../../../customComponents/customTextInput";
import {
  LargHeading,
  NormalTileHeading,
  SmallHeading,
} from "../../../customComponents/DynamicText/Heading";
import ErrorMsg from "../../../customComponents/errorMessage/ErrorMessage";
import AuthStore from "../../../mobx/auth";
import AuthServices from "../../../services/AuthService";
import { ThemeColors } from "../../../theme/theme";
import CheckAuth from "../../../utils/hooks/checkAuth";
import { RouteConstant } from "../../../utils/routes/constant";

const LoginPage = () => {
  const [toggleIcon, setToggleIcon] = useState(false);
  const isVerifiedUser = CheckAuth();
  const navigate = useNavigate();

  const login = async (data) => {
    let payload = { password: data?.password };
    if (emailregex.test(data?.email)) {
      payload.email = data?.email
    } else if (mobileNumber.test(data?.email)) {
      payload.mobileNumber = data?.email
    }
    if (!emailregex.test(data?.email) && !mobileNumber.test(data?.email)) {
      toast.error("please enter valid email or phone number");
    } else {
      const res = await AuthServices.login(payload);
      if (res?.isSuccess) {
        toast.success(res?.messages);
        AuthStore.setDisplay("")
        if (isVerifiedUser) {
          navigate(RouteConstant?.dashboard);
        } else {
          //console.log("kabdh")
          if (!AuthStore?.user?.user?.isVerified) {
            //console.log("kabdh1",AuthStore?.user?.user)
            navigate(RouteConstant?.verification,{state:'login'});
          } else if (!AuthStore?.user?.user?.instituteId) {
            //console.log("kabdh2",AuthStore?.user?.user)
            navigate(RouteConstant?.institute);
          } else if (!AuthStore?.user?.user?.subcourseId) {
            //console.log("kabdh3",AuthStore?.user?.user)
            navigate(RouteConstant?.course);
          }
        }
      } else {
        toast.error(res?.messages);
      }
    }

  }
  const forgot = () => {
    localStorage.setItem("isForgot", true)
    navigate("/auth/forgot-password")
  }
  return (
    <div className="Aouterflex">
      <div className="Aleft-flex d-flex align-items-center">
        <div className="Acontainer-flex">
          <div
            className="card px-3 py-3"
            style={{ border: "1px solid #D9E3EE", borderRadius: "20px" }}
          >
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                login(values);
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().required(
                  "Email or Phone number is Required"
                ),
                password: Yup.string()
                  .required("Password is Required")
                  .matches(passwordRegex, "Password should be atleast 8 character with 1 uppercase 1 special character"),
              })}
            >
              {(props) => {
                const { values, touched, errors, handleChange, handleSubmit } =
                  props;
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="row m-0 pt-3 gap-2">
                      <LargHeading text="Let’s sign you in!" />
                      <NormalTileHeading text="Welcome back, you have been missed!" />
                      <div className="col-12 mb-3 pb-1 mt-3">
                        <CustomInput
                          name="email"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          label="Mobile/Email"
                          type="text"
                          lefticon={<UserIcon />}
                          righticon={""}
                          placeholder={"Mobile/Email"}
                        />
                        {errors.email && touched.email && (
                          <ErrorMsg text={errors?.email} />
                        )}
                      </div>
                      <div className="col-12 mb-3 pb-1">
                        <CustomInput
                          name="password"
                          id="password"
                          value={values.password}
                          onChange={handleChange}
                          label="Password"
                          type={!toggleIcon ? "password" : "text"}
                          lefticon={<PasswordIcon />}
                          righticon={
                            !toggleIcon ? <EyeIcon /> : <CrossEyeIcon />
                          }
                          placeholder={"Minimum 8 characters"}
                          rightIconFunc={() => {
                            setToggleIcon(!toggleIcon);
                          }}
                        />
                        {errors.password && touched.password && (
                          <ErrorMsg text={errors?.password} />
                        )}
                      </div>
                      <div className="col-12 mb-3 pb-1 d-flex justify-content-between">
                        <div className="d-flex gap-2">
                          <Checkbox />
                          <SmallHeading text="Remember password" />
                        </div>
                        <div className="text-center" onClick={forgot}>
                          <SmallHeading text="Forgot password?" />
                        </div>
                      </div>
                      <div className="col-12 mb-3 pb-1">
                        <CustomButton
                          title="Login"
                          type="submit"
                          background={
                            values?.email && values?.password
                              ? ThemeColors.primary
                              : ThemeColors.disable
                          }
                        />
                      </div>

                      {/* <div className="col-12 mb-3 pb-1 ">
                        <CustomButton title="Continue with Google" icon={<GoogleIcon />} type="button" background={ThemeColors.inputbg}
                          style={{
                            color: "black",
                            fontFamily: 'Medium',
                            fontStyle: "Medium",
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "20px",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center"
                          }}
                          iconStyle={{
                            textAlign: "start",
                          }}
                          titleStyle={{ width: "100%" }}
                        />
                      </div> */}
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      <img src={img} alt="" className="Aright-flex" />
    </div>
  );
};

export default LoginPage;
