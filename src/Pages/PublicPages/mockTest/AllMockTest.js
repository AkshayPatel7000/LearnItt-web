import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MockFilterIcon, NotFoundIcon } from "../../../assets/icon/inputIcon";
import CustomButton from "../../../customComponents/button/customButton";
import CustomDropdown from "../../../customComponents/customDropdown/customDropdown";
import { HeadTitle } from "../../../customComponents/headTitle/headTitle";
import Pagination from "../../../customComponents/pagination/Pagination";
import AuthStore from "../../../mobx/auth";
import StudentStore from "../../../mobx/student";
import MockTestData from "../../../services/MockTestService";
import { ThemeColors } from "../../../theme/theme";
import { RouteConstant } from "../../../utils/routes/constant";
import MockTestCard from "./components/mockTestCard";
import EbookData from "../../../services/ebookSevice";
import Loader from "../../../customComponents/loader/loader";
import { toJS } from "mobx";

const AllMockTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mockType = location?.state?.type || 1;
  const [mockTestLength, setmockTestLength] = useState("");
  const [toggle, setToggle] = useState(false);
  const [pageNoSize, setPageNoSize] = useState({ no: 1, size: 10 });
  const [filter, showFilter] = useState(false);
  const [mockTest, setAllMockTest] = useState([]);
  const [mockLang, setmockLang] = useState([]);
  const [mockStatus, setmockStatus] = useState([]);
  const [mockPrice, setmockPrice] = useState([]);
  const [reset, setReset] = useState(false);
  const [loading, setloading] = useState(true);
  /* eslint-disable */
  useEffect(() => {
    //console.log("object");
    getAllMockTestByFilter();
    getAllPrice();
    getAllLang();
    getAllStatus();
    setToggle(true);
  }, [mockType]);

  const getAllMockTestByFilter = async (no = 1, size = 10) => {
    //console.log("ffff=>>>>",toJS(StudentStore.filterData))
    let payload = {
      pageNumber: no,
      pageSize: size,
      instituteId: AuthStore?.user?.user?.instituteId,
      languageFilter: StudentStore.filterData?.languageFilter,
      statusFilter: StudentStore.filterData?.statusFilter,
      pricingFilter: StudentStore.filterData?.pricingFilter,
      minValue: 0,
      maxValue: 0,
    };

    const res = await MockTestData?.mockTestByFilter(payload);
    if (res?.isSuccess) {
      const resp = await EbookData.getAllCartItems();
      let modifiedMockTestList = res?.data?.studentMockTests.map(
        (item, index) => {
          return {
            ...item,
            isAddedToCart: resp?.showMyCart?.find(
              (cartItem) => cartItem?.productId === item?.mockTestId
            )
              ? true
              : false,
          };
        }
      );
      setAllMockTest(modifiedMockTestList);
      setmockTestLength(res?.data?.totalRecords);
      setloading(!loading);
      setReset(true);
      return res?.data?.studentMockTests;
    } else {
      setAllMockTest([]);
      setmockTestLength(res?.data?.totalRecords);
    }
  };

  const getAllLang = async () => {
    const resLang = await MockTestData?.mocktestLang();
    let resLangData = resLang?.map((elm) => {
      return {
        value: elm?.value,
        text: elm?.name,
      };
    });
    setmockLang(resLangData);
  };

  const getAllStatus = async () => {
    const resStatus = await MockTestData?.mocktestStatus();
    let resStatusData = resStatus?.map((elm) => {
      if (elm?.name === "InProgress") {
        return {
          value: elm?.value,
          text: "In-Progress",
        };
      }
      if (elm?.name === "NotVisted") {
        return {
          value: elm?.value,
          text: "Not Visited",
        };
      } else {
        return {
          value: elm?.value,
          text: elm?.name,
        };
      }
    });
    //console.log("resStatusData", resStatusData);
    // if (mockType === 2) {
    //   resStatusData = resStatusData.filter((item) => item?.text !== "Expired")
    // }
    setmockStatus(resStatusData);
  };

  const getAllPrice = async () => {
    const resPrice = await MockTestData?.mocktestPrice();
    let resPriceData = resPrice?.map((elm) => {
      return {
        value: elm?.value,
        text: elm?.name,
      };
    });
    setmockPrice(resPriceData);
  };

  const setFilter = async () => {
    await getAllMockTestByFilter(pageNoSize?.no, pageNoSize?.size);
  };

  const resetFilter = () => {
    StudentStore?.setfilterData({
      languageFilter: 0,
      statusFilter: 0,
      pricingFilter: 0,
    });
    window.location.reload();

    getAllMockTestByFilter();
    setReset(!reset);
  };

  const mockTestGetFun = (no, size) => {
    getAllMockTestByFilter(no, size);
  };

  const updateMockTestList = async () => {
    const resp = await EbookData.getAllCartItems();
    let modifiedMockTestList = mockTest.map((item, index) => {
      return {
        ...item,
        isAddedToCart: resp?.showMyCart?.find(
          (cartItem) => cartItem?.productId === item?.mockTestId
        )
          ? true
          : false,
      };
    });
    setAllMockTest(modifiedMockTestList);
  };
  //console.log("mocKType=>>>>>>",mockType)
  if (!toggle) return <></>;
  return (
    <>
      <HeadTitle
        text="Mock Test"
        component2={
          <CustomButton
            title="Create Mock test"
            width="165px"
            height="48px"
            background={ThemeColors?.lightBlue}
            func={() => {
              navigate(RouteConstant.customMockTest);
            }}
          />
        }
      />
      <div className="d-flex justify-content-between flex-wrap gap-1">
        <div className="d-flex gap-2 flex-wrap">
          <CustomButton
            title="Existing Mock Test"
            width="175px"
            height="39px"
            background={
              mockType === 1 ? ThemeColors?.lightBlue : ThemeColors?.inputbg
            }
            style={{ border: `1px solid ${ThemeColors?.lightBlue}` }}
            color={mockType === 1 ? ThemeColors?.white : ThemeColors?.lightBlue}
            func={() => {
              navigate(RouteConstant.viewmockTest, { state: { type: 1 } });
            }}
          />
          <CustomButton
            title="Custom Mock Test"
            width="165px"
            height="39px"
            background={
              mockType === 2 ? ThemeColors?.lightBlue : ThemeColors?.inputbg
            }
            style={{ border: `1px solid ${ThemeColors?.lightBlue}` }}
            color={mockType === 2 ? ThemeColors?.white : ThemeColors?.lightBlue}
            func={() => {
              // resetFilter();
              navigate(RouteConstant.customMock, { state: { type: 2 } });
            }}
          />
        </div>
        <div className="d-flex gap-2 flex-wrap">
          {filter && (
            <>
              <CustomDropdown
                reset={reset}
                menu={mockLang}
                placeholder="Language"
                check={setFilter}
              />
              <CustomDropdown
                reset={reset}
                menu={mockStatus}
                placeholder="Status"
                check={setFilter}
              />
              {mockType === 1 && (
                <CustomDropdown
                  reset={reset}
                  menu={mockPrice}
                  placeholder="Pricing"
                  check={setFilter}
                />
              )}
              <CustomButton
                title="Reset"
                width="60px"
                height="40px"
                background={ThemeColors?.skyBlue}
                color={ThemeColors?.black}
                func={() => {
                  resetFilter();
                }}
              />
            </>
          )}
          <span className="pointer" onClick={() => showFilter(!filter)}>
            <MockFilterIcon />
          </span>
        </div>
      </div>

      {mockTest.length > 0 && (
        <>
          <div className="row py-2">
            {mockTest?.map((elm, i) => {
              return (
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 py-2">
                  <MockTestCard
                    mockTest={elm}
                    updateMockTestList={updateMockTestList}
                  />
                </div>
              );
            })}
          </div>
          <Pagination
            totalLength={mockTestLength}
            pageNoSize={pageNoSize}
            length={mockTest?.length}
            setPageNoSize={setPageNoSize}
            getFunction={mockTestGetFun}
          />
        </>
      )}
    </>
  );
};
export default observer(AllMockTest);
