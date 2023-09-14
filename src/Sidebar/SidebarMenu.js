import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { DownArrow } from "../assets/svg/index";
import { RouteConstant } from "../utils/routes/constant";
import {
  Arrow,
  ContentDiv,
  InnerSidebar,
  SideMenuStyled,
  SideSubMenuStyled,
  SubContentDiv,
} from "./SideBarStyled";
import "./sidebar.css";
export const SidebarMenu = ({ sideitem, onfun, badge }) => {
  const [iconShow, setIconShow] = React.useState(false);
  const location = useLocation();
  const [opened, setOpened] = React.useState(false);
  const checkActiveItem = (items) => {
    let result = items?.submenus.filter(
      (obj) => obj?.path === location.pathname
    );
    if (result?.length > 0) {
      // onfun(items)
      return "df g10 Sidebar isActive";
    } else {
      return "Sidebar df g10";
    }
  };
  return (
    <SideMenuStyled>
      {sideitem?.submenus ? (
        <p className={"text-deco"} onClick={onfun}>
          <ContentDiv
            onMouseEnter={() => setIconShow(true)}
            onMouseLeave={() => setIconShow(false)}
            className={checkActiveItem(sideitem)}
            onClick={() => setOpened(!opened)}
          >
            <InnerSidebar className="df-sb w100">
              <div className="df-ac g10">
                {iconShow === false && (
                  <div className="df-ac">{sideitem.icon}</div>
                )}
                {iconShow === true && (
                  <div className="df-ac">{sideitem.iconHover}</div>
                )}
                {/* <div className="df" style={{ fontSize: "16px" }} >{ sideitem.title==="My Cart"  ?  <span>{`${sideitem.title}${0}`}</span>: sideitem.title}</div> */}
                <div className="df" style={{ fontSize: "16px" }}>
                  {sideitem.title}
                </div>
              </div>
              {sideitem.submenus && (
                <Arrow onfun={opened}>
                  <DownArrow />
                </Arrow>
              )}
            </InnerSidebar>
          </ContentDiv>
        </p>
      ) : (
        <NavLink to={sideitem.path} className={"text-deco"} onClick={onfun}>
          <ContentDiv
            onMouseEnter={() => setIconShow(true)}
            onMouseLeave={() => setIconShow(false)}
            className={
              location.pathname.includes(sideitem.path)
                ? "df g10 Sidebar isActive"
                : "Sidebar df g10"
            }
            onClick={() => setOpened(!opened)}
          >
            <InnerSidebar className="df-sb w100">
              <div className="df-ac g10">
                {iconShow === false && (
                  <div className="df-ac">{sideitem.icon}</div>
                )}
                {iconShow === true && (
                  <div className="df-ac">{sideitem.iconHover}</div>
                )}
                <div className="df" style={{ fontSize: "16px" }}>
                  {sideitem.title}
                </div>
              </div>
              {sideitem.submenus && (
                <Arrow onfun={opened}>
                  <DownArrow />
                </Arrow>
              )}
            </InnerSidebar>
            {sideitem?.path === RouteConstant?.cart && !!badge && (
              <div className="p-1 pt-2">
                <span
                  className={`badge badge-danger bg-danger rounded-circle p-2 ${
                    badge < 10 && "py-1 mt-2"
                  } me-2`}
                >
                  {badge}
                </span>
              </div>
            )}
          </ContentDiv>
        </NavLink>
      )}
    </SideMenuStyled>
  );
};
export const SidebarSubMenu = ({ sub, onfun }) => {
  // const [iconShow, setIconShow] = React.useState(false);
  const location = useLocation();
  return (
    <SideSubMenuStyled>
      <NavLink to={sub.path} className={"text-deco"}>
        <SubContentDiv
          className={
            location.pathname === sub.path
              ? "df g10 subSidebar Subactive"
              : "subSidebar df g10"
          }
        >
          <div className="df" onClick={onfun && onfun}>
            {sub.title}
          </div>
        </SubContentDiv>
      </NavLink>
    </SideSubMenuStyled>
  );
};
