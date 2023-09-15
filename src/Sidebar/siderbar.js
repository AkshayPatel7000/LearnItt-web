import React from "react";
import { WhiteClose } from "../assets/svg";
// import { IMG } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import { Logo } from "../assets/icon/inputIcon";
import sidebarImg from "../assets/images/Frame 34031.png";
import { CategoryHeading } from "../customComponents/Header/cardheader";
import AuthStore from "../mobx/auth";
import { RouteConstant } from "../utils/routes/constant";
import { SidebarData } from "./SideBarData";
import { LogoSide, MainSideBar, SidebarStyled } from "./SideBarStyled";
import { SidebarMenu, SidebarSubMenu } from "./SidebarMenu";
import InstituteDropdown from "./instituteDropdown/InstituteDropdown";
import "./sidebar.css";
import newLogo from "../assets/images/lbf.png";
export const Siderbar = ({ on, setOn, length }) => {
  const version = process.env.REACT_APP_VERSION;

  const [activeSideItem, setActiveSideItem] = React.useState({});
  const [opened, setOpened] = React.useState(false);
  const navigate = useNavigate();

  const subMenOpen = (sideitem) => {
    setActiveSideItem(sideitem);
    if (activeSideItem.key === sideitem.key) {
      setOpened(!opened);
    } else {
      setOpened(true);
    }
  };
  return (
    <div className={`${AuthStore.display} h-100`}>
      <SidebarStyled on={on}>
        {on && (
          <div
            className="crossIcon position-absolute"
            style={{ right: "10px" }}
            onClick={() => setOn(false)}
          >
            <WhiteClose />
          </div>
        )}
        <LogoSide className="df-c-ac">
          <div style={{ width: "98px", height: "100px" }}>
            <img src={newLogo} style={{ width: "100%", height: "100%" }} />
          </div>
          {/* <Logo /> */}
        </LogoSide>
        <MainSideBar>
          <>
            <InstituteDropdown />
            {SidebarData.map((sideitem, index) => {
              return (
                <>
                  <SidebarMenu
                    sideitem={sideitem}
                    key={index}
                    onfun={() => {
                      subMenOpen(sideitem);
                      !sideitem.submenus && setOn && setOn(false);
                    }}
                    badge={length}
                  />
                  {activeSideItem?.submenus?.map((sub, subindex) => {
                    return (
                      <>
                        {activeSideItem?.key === sideitem.key && opened && (
                          <SidebarSubMenu
                            sub={sub}
                            key={subindex}
                            onfun={() => setOn && setOn(false)}
                          />
                        )}
                      </>
                    );
                  })}
                </>
              );
            })}
          </>
        </MainSideBar>
        <div
          className="d-flex flex-column ms-3 mb-3"
          style={{ width: "fit-content" }}
        >
          <img src={sidebarImg} alt="" />
          <div
            className="ms-4 mt-2 pointer"
            onClick={() => {
              // navigate(RouteConstant?.termsCondition);
            }}
          >
            <CategoryHeading text={`Terms & Conditions`} />
          </div>
          <div
            className="ms-4 mt-2 pointer"
            onClick={() => {
              // navigate(RouteConstant?.privacyPolicy);
            }}
          >
            <CategoryHeading text={`Privacy Policy ${version}`} />
          </div>
        </div>
      </SidebarStyled>
    </div>
  );
};
