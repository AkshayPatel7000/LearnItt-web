import {
  Home,
  MyCart,
  PerformanceIcon,
  StudyMaterial
} from "../assets/svg/index";
import EbookStore from "../mobx/ebook";
import { RouteConstant } from "../utils/routes/constant";

export const Title = {
  Home: "Home",
  StudyMaterial: "Study Material",
  Purchase: "Purchase",
  MyCart: "My Cart",
  Downloads: "Downloads",
  Wallet: "Wallet",
  Guide: "Guide",
  AboutUs: "About Us",
  Other: "Other",
  MockTest: "MockTest",
  eBook: "eBook",
  Video: "Video",
  PreviewsYearPaper: "Previous Year paper",
  Performance: "Performance",
  ResultPerformance: "Result",
  // ResultAnalysis: "Result Analysis",
};
export const SidebarData = [
  {
    key: 1,
    title: Title.Home,
    iconHover: <Home />,
    icon: <Home />,
    path: RouteConstant.dashboard,
  },
  {
    key: 2,
    title: Title.StudyMaterial,
    iconHover: <StudyMaterial />,
    icon: <StudyMaterial />,
    path: RouteConstant.studyMaterial,
    submenus: [
      {
        title: Title.MockTest,
        path: RouteConstant.viewmockTest,
      },

      {
        title: Title.eBook,
        path: RouteConstant.ebookPage,
      },
      {
        title: Title.Video,
        path: RouteConstant.Video,
      },
      {
        title: Title.PreviewsYearPaper,
        path: RouteConstant.PypPage,
      },
    ],
  },
  // {
  //   key: 3,
  //   title: Title.Purchase,
  //   iconHover: <Purchase />,
  //   icon: <Purchase />,
  //   path: RouteConstant.purchase,
  // },
  {
    key: 4,
    title: Title.MyCart,
    iconHover: <MyCart />,
    icon: <MyCart />,
    path: RouteConstant.cart,
    badge:EbookStore?.cartDetails?.showMyCart?.length
  },
  // {
  //   key: 6,
  //   title: Title.Wallet,
  //   iconHover: <Wallet />,
  //   icon: <Wallet />,
  //   path: RouteConstant.Wallet,
  // },
  // {
  //   key: 7,
  //   title: Title.Guide,
  //   iconHover: <Guide />,
  //   icon: <Guide />,
  //   path: RouteConstant.guide,
  // },
  // {
  //   key: 8,
  //   title: Title.AboutUs,
  //   iconHover: <AboutUs />,
  //   icon: <AboutUs />,
  //   path: RouteConstant.aboutUs,
  // },
  // {
  //   key: 9,
  //   title: Title.Other,
  //   iconHover: <Other />,
  //   icon: <Other />,
  //   path: RouteConstant.other,
  // },
  // {
  //   key: 10,
  //   title: Title.PrivacyPolicy,
  //   iconHover: <Privacy />,
  //   icon: <Privacy />,
  //   path: RouteConstant.privacyPolicy,
  // },
  {
    key: 10,
    title: Title.Performance,
    iconHover: <PerformanceIcon />,
    icon: <PerformanceIcon/>,
    path: RouteConstant.Performance,
    submenus: [
      {
        title: Title.ResultPerformance,
        path: RouteConstant.ResultPerformance,
      },

      // {
      //   title: Title.ResultAnalysis,
      //   path: RouteConstant.ResultAnalysis,
      // },
    ]
  },
];
