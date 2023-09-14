import { toJS } from "mobx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SidebarModalPopup from "../Sidebar/sidebarModel";
import { Siderbar } from "../Sidebar/siderbar";
import { HeadLogo } from "../assets/icon/inputIcon";
import logo from "../assets/images/blank-profile.png";
import { Tribar } from "../assets/svg";
import {
  SmallHeading,
  TitleHeading,
} from "../customComponents/DynamicText/Heading";
import CustomButton from "../customComponents/button/customButton";
import ModalPopup from "../customComponents/customModals/CustomModal";
import CustomTextArea from "../customComponents/customTextInput/testArea";
import AuthStore from "../mobx/auth";
import "../navigations/header.css";
import AuthServices from "../services/AuthService";
import StudentDetail from "../services/StudentService";
import { ThemeColors } from "../theme/theme";
import CheckAuth from "../utils/hooks/checkAuth";
import { RouteConstant } from "../utils/routes/constant";
import newLogo from "../assets/images/lbf.png";
export default function Header() {
  /* eslint-disable */
  const checkConditons =
    window.location.pathname !== RouteConstant.questionPage &&
    window.location.pathname !== RouteConstant.mockTestResult;
  const [modal, setModal] = useState(false);
  const [studentFeedback, setStudentFeedback] = useState("");

  const [on, setOn] = React.useState(false);
  const path = window.location.href.split("/");
  const myStyle = {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "20px",
    color: ThemeColors.white,
  };
  const user = toJS(AuthStore?.user?.user);
  const navigate = useNavigate();
  const isVerified = CheckAuth();
  const signOut = () => {
    AuthServices.removeLogin();
    navigate(RouteConstant?.login);
  };
  const handleOn = () => {
    setOn(!on);
  };
  const profile = () => {
    navigate(RouteConstant?.profile);
  };
  const About = () => {
    navigate(RouteConstant?.About);
  };

  const sendFeedback = async () => {
    let resp = await StudentDetail.addFeedback({
      studentFeedback: studentFeedback,
    });
    if (resp.isSuccess) {
      toast.success(resp?.messages);
      setModal(false);
      setStudentFeedback("");
    } else {
      toast.error(resp?.messages);
    }
  };
  const wallet = () => {
    navigate(RouteConstant.Wallet);
  };
  return (
    <>
      <header>
        <div
          className={`tribarShow w-70 ${AuthStore.display}`}
          onClick={handleOn}
        >
          <Tribar />
        </div>
        {on && (
          <SidebarModalPopup onfun={handleOn}>
            <Siderbar on={on} setOn={setOn} />
          </SidebarModalPopup>
        )}

        {!isVerified && (
          <div style={{ paddingLeft: "2.3%" }}>
            <div style={{ width: "52px", height: "52px" }}>
              <img src={newLogo} style={{ width: "100%", height: "100%" }} />
            </div>
            {/* <HeadLogo /> */}
            {/* <XLargHeading text="Krackitt" /> */}
          </div>
        )}
        <div style={{ width: "75" }}></div>
        {/* {isVerified && <img src={user?.instituteLogo} alt="logo" width="75" />} */}
        <div className="H-btn">
          {path[4] === "login" && (
            <>
              <TitleHeading text="Don’t have any account?" />
              <CustomButton
                width="111px"
                title="Signup"
                type="submit"
                background={ThemeColors.primary}
                style={myStyle}
                func={() => {
                  navigate(RouteConstant.signup);
                  localStorage.clear();
                }}
              />
            </>
          )}
          {(path[4] === "sign-up" || path[4] === "forgot-password") && (
            <>
              <TitleHeading text="Already have an account?" />
              <CustomButton
                width="111px"
                title="Login"
                type="submit"
                background={ThemeColors.primary}
                style={myStyle}
                func={() => {
                  navigate(RouteConstant.login);
                  localStorage.clear();
                }}
              />
            </>
          )}
          {isVerified && !localStorage?.isForgot === true && (
            <div className="mt-2">
              {/* <BellIcon /> */}
              <div className="btn-group">
                <div
                  className="d-flex gap-2 profileDropDown align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
                  id="defaultDropdown"
                  data-bs-toggle={checkConditons && "dropdown"}
                  data-bs-auto-close="true"
                  aria-expanded="false"
                  style={{ cursor: checkConditons && "pointer" }}
                >
                  <SmallHeading text={user?.name} />
                  <img
                    src={user?.profileImage || logo}
                    alt="profile-Img"
                    className="profileImg"
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50px",
                    }}
                  />
                </div>
                <ul
                  className="dropdown-menu profileMenu"
                  aria-labelledby="defaultDropdown"
                >
                  <li>
                    <a className="dropdown-item" onClick={profile}>
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        navigate(RouteConstant.myPurchase);
                      }}
                    >
                      My Purchased
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={wallet}>
                      Wallet
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        setModal(true);
                        setStudentFeedback("");
                      }}
                    >
                      Contact Us
                    </a>
                  </li>
                  {/* <li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        navigate(RouteConstant.aboutUs);
                      }}
                    >
                      About Us
                    </a>
                  </li> */}

                  <li>
                    <a className="dropdown-item" onClick={signOut}>
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </header>
      {modal && (
        <ModalPopup
          width={"100%"}
          isFooter={false}
          CloseModalFunc={() => setModal(false)}
        >
          <div className="card border-0 mb-3">
            <TitleHeading text="How can we help you?" />
          </div>
          <div className="C-subHeading">
            Leave us a message, we will get contact with you as soon as
            possible.
          </div>
          <CustomTextArea
            name="Feedback"
            id="Feedback"
            height="100px "
            label="Feedback"
            placeholder={"Feedback"}
            value={studentFeedback}
            onChange={(e) => {
              setStudentFeedback(e?.target?.value);
            }}
          />
          <CustomButton
            style={{ marginTop: "30px" }}
            title="Submit"
            disable={!studentFeedback}
            func={() => sendFeedback()}
          />
        </ModalPopup>
      )}
    </>
  );
}
