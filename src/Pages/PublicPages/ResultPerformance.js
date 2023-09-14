import React, { useEffect, useState } from "react";
import {
    ClockIcon,
  LanguageIcon,
  PremiumIcon,
  RupeeIcon,
} from "../../assets/icon/inputIcon";
import {
  CardHeading,
  CategoryHeading,
  PriceHeading,
  PriceText,
} from "../../customComponents/Header/cardheader";
import Result from "../../services/ResultService";
import { ThemeColors } from "../../theme/theme";
import CustomButton from "../../customComponents/button/customButton";
import { HHMMSSToHM } from "../../utils/hooks/hhmmssTohm";
import { useNavigate } from "react-router-dom";
import { RouteConstant } from "../../utils/routes/constant";
import { HeadTitle } from "../../customComponents/headTitle/headTitle";
export default function ResultAnalysis() {
  const [isCustome,] = useState(false);
  const [mockTest, setMocktest] = useState([]);


  useEffect(() => {
    getCompletedExisting();
  }, []);
  const navigate=useNavigate()

  const getCompletedExisting = async () => {
    let res = await Result.getCompletedExisting();
    setMocktest(res?.mockTestDetails);
  };

  return (
    <div className="row py-2">
   <HeadTitle text="Mock test"/>


  {mockTest.length > 0 &&
    mockTest.map((elm) => {
    return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 py-2">
    <div className={elm?.price > 0 ? "card p-4 preborder" : "card p-4 border-0 rounded-4"} style={{ minHeight: "220px" }}>
   <div className="d-flex col justify-content-between">
         <CustomButton
          title={"Completed"}
          width="fit-content"
          height="30px"
          background={ThemeColors?.completed}
          style={{
            fontSize: "12px",
            lineHeight: "14px",
            padding: "6px 8px",
            flexDirection: "column",
          }}
        />
        <div>{elm?.price > 0 && <PremiumIcon />}</div>
      </div>
      <div className="mt-2">
        <CardHeading text={elm?.mockTestName} fontFamily="Bold" />
      </div>
      {isCustome && <CategoryHeading text={"subjectName"} />}

      <div className="d-flex gap-2 mt-2 mb-1  justify-content-between">
        {!isCustome && (
          <div className="d-flex gap-1">
            <PriceHeading text="Price : " />
            {elm?.price === 0 ?
              <PriceText text={"Free"} /> :
              <div className="d-flex align-items-center">
                <RupeeIcon />
                <PriceText text={`${elm?.price}`} />
              </div>
            }
          </div>
        )}

      </div>
      <hr />
      <div className="d-flex flex-wrap col justify-content-between align-items-center gap-1 mt-2">
        <div className="d-flex gap-2 align-items-center">
          <div className="d-flex align-items-center gap-1">
            <LanguageIcon/>
            <CategoryHeading text={elm?.language} />
          </div>
          <div className="d-flex align-items-center gap-1">
            <ClockIcon />
            <CategoryHeading
              text={HHMMSSToHM(elm?.duration)}
            />
          </div>
        </div>
        <CustomButton
                  title="Analyse"
                  width="73px"
                  height="35px"
                  background={ThemeColors?.lightBlue}
                  func={() => {
                    navigate(RouteConstant?.Analyses, { state: { isCustome: isCustome, mockTestId: elm?.mockTestId } });
                  }}
                />
      </div>
    </div>
     </div>
          );
        })}
    </div>

  );
}
