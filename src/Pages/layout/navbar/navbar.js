import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthStore from "../../../mobx/auth";
import "./navbar.css";
/* eslint-disable */
const Nav = ({ setSidebarActive }) => {
  const auth = toJS(AuthStore?.user?.user);
  const navigate = useNavigate();

 
  return (
    <>
      <div
        style={{ paddingInline: "1.2rem" }}
        className="d-flex w-70 m-0 justify-content-between bg-white"
      >
        {/* <div className="col-lg-8 col-md-8 col-sm-6 flex-wrap"></div> */}
        <div className="w-100 d-flex align-items-center">
          <i
            className="bi bi-list toggle-sidebar-btn m-0  menu-toggle"
            onClick={(e) => {
              setSidebarActive(true);
            }}
          ></i>
          {/* style={{ width: "30%" }} */}
          <div className="my-3 ms-3 d-flex col-xl-4 col-lg-4 col-md-5 col-sm-6 ">
            <div className="search-bar">
              <input
                style={{
                  border: "none",
                  backgroundColor: "#f6f6f6",
                  fontSize: "14px",
                  paddingBlock: "10px",
                  width: "90%",
                }}
                className=" search ms-2"
                placeholder="Search anything"
              />
             
            </div>
          </div>
        </div>
        <div className=" d-flex justify-content-end align-items-center">
          <div className="position-relative">
            
            <span className="position-absolute noti-red-badge  translate-middle p-1 bg-danger border border-light rounded-circle"></span>
          </div>
          <div className="dropdown ">
            <div
              className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none  show"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              <img
                src=""
                alt="pic"
                width="35"
                height="35"
                className="rounded-circle"
              />
              <div
                style={{ minWidth: "max-content" }}
                className="d-flex flex-column ms-2 justify-content-start text-start"
              >
                <span
                  style={{ width: "50px", paddingInline: "2px " }}
                  className="badge text-bg-primary  fs-7"
                >
                  {auth?.role}
                </span>
                <div style={{ gap: "10px" }} className="d-flex w-100">
                  <span>{auth?.name}</span>
             
                  <div>
                
                  </div>
                </div>
              </div>
            </div>
            <ul
              className="dropdown-menu text-small shadow "
              data-popper-placement="top-start"
            >
              <li onClick={() => navigate('/settings')}>
                <div className="dropdown-item" >
                  Profile
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sign out
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Nav);
