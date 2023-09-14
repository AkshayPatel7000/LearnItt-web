import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
    CrossEyeIcon,
    EyeIcon,
    PasswordIcon,
    RightBlueIcon
} from "../../../assets/icon/inputIcon";
import img from "../../../assets/images/layoutImg.png";
import { passwordRegex } from "../../../assets/regex";
import CustomButton from "../../../customComponents/button/customButton";
import ModalPopup from "../../../customComponents/customModals/CustomModal";
import CustomInput from "../../../customComponents/customTextInput";
import {
    Heading,
    LargHeading, SmallHeading,
    SmallTiHeading
} from "../../../customComponents/DynamicText/Heading";
import ErrorMsg from "../../../customComponents/errorMessage/ErrorMessage";
import AuthServices from "../../../services/AuthService";

import { ThemeColors } from "../../../theme/theme";
import { RouteConstant } from "../../../utils/routes/constant";

import "../signup/signup.scss";

export default function NewPassword({ setHeight, width }) {
    const navigate = useNavigate();
    const [toggleIcon, setToggleIcon] = useState(false);
    const [newtoggleIcon, setNewToggleIcon] = useState(false);
    const [modal, setModal] = useState(false)
    const user = JSON.parse(localStorage.getItem("key"))?.user;
    useEffect(() => {
        width <= 480 && setHeight(true);
    }, [setHeight, width]);

    const newpass = async (data) => {
        let payload = {
            mobileNumber: user?.mobileNumber,
            newPassword: data?.newPassword,
            confirmPassword: data?.confirmPassword
        }
        const forgotPassword = await AuthServices?.forgotPassword(payload);
        if (forgotPassword?.isSuccess) {
            setModal(true)
        } else {
            toast.error(forgotPassword?.messages)
        }

    };
        

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
                                enableReinitialize
                                initialValues={{
                                    newPassword: "",
                                    confirmPassword: "",
                                }}
                                onSubmit={async (values) => {
                                    newpass(values);
                                }}
                                validationSchema={Yup.object().shape({
                                    newPassword: Yup.string().required("Password is required").matches(passwordRegex, "Password is not valid"),
                                    confirmPassword: Yup.string().when("newPassword",
                                        {
                                            is: val => (val && val.length > 0 ? true : false),
                                            then: Yup.string().oneOf([Yup.ref("newPassword")], "Both password need to be the same").required("Confirm password is required")
                                        }),
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
                                                <LargHeading text="Enter your new password" />
                                                <SmallTiHeading text="Welcome back, you have been missed!" />
                                                <div className="col-12 mb-3 pb-1 mt-4">
                                                    <CustomInput
                                                        name="newPassword"
                                                        id="newPassword"
                                                        value={values?.newPassword}
                                                        onChange={handleChange}
                                                        label="New Password"
                                                        type={!newtoggleIcon ? "password" : "text"}
                                                        lefticon={<PasswordIcon />}
                                                        righticon={
                                                            !newtoggleIcon ? <EyeIcon /> : <CrossEyeIcon />
                                                        }
                                                        placeholder={"Enter new password"}
                                                        rightIconFunc={() => {
                                                            setNewToggleIcon(!newtoggleIcon);
                                                        }}
                                                    />
                                                    {errors?.newPassword && touched?.newPassword && (
                                                         <ErrorMsg text={errors?.newPassword} />
                                                    )}

                                                </div>

                                                <div className="col-12 mb-3 pb-1">
                                                    <CustomInput
                                                        name="confirmPassword"
                                                        id="confirmPassword"
                                                        value={values?.confirmPassword}
                                                        onChange={handleChange}
                                                        label="Re-enter New Password"
                                                        type={!toggleIcon ? "password" : "text"}
                                                        lefticon={<PasswordIcon />}
                                                        righticon={
                                                            !toggleIcon ? <EyeIcon /> : <CrossEyeIcon />
                                                        }
                                                        placeholder={"Re-enter new password"}
                                                        rightIconFunc={() => {
                                                            setToggleIcon(!toggleIcon);
                                                        }}
                                                    />
                                                    {errors?.confirmPassword && touched?.confirmPassword && (
                                                         <ErrorMsg text={errors?.confirmPassword} />
                                                    )}
                                                </div>
                                                <div className="col-12 mb-3 pb-1">
                                                    <CustomButton
                                                        // func={() => { setModal(true) }}
                                                        title="Reset Password"
                                                        // type="submit"
                                                        background={
                                                            (values?.newPassword && values.confirmPassword)
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
            {
                modal &&
                <ModalPopup
                    width={"100%"}
                    isFooter={false}
                    CloseModalFunc={() => {setModal(false);navigate(RouteConstant.login); AuthServices.removeLogin()}}
                >
                    <div className="modeltextCenter ">
                        <RightBlueIcon />

                        <Heading padding="13px" text="Successful password reset!" />
                        < SmallHeading text="You can now use your new password to login to your account." />
                        <CustomButton
                            func={() => { navigate(RouteConstant.login); AuthServices.removeLogin() }}
                            style={{ marginTop: "20px" }}
                            title="Login"
                            type="submit"

                        />
                    </div>
                </ModalPopup>
            }
        </>
    );
}