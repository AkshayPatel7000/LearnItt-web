import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  CrossEyeIcon,
  EyeIcon,
  MailIcon,
  PasswordIcon,
  Phone,
  UserIcon,
} from "../../../assets/icon/inputIcon";
import img from "../../../assets/images/layoutImg.png";
import {
  alphabetOnly,
  emailregex,
  mobileNumber,
  passwordRegex,
} from "../../../assets/regex";
import CustomButton from "../../../customComponents/button/customButton";
import CustomInput from "../../../customComponents/customTextInput";
import {
  LargHeading,
  NormalTileHeading,
} from "../../../customComponents/DynamicText/Heading";
import ErrorMsg from "../../../customComponents/errorMessage/ErrorMessage";
import AuthStore from "../../../mobx/auth";
import AuthServices from "../../../services/AuthService";
import { ThemeColors } from "../../../theme/theme";
import CheckAuth from "../../../utils/hooks/checkAuth";
import { RouteConstant } from "../../../utils/routes/constant";
import "./signup.scss";
import ModalPopup from "../../../customComponents/customModals/CustomModal";
import PrivacyPolicy from "../../PublicPages/staticContent/PrivacyPolicy";
import TermsAndCondition from "../../PublicPages/staticContent/termsAndCondition";

export default function Signup({ setHeight, width }) {
  const navigate = useNavigate();
  const [toggleIcon, setToggleIcon] = useState(false);
  const [open, setOpen] = useState(false);
  const [openTC, setOpenTC] = useState(false);
  const isVerifiedUser = CheckAuth();
  useEffect(() => {
    width <= 480 && setHeight(true);
  }, [setHeight, width]);

  const SignUp = async (data) => {
    const res = await AuthServices.signUp(data);
    if (res?.isSuccess) {
      toast.success(res?.messages);
      if (isVerifiedUser) {
        navigate(RouteConstant?.dashboard);
      } else {
        if (!AuthStore?.user?.user?.isVerified) {
          navigate(RouteConstant?.verification, { state: "signup" });
        } else if (!AuthStore?.user?.user?.instituteId) {
          navigate(RouteConstant?.institute);
        } else if (!AuthStore?.user?.user?.subcourseId) {
          navigate(RouteConstant?.course);
        }
      }
    } else {
      toast.error(res?.messages);
    }
  };
  return (
    <>
      <div className="Aouterflex">
        <div className="Aleft-flex d-flex align-items-center">
          <div className="Acontainer-flex">
            <div
              className="card px-3 mt-3"
              style={{ border: "1px solid #D9E3EE", borderRadius: "20px" }}
            >
              <Formik
                initialValues={{
                  fullName: "",
                  mobileNumber: "",
                  email: "",
                  password: "",
                }}
                onSubmit={async (values) => {
                  values.mobileNumber = `${values?.mobileNumber}`;
                  SignUp(values);
                }}
                validationSchema={Yup.object().shape({
                  fullName: Yup.string()
                    .required("Full Name is Required")
                    .matches(alphabetOnly, "Full name must be valid"),
                  mobileNumber: Yup.string()
                    .required("Mobile Number is Required")
                    .matches(mobileNumber, " Mobile Number must be valid"),
                  email: Yup.string()
                    .email()
                    .required("Email is Required")
                    .matches(emailregex, "Email must be valid"),
                  password: Yup.string()
                    .required("Password is Required")
                    .matches(passwordRegex, "Password must be valid"),
                })}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleSubmit,
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="row m-0 pt-3">
                        <LargHeading text="Hey, enter your details to get sign up to create your account" />
                        <NormalTileHeading text="Signup to start learning on Learnitt today" />
                        <div className="col-12 mb-3 pb-2 mt-4 pt-1">
                          <CustomInput
                            name="fullName"
                            type="text"
                            value={values?.fullName}
                            onChange={handleChange}
                            lefticon={<UserIcon />}
                            righticon={""}
                            label={"Full Name"}
                            placeholder={"Enter Full Name"}
                          />
                          {errors?.fullName && touched?.fullName && (
                            <ErrorMsg text={errors?.fullName} />
                          )}
                        </div>
                        <div className="col-12 mb-3 pb-2">
                          <CustomInput
                            name="mobileNumber"
                            id="mobileNumber"
                            value={values?.mobileNumber}
                            onChange={handleChange}
                            type="text"
                            lefticon={<Phone />}
                            label={"Mobile Number"}
                            placeholder={"Enter Mobile Number"}
                          />
                          {errors?.mobileNumber && touched?.mobileNumber && (
                            <ErrorMsg text={errors?.mobileNumber} />
                          )}
                        </div>
                        <div className="col-12 mb-3 pb-2">
                          <CustomInput
                            name="email"
                            id="email"
                            value={values?.email}
                            onChange={handleChange}
                            label="Email"
                            type="text"
                            lefticon={<MailIcon />}
                            righticon={""}
                            placeholder={"Enter Email Address"}
                          />
                          {errors?.email && touched?.email && (
                            <ErrorMsg text={errors?.email} />
                          )}
                        </div>
                        <div className="col-12 mb-3 pb-2">
                          <CustomInput
                            name="password"
                            id="password"
                            value={values?.password}
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
                          {errors?.password && touched?.password && (
                            <ErrorMsg text={errors?.password} />
                          )}
                        </div>
                        <div className="d-flex  justify-content-center">
                          {" "}
                          <p style={ThemeColors?.font?.privacyHeading}>
                            By clicking Signup, you agree to our{" "}
                            <span
                              style={{ color: ThemeColors?.lightBlue }}
                              onClick={() => setOpenTC(!openTC)}
                            >
                              Terms & Conditions
                            </span>{" "}
                            and have read and acknowledge our{" "}
                            <span
                              style={{ color: ThemeColors?.lightBlue }}
                              onClick={() => setOpen(!open)}
                            >
                              Privacy Policy
                            </span>
                            .
                          </p>
                        </div>
                        <div className="col-12 mb-3 pb-2">
                          <CustomButton
                            title="Signup"
                            type="submit"
                            background={
                              values?.fullName &&
                              values?.email &&
                              values?.mobileNumber &&
                              values?.password
                                ? ThemeColors.primary
                                : ThemeColors.disable
                            }
                            disable={
                              !values?.fullName ||
                              !values?.mobileNumber ||
                              !values?.password ||
                              !values?.email
                            }
                          />
                        </div>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>

            {open && (
              <ModalPopup
                isFooter={false}
                width={"80%"}
                maxModalWidth={"1200px"}
                closeCrossbtnfunc={() => setOpen(false)}
                closeCrossbtn={true}
              >
                <PrivacyPolicy />
              </ModalPopup>
            )}
            {openTC && (
              <ModalPopup
                isFooter={false}
                width={"80%"}
                maxModalWidth={"1200px"}
                closeCrossbtnfunc={() => setOpenTC(false)}
                closeCrossbtn={true}
              >
                <TermsAndCondition />
              </ModalPopup>
            )}
          </div>
        </div>
        <img src={img} alt="" className="Aright-flex" />
      </div>
    </>
  );
}
