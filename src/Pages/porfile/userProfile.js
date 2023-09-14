import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { CameraIcon, InstituteIcon, MailIcon, Phone, PhoneRight, UserIcon } from "../../assets/icon/inputIcon";
import picUpload from "../../assets/images/blank-profile-2.png";
import ProfileBackgroungd from "../../assets/images/ProfileBackgroungd.png";
import { alphabetOnly, emailregex, mobileNumber, numberOnly } from "../../assets/regex";
import CustomButton from "../../customComponents/button/customButton";
import CustomInput from "../../customComponents/customTextInput";
import Dropdown from "../../customComponents/dropdown/dropdown";
import { ResultTitleHeading, SmallHeading, TitleHeading } from "../../customComponents/DynamicText/Heading";
import ErrorMsg from "../../customComponents/errorMessage/ErrorMessage";
import AuthStore from "../../mobx/auth";
import Account from "../../services/AccountService";
import AuthServices from "../../services/AuthService";
import StudentDetail from "../../services/StudentService";
import { ThemeColors } from "../../theme/theme";
import "./useProfile.css";
import GetOTP from "../../utils/hooks/getOTP";
import ModalPopup from "../../customComponents/customModals/CustomModal";
export const mobileNumberCheck = /^[0-9]{10}$/;
let intervalHandle;
let secondsRemaining;
 /* eslint-disable */
const Profile = () => {
    const $input = useRef(null);
    const [profile, setProfile] = useState()
    const [img, setImg] = useState();
    const [isSend, setIsSend] = useState(false);
    const [modal, setModal] = useState(false);
    const [time, setTime] = useState({ value: 0, seconds: 0 }); 
    const [otp, setOtp] = useState();
    const [mobileNumber, setMobileNumber] = useState()
    const [otpfield, setOtpField] = useState(['', '', '', ""])
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        getStudentProfile();
    }, [])


    const getStudentProfile = async () => {
        const resp = await Account?.getStudentProfile(AuthStore?.user?.user?.userId);
        if (resp?.isSuccess) {
            setProfile(resp?.data)
            setImg(resp?.data?.profileImage);
        }
    }

    const Profiles = async (data) => {
        if (img !== data?.profileImage) {
            const formData = new FormData();
            formData.append("Image", data?.imageFile);
            data.profileImage = await profileUpload(formData);
        }
        let resp = await AuthServices.updateProfile(data);
        if (resp?.isSuccess) {
            toast.success(resp.messages)
        }else{
            toast.error(resp.messages)
        }
    }

    const imageChange = (file) => {
        if (file[0]?.type === "image/png" || file[0]?.type === "image/jpg" || file[0]?.type === "image/jpeg" || file[0]?.type === "image/bmp") {
            if (file[0].size < 5000) {
                toast.error("file size must be greater than 5 kb");
            }
            else if (file[0].size >= 1.6e7) {
                toast.error("file size must be less than 16 mb");
            }
            else {
                setImg(URL.createObjectURL(file[0]));
                // setFile(file[0]);
            }
        }
        else {
            toast.error("file format is not valid");
        }
    };

    const profileUpload = async (data) => {
        const UploadRes = await StudentDetail.profileImageUpload(data)
        if (UploadRes?.isSuccess) {
            toast.success(UploadRes?.messages)
            return UploadRes?.data;
        } else {
            toast.error(UploadRes?.messages)
        }
    }


    const changeMobile =async(value)=>{
        setOtpField(['','','',''])
        //console.log("object",value);
        setMobileNumber(value)
        setIsMobile(true)
  
    
    let payload = {
        mobileNumber: value,
        callingUnit:"Update"
      }
      const res = await  GetOTP(payload)
      if (res?.isSuccess) {
        startCountDown();
        toast.success(res?.messages)
        setOtp(atob(res?.data?.otp))
      //  console.log("otp", atob(res?.data?.otp))
        setModal(true)
      }
      else{
        setModal(false)
      }
   
    }
   const checkNumber= async(value)=>{
     if(mobileNumberCheck.test(value)){
        // console.log("---->", value);
        setIsSend(true)
     }
   

   }
    const startCountDown = () => {
        clearInterval(intervalHandle);
        setTime({ seconds: 0, value: 0 })
        // const { value } = time;
        intervalHandle = setInterval(Timer, 1000);
        secondsRemaining = 60;
      };
    
      const verify = async (e) => {
        e.preventDefault();
        clearInterval(intervalHandle);
        setTime({ seconds: 0, value: 0 })
        let OTP = otpfield[0] + otpfield[1] + otpfield[2] + otpfield[3];
        if (OTP === otp) {
            toast.success("OTP Verified...")
            setModal(false)

        }
        else {
          toast.error("OTP did not Matched...")
        }
      }
      
      const Timer = () => {
        let min = Math.floor(secondsRemaining / 60);
        let sec = secondsRemaining - min * 60;
        setTime({ value: min, seconds: sec });
        if ((min === 0) & (sec === 0)) {
          clearInterval(intervalHandle);
        }
        return secondsRemaining--;
      }
    const handleChange = (e, index) => {
        let isNumber = numberOnly.test(e.target.value)
        if (!isNumber) return
        let otpfieldcopy = [...otpfield]
        otpfieldcopy[index] = e.target.value;
        setOtpField(otpfieldcopy)
      }

      const inputfocus = (elmnt, ind) => {
        const index = elmnt.target.tabIndex
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
          let otpfieldcopy = [...otpfield]
          otpfieldcopy[ind] = '';
          setOtpField(otpfieldcopy)
          const next = index - 1;
          if (next > -1) {
            elmnt.target.form.elements[next].focus()
          }
        }
        else {
          const next = index + 1;
          let num = numberOnly.test(elmnt.target.form.elements[index].value)
          if (next < 6 && num) {
            elmnt.target.form.elements[next].focus()
          }
        }
      }
      
    return (
        <>
      
        <Formik
            enableReinitialize
            initialValues={{
                id: profile?.id,
                fullName: profile?.name,
                mobileNumber: profile?.mobileNumber,
                email: profile?.email,
                instituteId: profile?.instituteId,
                subcourseId: profile?.subcourseId,
                profileImage: profile?.profileImage
            }}
            onSubmit={async (values) => {
                Profiles(values);
                setIsSend(!isSend)

            }}
            validationSchema={Yup.object().shape({
                fullName: Yup.string().required("Full Name is Required").matches(alphabetOnly, "Full name is not valid"),
                mobileNumber: Yup.string().required("Mobile Number is Required").matches(mobileNumberCheck, "Number is not valid"),
                email: Yup.string().email().required("Email is Required").matches(emailregex, "Email is not valid"),
            })}
        >
            {(props) => {
                const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue
                } = props;
                return (
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <div className="hello d-flex justify-content-center position-relative" style={{ backgroundImage: `url(${ProfileBackgroungd})` }} >
                                <div className="container1">
                                    <img alt="profile-img" src={img || picUpload} style={{ marginTop: "50px", marginBottom: "-20px", width: "150px", height: "150px", borderRadius: "75px" }} />
                                    <a className="icon pointer" onClick={() => { $input.current.click() }}>
                                        <CameraIcon />
                                        <input
                                            style={{ display: "none" }}
                                            type="file"
                                            accept="image/png, image/jpeg, image/jpg, image/bmp"
                                            ref={$input}
                                            onChange={(e) => { imageChange(e.target.files); setFieldValue("imageFile", e.target.files[0]) }}
                                        />
                                    </a>
                                </div>
                            </div>
                            <div className="m-0 pt-5 d-flex justify-content-center row" style={{ width: "100%" }}>
                                <div style={{ paddingLeft: "20px", width: "51%" }}>
                                    <ResultTitleHeading text="My Profile" />
                                </div>
                                <div className="profileField d-grid" style={{ width: "50%", gap: "25px" }}>
                                    <div className="col-12 mt-4 position-relative">
                                        <CustomInput
                                            name="fullName"
                                            type="text"
                                            value={values?.fullName}
                                            onChange={handleChange}
                                            lefticon={<UserIcon />}
                                            righticon={""}
                                            label={"Full Name"}
                                            placeholder={"Enter Full Name"} />
                                        {errors?.fullName && touched?.fullName && (
                                            <ErrorMsg text={errors?.fullName} />
                                        )}
                                    </div>
                                    <div className="col-12 position-relative">
                                        <CustomInput
                                            name="mobileNumber"
                                            value={values?.mobileNumber}
                                            onChange={(e)=>{handleChange(e);checkNumber(e?.target?.value)}}
                                            type="text"
                                            lefticon={<Phone />}
                                            righticon={isSend && <span onClick={()=>{changeMobile(values?.mobileNumber)}}> <PhoneRight/></span>}
                                            label={"Mobile Number"}
                                            placeholder={"Enter Mobile Number"}
                                        />
                                        {errors?.mobileNumber && touched?.mobileNumber && (
                                            <ErrorMsg text={errors?.mobileNumber} />
                                        )}
                                    </div>
                                    <div className="col-12 position-relative">
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
                                    {/* <div className="col-12">
                                        <Dropdown
                                            placeholder={profile?.instituteName}
                                            label="Institute Name"
                                            selectedEntity={profile?.instituteName}
                                            lefticon={<InstituteIcon />}
                                            disable={true}
                                        />
                                    </div> */}
                                    <div className="col-12">
                                        <Dropdown
                                            placeholder={profile?.courseName}
                                            label="Course Name"
                                            selectedEntity={profile?.courseName}
                                            lefticon={<InstituteIcon />}
                                            disable={true}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <Dropdown
                                            placeholder={profile?.subcourseName}
                                            label="Sub-Course Name"
                                            selectedEntity={profile?.subcourseName}
                                            lefticon={<InstituteIcon />}
                                            disable={true}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <CustomButton
                                            title={isMobile ? "Save Changes": "Edit Details"}
                                            type="submit"
                                            background={ThemeColors.primary}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                );
            }}
        </Formik >
        {
            modal && 
            <ModalPopup
            width={"100%"}
            isFooter={false}
            CloseModalFunc={() => setModal(false)}
        >
            <div className="card border-0 mb-3">
             <TitleHeading text="Verify your mobile number" />
             </div>
             <div className="C-subHeading">
             Enter the 4 digit verification code that has been sent to your mobile number {mobileNumber}  Please verify your mobile number to continue.
            </div>
            <form>
                  <div className='pb-3 d-flex justify-content-center' style={{ gap: "20px" }}>
                    {
                      otpfield.map((item, i) =>
                        <CustomInput key={i} name="text" placeholder={"-"} type="text" inputRef={i === 0 && true} value={item} autoComplete="off" label={item} tabIndex={i} maxLength="1" onClick={handleChange} onKeyUp={inputfocus} />
                      )
                    }
                  </div>
                  <CustomButton title="Continue" type="button" style={{ color: ThemeColors.white }} func={(e) => verify(e)} disable={(otpfield[0] && otpfield[1] && otpfield[2] && otpfield[3] ? false : true)} />
                  <div className='text-center pt-3'>
                    {(time?.seconds !== 0 && time?.seconds !== 60) && < SmallHeading text={time.value + ":" + time.seconds} />                }
                  </div>
                  {/* {time?.seconds === 0 && <p className='text-center' style={{ fontFamily: 'SemiBold', fontWeight: 400, fontSize: "14px" }} >Haven’t received your OTP yet ? <a className='pointer' style={{ color: ThemeColors.lightBlue }} onClick={() => { getOTPCode(mobileNumber) }} >Resend</a></p>} */}
                </form>
        </ModalPopup>
        }
        </>
    )
};

export default Profile;
