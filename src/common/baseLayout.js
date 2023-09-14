import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Header from '../navigations/header';
import LoginPage from '../Pages/auth/login';
import ForgotPasswordPage from '../Pages/auth/password/forgot';
import SignUpPage from '../Pages/auth/signup';
import "./baseLayout.css";
export function BaseLayout() {
  return (
    <div className='height1 outerDivLogin'>
      <Outlet />
    </div>
  )
}
const Layout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<Navigate to={"login"} />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='sign-up' element={<SignUpPage />} />
          <Route path='forgot-password' element={<ForgotPasswordPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}
export default Layout