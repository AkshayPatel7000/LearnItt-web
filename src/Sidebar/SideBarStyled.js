import styled from "styled-components";

// import {
//   AutoComplete,
// } from 'antd';
export const SidebarStyled = styled.div`
  height: 100%;
  width: 270px;
  background-color: #133b69;
  min-width: 270px;
  // position:fixed;
  flex-shrink: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
;
.crossIcon{
  display:none;

    justify-content: flex-end;
    padding: 10px 11px;
}
}
@media only screen and (max-width: 760px) {
  
display: ${({ on }) => (on ? "" : "none")};
.crossIcon{
display: ${({ on }) => (on ? "flex" : "none")};
}
`;
export const LogoSide = styled.div`
  margin-top: 30px;
  height: 75px;
`;
export const SideMenuStyled = styled.div``;
export const ContentDiv = styled.div`
  font-size: 14px;
  font-weight: 500;
  border-radius: 12px;
  margin-bottom: 10px;
  transition: 0.3s;

  :hover {
    color: #fff;
    background: #4fa4f4;

    transition: 0.3s;
  }
`;
export const SubContentDiv = styled.div`
  font-size: 14px;
  font-weight: 500;
  border-radius: 12px;
  margin-bottom: 10px;
  transition: 0.3s;
  padding: 10px 0px 10px 40px;

  display: flex;
  justify-content: start;
  align-items: center;
  :hover {
    color: #4fa4f4;
    background-color: none !important;
  }
`;
export const MainSideBar = styled.div`
  padding: 20px;
  margin-block: 15px auto;
`;
export const InnerSidebar = styled.div`
  padding: 11px;
  column-gap: 10px;
`;
export const HeaderMain = styled.div`
  padding: 30px 60px;
  background-color: #fff;
`;

export const AdminStyle = styled.div``;
export const MainDiv = styled.div`
  padding: 30px;
`;
export const SideSubMenuStyled = styled.div`
  display: "flex";
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  border-radius: 12px;
  margin-bottom: 10px;
  transition: 0.3s;
`;
export const Arrow = styled.div`
  ${({ onfun }) =>
    onfun === true &&
    `
transform: rotate(-90deg);
transition: 0.5s;
  `}
  transition: 0.5s;
`;
export const ClockWise = styled.div`
  ${({ onfun }) =>
    onfun === true &&
    `
transform: rotate(90deg);
transition: 0.5s;
  `}
  transition: 0.5s;
`;
