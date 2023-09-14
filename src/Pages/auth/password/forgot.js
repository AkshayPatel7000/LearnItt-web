import { Formik } from "formik";
import jwt_decode from "jwt-decode";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Phone } from "../../../assets/icon/inputIcon";
import img from "../../../assets/images/layoutImg.png";
import { mobileNumber } from "../../../assets/regex";
import CustomButton from "../../../customComponents/button/customButton";
import CustomInput from "../../../customComponents/customTextInput";
import {
  LargHeading, SmallTiHeading
} from "../../../customComponents/DynamicText/Heading";
import StudentDetail from "../../../services/StudentService";

import AuthStore from "../../../mobx/auth";
import { ThemeColors } from "../../../theme/theme";
import "../signup/signup.scss";
import ErrorMsg from "../../../customComponents/errorMessage/ErrorMessage";

export default function ForgotPassword({ setHeight, width }) {
  const navigate = useNavigate();

  useEffect(() => {
    width <= 480 && setHeight(true);
  }, [setHeight, width]);

  const OnSubmit = async (values) => {
    const res = await StudentDetail.getTokenByNumber(values.mobileNumber)

    if (res?.isSuccess) {
      let decoded = jwt_decode(res?.data?.token);
      let userToken = {
        token: res?.data?.token,
        user: { ...decoded },
      };
      localStorage.setItem("key", JSON.stringify(userToken));
      localStorage.setItem("isForgot", true);
      AuthStore.setUser(userToken);
      AuthStore.setLoading(false);
      navigate("/verification");
      return res?.data;
    } else {
      toast.error(res?.messages);
    }

  };

  // const continueBtn = () => {
  //   // navigate("/verification")
  // }
  return (
    <>
      <div className="Aouterflex">
        <div className="Aleft-flex d-flex">
          <div className="Acontainer-flex">
            <div
              className="card px-3 py-3"
              style={{ border: "1px solid #D9E3EE", borderRadius: "20px" }}
            >
              <Formik
                initialValues={{
                  mobileNumber: "",
                }}
                onSubmit={async (values) => {

                  values.mobileNumber = `${values?.mobileNumber}`;
                  OnSubmit(values);
                }}
                validationSchema={Yup.object().shape({
                  mobileNumber: Yup.string()
                    .required("Mobile Number is Required")
                    .matches(mobileNumber, "Number is not valid"),
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
                        <LargHeading text="Forgot Password" />
                        <SmallTiHeading text="Please enter your Phone number. We’ll send you a confirmation code. We use it to ensure the security of our users." />

                        <div className="col-12 mb-3 pb-1 mt-4">
                          <CustomInput
                            name="mobileNumber"
                            id="mobileNumber"
                            value={values?.mobileNumber}
                            onChange={handleChange}
                            type="text"
                            lefticon={<Phone />}
                            label={"Mobile Number"}
                            placeholder={"Mobile number"}
                          />
                          {errors?.mobileNumber && touched?.mobileNumber && (
                            <ErrorMsg text={errors?.mobileNumber} />
                          )}
                        </div>

                        <div className="col-12 mb-3 pb-1">
                          <CustomButton
                            title="Continue"
                            type="submit"
                            func={handleSubmit}
                            background={
                              values?.mobileNumber
                                ? ThemeColors.primary
                                : ThemeColors.disable
                            }
                          />
                        </div>
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
    </>
  );
}
