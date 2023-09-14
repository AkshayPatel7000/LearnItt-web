import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Siderbar } from "../../Sidebar/siderbar";
import EbookStore from "../../mobx/ebook";
import Footer from "../../navigations/Footer";
import Header from "../../navigations/header";
import EbookData from "../../services/ebookSevice";
import { RouteConstant } from "../../utils/routes/constant";
import Mycartpage from "../myCard/mycartpage";
import Profile from "../porfile/userProfile";
import Wallet from "../wallets/Wallet";
import "./Private.css";
import ResultAnalysis from "./ResultAnalysis";
import ResultPerformance from "./ResultPerformance";
import Dashboard from "./dashboard/Dashboard";
import DescriptionEbook from "./ebook/Description/description";
import EbookPage from "./ebook/ebookPage";
import EbookViewer from "./ebook/ebookViewer";
import AllMockTest from "./mockTest/AllMockTest";
import GeneralInstruction from "./mockTest/GeneralInstruction";
import QuestionPage from "./mockTest/QuestionPage";
import CustomMock from "./mockTest/customMock";
import CustomMockTest from "./mockTest/customMockTest/CustomMockTest";
import MockSolution from "./mockTest/solution.js/mockSolutio";
import MyPurchase from "./myPurchase/MyPurchase";
import PypPage from "./pyp/pypPage";
import ViewPYP from "./pyp/viewPYP";
import Analyses from "./result/analyse";
import MockTestResult from "./result/mockTestResult";
import AboutUs from "./staticContent/AboutUs";
import PrivacyPolicy from "./staticContent/PrivacyPolicy";
import TermsAndCondition from "./staticContent/termsAndCondition";
import PremiumVideo from "./videos/PremiumVideo";
import Video from "./videos/Video";

const PrivateLayout = () => {
  const [toggle, setToggle] = useState(false) 
  let length=EbookStore?.cartDetails?.showMyCart?.length
 useEffect(()=>{
  EbookData?.getAllCartItems()
  setToggle(true)
 },[])

 if(!toggle) return <></>
  return (
    <>
      <div className={(window.location.pathname !== RouteConstant.questionPage && window.location.pathname !== RouteConstant.mockTestResult)? "wrapper" :"wrapper2"} >
        {(window.location.pathname !== RouteConstant.questionPage && window.location.pathname !== RouteConstant.mockTestResult) && <Siderbar length={length} />}     
        <div style={{ flex: 1 }}>
          <Header />
          <>
            <div className="p-4 Inline-wrapper" style={{display:"flex",flexDirection:"column",}}>
              <Routes>
            
                <Route index element={<Navigate to={"dashboard"} />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="viewmockTest" element={<AllMockTest />} />
                <Route path="customMock" element={<CustomMock/>} />
                <Route path="custom-mocktest" element={<CustomMockTest />} />
                <Route path="general-instruction" element={<GeneralInstruction />} />
                <Route path="/questionPage" element={<QuestionPage />} />
                <Route path="/mockTestResult" element={<MockTestResult />} />
                <Route path="/Analyses" element={<Analyses />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/ebookPage" element={<EbookPage />} />
                <Route path="/DescriptionEbook" element={<DescriptionEbook />} />
                <Route path="/cart" element={< Mycartpage />} />
                <Route path="/PypPage" element={< PypPage />} />
                <Route path="/viewPYP" element={<ViewPYP />} />
                <Route path="/Wallet" element={< Wallet />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/termsCondition" element={<TermsAndCondition />} />
                <Route path="/video" element={<Video />} />
                <Route path="/mockSolution" element={<MockSolution />} />
                <Route path="/ResultAnalysis" element={<ResultAnalysis />} />
                <Route path="/ResultPerformance" element={<ResultPerformance />} />
                <Route path="/EbookViewer" element={<EbookViewer />} />
                <Route path="/PremiumVideo" element={<PremiumVideo />} />
                <Route path="/myPurchase" element={<MyPurchase />} />
                <Route path="/aboutUs" element={<AboutUs/>} />  
                <Route path="*" element={<Navigate to="/dashboard" />} />

              </Routes>
            </div>
            <Footer />
          </>
        </div>
      </div>
    </>
  );
};

export default observer(PrivateLayout);
