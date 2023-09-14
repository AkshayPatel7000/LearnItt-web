import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { HeadTitle } from "../../../customComponents/headTitle/headTitle";
import AuthStore from "../../../mobx/auth";
import MockTestData from "../../../services/MockTestService";
import EbookData from "../../../services/ebookSevice";
import "./ebook.css";
import EbookCard from "./ebookCard";
import EbookFillter from "./ebookFillter";

import { EbookNotFound } from "../../../assets/icon/inputIcon";
import NotFoundTemplate from "../../../customComponents/notFoundTemplate/NotFoundTemplate";
import Pagination from "../../../customComponents/pagination/Pagination";
import PypPupSort from "../pyp/pypShortBy";

export const dropDown = [
  { title: "Latest Added", id: 0 },
  { title: "Price - high to low", id: 1 },
  { title: "Price - low to high", id: 2 },
];
const myStyle = {
  backgroundColor: "white",
  display: "flex",
  height: "46px",
  border: "1px solid #4FA4F4 !important",
};
const cardStyle = {
  display: "flex",
  width: "100%",
  height: "90%",
  justifyContent: "center",
};

const EbookPage = () => {
  const [pageNoSize, setPageNoSize] = useState({ no: 1, size: 10 });
  const [currentTab, setCurrentTab] = useState();
  const [subjectsList, setSubjectsList] = useState();
  const [toggle, setToggle] = useState(false);
  const [ebookLength, setEbookLengt] = useState("");
  const [ebook, setEbook] = useState([]);
  const [apply, setApply] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [ebookPriceList, setEbookPriceList] = useState([]);
  const [priceId, setPriceId] = useState(0);
  const [show, setShow] = useState(false);
  const [priceSortId, setPriceSortId] = useState(0);

  /*eslint-disable*/
  useEffect(() => {
    subjectList();
    getAllPrice();
  }, []);

  useEffect(() => {
    if (currentTab) {
      getEbookByFilter();
    }
  }, [apply, priceSortId, currentTab]);

  const subjectList = async () => {
    let post = {
      instituteId: AuthStore?.user?.user?.instituteId,
      subcourseId: AuthStore?.user?.user?.subcourseId,
    };
    const res = await EbookData.getAllSubject(post);
    if (res?.isSuccess) {
      setSubjectsList(res?.data?.ebookSubjects);
      var Id = res?.data?.ebookSubjects[0].subjectId;
      getEbookByFilter();
      setCurrentTab(Id);
    }
  };

  const getAllPrice = async () => {
    const resPrice = await MockTestData?.mocktestPrice();
    let resPriceData = resPrice?.map((elm) => {
      return {
        value: elm?.value,
        text: elm?.name,
      };
    });
    setEbookPriceList(resPriceData);
  };

  const getEbookByFilter = async (no = 1, size = 10) => {
    if (!currentTab) {
      return;
    }

    let payload = {
      pageNumber: no,
      pageSize: size,
      instituteId: AuthStore?.user?.user?.instituteId,
      subcourseId: AuthStore?.user?.user?.subcourseId,
      subjectId: currentTab,
      priceWiseSort: priceSortId ? priceSortId : 0,
      languageFilter: currentLanguage ? currentLanguage : 0,
      priceFilter: priceId ? priceId : 0,
    };
    const resp = await EbookData.getAllCartItems();
    const res = await EbookData?.getEbookList(payload);
    if (res?.isSuccess && resp) {
      setEbookLengt(res?.data?.totalRecord);
      let modifiedEbookList = res?.data?.studentEbookList.map((item, index) => {
        return {
          ...item,
          isAddedToCart: resp?.showMyCart?.find(
            (cartItem) => cartItem?.productId === item?.ebookId
          )
            ? true
            : false,
        };
      });
      setEbook(modifiedEbookList);
      return res?.data?.studentEbookList;
    } else {
      setEbook([]);
      // setEbookLengt(res?.data?.totalRecord)
    }
  };

  const updateEbookList = async () => {
    const resp = await EbookData.getAllCartItems();
    let modifiedEbookList = ebook.map((item, index) => {
      return {
        ...item,
        isAddedToCart: resp?.showMyCart?.find(
          (cartItem) => cartItem?.productId === item?.ebookId
        )
          ? true
          : false,
      };
    });
    setEbook(modifiedEbookList);
  };
  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };

  const handleSort = (data) => {
    setPriceSortId(data?.id);
    setShow(!show);
  };

  return (
    <>
      <div>
        <div className="pb-2">
          <HeadTitle text="eBook" />
        </div>
        <div className=" display-f tabField justify-content-between ">
          <div className="ebooktab">
            {/* <div className={`${subjectsList?.ebookSubjects[0] ? "active" : ""}`}> */}
            {subjectsList?.map((tab, i) => (
              <button
                key={i}
                id={tab.subjectId}
                disabled={currentTab === `${tab.subjectId}`}
                onClick={handleTabClick}
                className={
                  currentTab === tab.subjectId ? "tab-h selected" : "tab-h"
                }
              >
                {tab.subjectName}
              </button>
            ))}
          </div>
          <div style={{ marginInline: "auto 10px" }} className="gap-2">
            <div style={{ marginInline: "auto 10px" }} className="">
              <div
                className="d-flex gap-2 fill-drop"
                style={{ float: "right" }}
              >
                <div>
                  <PypPupSort
                    menu={dropDown}
                    preText="Sort By :"
                    menuStyle={myStyle}
                    func={handleSort}
                  />
                  {/* <VideoMultiLevelDropDown
                    menu={dropDown}
                    preText="Sort By"
                    menuStyle={myStyle}
                    onClick={() => setShow(!show)}
                  />
                  {show && (
                    <EbookSort
                      show={show}
                      setPriceSortId={setPriceSortId}
                      setShow={setShow}
                    />
                  )} */}
                </div>
                <div className=" gap-2 sort">
                  {/* <VideoFilter
                    setApply={setApply}
                    apply={apply}
                    priceId={priceId}
                    ebookPriceList={ebookPriceList}
                    setPriceId={setPriceId}
                    currentTab={currentTab}
                    setCurrentLanguage={setCurrentLanguage}
                    currentLanguage={currentLanguage}
                  /> */}
                  <EbookFillter
                    setApply={setApply}
                    apply={apply}
                    subjectsList={subjectsList}
                    setCurrentLanguage={setCurrentLanguage}
                    currentLanguage={currentLanguage}
                    currentTab={currentTab}
                    ebookPriceList={ebookPriceList}
                    priceId={priceId}
                    setPriceId={setPriceId}
                  />
                </div>
              </div>
            </div>

            {/*                 
                        <div style={{ marginInline: "auto 10px" }} className="mt20  gap-2 ">
                            
                            <div className="d-flex gap-2 fill-drop ">
                                <div>
                                    <EbookMultiLevelDropDown
                                        menu={dropDown}
                                        preText="Sort By"
                                        menuStyle={myStyle}
                                        onClick={() => setShow(!show)}
                                    />
                                    {show && <EbookSort show={show} setPriceSortId={setPriceSortId} setShow={setShow} />}
                                </div>
                                <div className=" gap-2 sort">
                                    <EbookFillter
                                        setApply={setApply}
                                        apply={apply}
                                        subjectsList={subjectsList}
                                        setCurrentLanguage={setCurrentLanguage}
                                        currentLanguage={currentLanguage}
                                        currentTab={currentTab}
                                        ebookPriceList={ebookPriceList}
                                        priceId={priceId}
                                        setPriceId={setPriceId}
                                    />
                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
      </div>
      {ebook.length > 0 ? (
        <>
          <div className="row py-2 gx-3">
            {ebook?.map((item, i) => {
              return (
                <div
                  key={i}
                  className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 py-2"
                >
                  <EbookCard
                    ebook={item}
                    subjectList={updateEbookList}
                    setToggle={setToggle}
                    toggle={toggle}
                  />
                </div>
              );
            })}
          </div>
          <Pagination
            totalLength={ebookLength}
            pageNoSize={pageNoSize}
            length={ebook?.length}
            setPageNoSize={setPageNoSize}
            getFunction={getEbookByFilter}
          />
        </>
      ) : (
        <>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "70vh" }}
          >
            {/* <NotFoundIcon /> */}
            <NotFoundTemplate
              icon={<EbookNotFound />}
              line1={"No eBook available"}
              line2={
                "We're sorry, but it looks like there are no eBooks available at this time."
              }
              cardStyle={cardStyle}
              title="Go Home"
            />
          </div>
        </>
      )}
    </>
  );
};
export default observer(EbookPage);
