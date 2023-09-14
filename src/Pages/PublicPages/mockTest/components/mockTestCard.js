import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CartIcon,
  ClockIcon,
  LanguageIcon,
  PremiumIcon,
  RupeeIcon
} from "../../../../assets/icon/inputIcon";
import {
  CardHeading,
  CategoryHeading,
  PriceHeading,
  PriceText
} from "../../../../customComponents/Header/cardheader";
import CustomButton from "../../../../customComponents/button/customButton";
import CountDownClock from "../../../../customComponents/coundownClock/CountDownClock";
import EbookData from "../../../../services/ebookSevice";
import { ThemeColors } from "../../../../theme/theme";
import { HHMMSSToHM } from "../../../../utils/hooks/hhmmssTohm";
import { commonPayload } from "../../../../utils/payloadHanlder";
import { RouteConstant } from "../../../../utils/routes/constant";
import moment from 'moment/moment';

export default function MockTestCard({ mockTest, updateMockTestList }) {
  const { status, mocktestName, price, isDay, startsInDays, testStartTime, language, mockTestDuration, isRetake, mockTestId, testAvailaiblityType, isCustome = false, remainingAttempts, subjectName, isAddedToCart, isPurchased ,description} = mockTest
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState("00:00:00")
  const liveClock = () => {
    if (isDay) {
      const date = new Date().toISOString();
      const date1 = new Date(date);
      const date2 = new Date(startsInDays);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return <PriceText text={diffDays + " days"} />;
    } else {
      // console.log(<CountDownClock time={testStartTime} setState={setRemainingTime}/>)
      return <CountDownClock time={testStartTime} setState={setRemainingTime} />
    }
  }
  const checkTest = () => {
    if ((testAvailaiblityType === 'Always') || !isDay) {
      return false;
    }
    else {
      return true;
    }
  }
  const testStart = async () => {
    navigate(RouteConstant?.generalInstruction, { state: { id: mockTestId, isCustome: isCustome } });

  }
  const handleCart = async (data, e) => {
    e?.preventDefault()
    const res = data?.isAddedToCart ? navigate(RouteConstant.cart) : data?.isPurchased ? testStart() : await EbookData?.addToCart(commonPayload.call(data, 1))
    if (res) {
      updateMockTestList()
    }
  }

  return (
    <div className={(price > 0 && !isPurchased) ? "card p-4 preborder" : "card p-4 border-0 rounded-4"} style={{ minHeight: "220px" }}>
     <div className="col purchaseDate mb-2">
     { moment.utc(mockTest?.purchaseDate).local().format('MMM DD ,YYYY')}
      </div>
      <div className="d-flex col justify-content-between">
     
        <CustomButton
          title={status}
          width="fit-content"
          height="30px"
          background={
            (status === "Not Visited" && ThemeColors?.visited) ||
            (status === "Expired" && ThemeColors?.expired) ||
            (status === "Completed" && ThemeColors?.completed) ||
            (status === "InProgress" && ThemeColors?.inProgress)
          }
          style={{
            fontSize: "12px",
            lineHeight: "14px",
            padding: "6px 8px",
            flexDirection: "column",
          }}
        />
        <div>{(price > 0 && !isPurchased) && <PremiumIcon />}</div>
      </div>
      <div className="mt-2">
        <CardHeading text={mocktestName} fontFamily="Bold" />
      </div>
      {isCustome && <CategoryHeading text={subjectName} />}

      <div className="d-flex gap-2 mt-2 mb-1  justify-content-between flex-wrap">
        {!isCustome && (
          <div className="d-flex gap-1 ">
            <PriceHeading text="Price : " />
            {price === 0 ?
              <PriceText text={"Free"} /> :
              <div className="d-flex align-items-center">
                <RupeeIcon />
                <PriceText text={`${price}`} />
              </div>
              // <PriceText text={price === 0 ? "Free" : `₹ ${price}`} />
            }
          </div>
        )}
        {(status !== "Expired") && (remainingAttempts !== 0) && (
          <div className="d-flex gap-1">
            <PriceHeading text="Starts In : " />
            {!testStartTime ? <PriceText text={"00:00:00"} /> : <PriceText text={liveClock()} />}
          </div>)}
      </div>
      <div className="d-flex description" >
         <p>{description?.length > 150  ? description.slice(0,150)+'...' : description}</p>
      </div>
      <hr />
      <div className="d-flex flex-wrap col justify-content-between align-items-center gap-1 mt-2">
        <div className="d-flex gap-2 align-items-center">
          <div className="d-flex align-items-center gap-1">
            <LanguageIcon />
            <CategoryHeading text={language} />
          </div>
          <div className="d-flex align-items-center gap-1">
            <ClockIcon />
            <CategoryHeading
              text={HHMMSSToHM(mockTestDuration)}
            />
          </div>
        </div>

        <div className="d-flex gap-2 ">
          {/* Ispurchase condition btn */}
          {(price > 0 && !isPurchased) ? (
            <>
              <CustomButton
                title={isAddedToCart ? "View Cart" : "Add To Cart"}
                width="120px"
                height="35px"
                color={isAddedToCart ? ThemeColors?.inProgress : ThemeColors.white}
                background={isAddedToCart ? ThemeColors?.white : ThemeColors?.inProgress}
                style={{ fontSize: '12px', border: `1px solid ${ThemeColors?.inProgress}` }}
                icon={!isAddedToCart && <CartIcon />}
                func={(e) => handleCart(mockTest, e)}
              />
            </>
          ) : (
            <>
              {
                (status === "Not Visited") &&
                <CustomButton
                  title="Start"
                  width="73px"
                  height="35px"
                  background={ThemeColors?.lightBlue}
                  func={() => {
                    testStart()
                  }}
                  disable={checkTest() || !(remainingTime === "00:00:00")}
                />
              }

              {(((isRetake || isCustome) && status === "InProgress"))
                && (
                  <CustomButton
                    title={`${remainingAttempts} Retake`}
                    width="90px"
                    height="35px"
                    background={ThemeColors?.inputbg}
                    color={ThemeColors?.lightBlue}
                    style={{ border: "1px solid #4FA4F4" }}
                    disable={remainingAttempts === 0}
                    func={() => {
                      navigate(RouteConstant?.generalInstruction, { state: { id: mockTestId, isCustome: isCustome } });
                    }}
                  />
                )}

              {status === "Completed" &&
                <CustomButton
                  disable={checkTest() || !(remainingTime === "00:00:00")}
                  title="Analyse"
                  width="73px"
                  height="35px"
                  background={ThemeColors?.lightBlue}
                  func={() => {
                    navigate(RouteConstant?.Analyses, { state: { isCustome: isCustome, mockTestId: mockTestId }});
                  }}
                />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
