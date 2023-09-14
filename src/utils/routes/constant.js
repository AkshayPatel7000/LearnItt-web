import { ThemeColors } from "../../theme/theme";

export const RouteConstant = {
  login: "/auth/login",
  signup: "/auth/sign-up",
  Success: "mobilePayment/Success",
  Failure: "mobilePayment/Failure",
  logout: "/logout",
  forgetPassword: "/forget-password",
  notFound: "/notFound",
  unAuthorized: "/unauthorized",
  verification: "/verification",
  uploadphoto: "/upload-photo",
  institute: "/institute",
  newpassword: "/newpassword",
  course: "/course",
  dashboard: "/dashboard",
  viewmockTest: "/viewmockTest",
  home: "/dashboard",
  studyMaterial: "/studyMaterial",
  purchase: "/purchase",
  myCart: "/myCart",
  downloads: "/downloads",
  guide: "/guide",
  aboutUs: "/aboutUs",
  other: "/other",
  mockTest: "/mockTest",
  eBook: "/eBook",
  PreviewsYearPaper: "/PreviewsYearPaper",
  questionPage: "/questionPage",
  mockTestResult: "/mockTestResult",
  generalInstruction: "/general-instruction",
  customMockTest: "/custom-mocktest",
  profile: "/profile",
  ebookPage: "/ebookPage",
  DescriptionEbook: "/ DescriptionEbook",
  cart: "/cart",
  PypPage: "/PypPage",
  viewPYP: "/viewPYP",
  Wallet: "/Wallet",
  privacyPolicy: "/privacy-policy",
  termsCondition:"/termsCondition",
  Video: "/video",
  PremiumVideo: "/Premiumvideo",
  Analyses: "/Analyses",
  EbookViewer: "/EbookViewer",
  MockSolution: "/mockSolution",
  ResultAnalysis:"/ResultAnalysis",
  ResultPerformance:"/ResultPerformance",
  myPurchase: "/myPurchase",
  customMock:"/customMock"
 
};

export const ApiPath = {
  //#region AUTH
  login: "api/Student/studentlogin",
  signup: "api/Student/studentsignup",
  getOTP: "api/Student/sendotp",
  editUser: "api/Student/editstudent",
  forgotPasswod: "api/Student/forgotpassword",
  getTokenByNumber: "api/Student/gettokenbynumber",
  getSubCourseById: "api/SubCourse/getsubcoursesbycourseid",
  getUserInstitute: "api/Student/getstudentinstitute",
  //#endregion

  //#region Student
  uploadProfileImg: "api/Student/uploadimage",
  addFeedback: "api/Student/addfeedback",
  getAllInstitute: "api/Institute/getallinstitutecode",
  getAllLevel: "api/QuestionBank/getallquestionlevel",
  getSubjectsBySubcourseId: "api/Subject/getallsubjectsmasterbysubcoursesid",
  getCoursebyInstitute: "api/Course/getcoursesbyinstitute",
  getAllMockTest: "api/StudentDashboard/getmocktestlistbyinstitute",
  //#endregion

  //#region StudentMocktest
  mockTestList: "/api/StudentMocktest/getstudentmocktestlistbyinstitute",
  mockTestByFilter: "api/StudentMocktest/getstudentmocktestbyfilters",
  getStudentById: "api/Student/getstudentprofile",
  mocktestLang: "api/StudentMocktest/getallmocktestlanguage",
  mockTestStatus: "api/StudentMocktest/getallmockteststatus",
  mockTestPrice: "api/StudentMocktest/getallmocktestpricing",
  generateCustomMock: "api/StudentMocktest/generatestudentmocktest",
  getCustomMock: "api/StudentMocktest/getcustomemocktestlist",
  getQuestionPanel: "api/StudentMocktest/getstudentquestionpanel",
  saveMocktestStatus: "api/StudentMocktest/savemockteststatus",
  getGeneralInst: "api/StudentMocktest/getgeneralinstructions",
  getstudentanswers: "api/StudentMocktest/getstudentanswers",
  saveStudentAnswer: "api/StudentMocktest/savestudentanswers",
  getReviewAnswer: "api/StudentMocktest/reviewstudentanswers",
  markAsSeen: "api/StudentMocktest/markasseen",
  resumeMocktest: "api/StudentMocktest/resumemocktest",
  getStudentResult: "api/StudentMocktest/getstudentresult",
  getStudentPreviousResult: "api/StudentMocktest/getstudentallpreviousresult",
  removeAnswer: "api/StudentMocktest/removestudentanswers",
  mockTestSolution: "api/StudentMocktest/getstudentquestionsolution",

  //#endregion 

  //#region Ebook
  getAllSubject: "api/StudentEbook/getsubjectlistbyinstitute",
  getEbooklist: "api/StudentEbook/getebookslistbysubject",
  gettopiclistbysubjectidandsubcourseid: "api/Topic/gettopiclistbysubjectidandsubcourseid",
  getVideoSubjectList: "api/StudentVideo/getsubjectlist",
  getVideoList: "api/StudentVideo/getvideoslistbysubject",
  getEbooklistByid: "api/StudentEbook/getebookbyid",
  getVideoById: "api/StudentVideo/getvideobyid",
  addEbookToCart: "api/MyCart/addtocart",
  getCartItems: "api/MyCart/showmycart",         
  removeCartItem: "api/MyCart/removeitemfrommycart",
  //getVideoList: "api/StudentVideo/getvideoslistbysubject",
  //#endregion

  //#region Wallet
  getPYPListByFilter: "api/StudentPYP/getpyplistbyfilters",
  yearList: "api/PreviousYearPaper/getyearlist",
  rechargewallet:"api/StudentWallet/recharegewallet",
  walletHistory:"api/StudentWallet/getwallethistory",
  getStudentBalance:"api/StudentWallet/getstudentbalance",
  checkout:"api/StudentWallet/checkout",
  getCompletedExisting:"api/StudentResult/getcompletedmocktestlist",
  getOverallResult:"api/StudentResult/getoverallresultanalysis",
  //#endregion

  //#region my purchase
  getModuleList: "api/MyPurchased/getmodulelist",
  getPurchasedMocktest: "api/MyPurchased/getpurchasedmocktest",
  getPurchasedEbooks: "api/MyPurchased/getpurchasedebooks",
  getPurchasedVideos: "api/MyPurchased/getpurchasedvideos",
  getPurchasedPYP: "api/MyPurchased/getpurchasedpreviousyearpaper",
  createOrder:"api/StudentWallet/createorder"
  //#endregion

};

export const QASelected = {
  backgroundColor: ThemeColors?.midBlue,
  border: `1px solid${ThemeColors?.lightBlue}`,
  color: ThemeColors?.lightBlue,
};
export const QAWrong = {
  backgroundColor: ThemeColors?.lightExpired,
  border: `1px solid${ThemeColors?.expired}`,
  color: ThemeColors?.expired,
};
export const QARight = {
  backgroundColor: ThemeColors?.lightCompleted,
  border: `1px solid${ThemeColors?.completed}`,
  color: ThemeColors?.completed,
};

export const AllLevels = [
  { id: 1, Title: "Easy" },
  { id: 2, Title: "Medium" },
  { id: 3, Title: "Hard" },
];
export const AllLanguages = [
  { id: 0, Title: "All" },
  { id: 1, Title: "English" },
  { id: 2, Title: "Hindi" },
  { id: 3, Title: "Gujarati" },
  { id: 4, Title: "Marathi" },
];
export const Languages = [
  { id: 1, Title: "English" },
  { id: 2, Title: "Hindi" },
  { id: 3, Title: "Gujarati" },
  { id: 4, Title: "Marathi" },
];
export const Allprice = [
  { id: 0, Title: "All" },
  { id: 1, Title: "Free" },
  { id: 2, Title: "Premium" },

];
export const sortEnum = [
  {
    title: 'Latest Added',
    id: 0
  },
  {
    title: 'Price - high to low',
    id: 1
  },
  {
    title: 'Price - low to high',
    id: 2
  },
]
