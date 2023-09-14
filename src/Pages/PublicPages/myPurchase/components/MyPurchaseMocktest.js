import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalenderIcon, ClockIcon, LanguageIcon, RupeeIcon } from "../../../../assets/icon/inputIcon";
import { NormalHeading } from "../../../../customComponents/DynamicText/Heading";
import { CardHeading, CategoryHeading, PriceHeading, PriceText } from "../../../../customComponents/Header/cardheader";
import CustomButton from "../../../../customComponents/button/customButton";
import CountDownClock from "../../../../customComponents/coundownClock/CountDownClock";
import { ThemeColors } from "../../../../theme/theme";
import { HHMMSSToHM } from "../../../../utils/hooks/hhmmssTohm";
import { RouteConstant } from "../../../../utils/routes/constant";


export default function MyPurchaseMockTestCard({ mockTest }) {
    const { status, mocktestName, price, isDay, startsInDays, testStartTime, language, mockTestDuration, isRetake, mockTestId, testAvailaiblityType, isCustome = false, remainingAttempts, } = mockTest
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

    return (
        <div className={"card p-4 border-0 rounded-4"} style={{ minHeight: "220px" }}>
            <div className="pb-2" >
                <NormalHeading text={"26 Feb 2022"} color={ThemeColors.secondaryBlack} />
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
            </div>
            <div className="mt-2">
                <CardHeading text={mocktestName} fontFamily="Bold" />
            </div>

            <div className="d-flex gap-2 mt-2 mb-1  justify-content-between">
                <div className="d-flex gap-1">
                    <PriceHeading text="Price : " />
                    <div className="d-flex align-items-center">
                        <RupeeIcon />
                        <PriceText text={`${price}`} />
                    </div>
                </div>
                {(status !== "Expired") && (remainingAttempts !== 0) && (
                    <div className="d-flex gap-1">
                        <PriceHeading text="Starts In : " />
                        {!testStartTime ? <PriceText text={"00:00:00"} /> : <PriceText text={liveClock()} />}
                    </div>)}
            </div>
            <hr />
            <div className="d-flex flex-wrap col justify-content-between align-items-center gap-1 mt-2">
                <div className="d-flex gap-2 align-items-center">
                    <div className="d-flex align-items-center gap-1">
                        <LanguageIcon />
                        <CategoryHeading text={language} />
                    </div>
                    <div className="d-flex align-items-center gap-1">
                        <CalenderIcon />
                        <CategoryHeading text={"7 Days (To Start)"} color={ThemeColors.lightBlue} />
                    </div>
                    <div className="d-flex align-items-center gap-1">
                        <ClockIcon />
                        <CategoryHeading
                            text={HHMMSSToHM(mockTestDuration)}
                        />
                    </div>
                </div>

                <div className="d-flex gap-2 ">
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

                    {(((isRetake) && status === "InProgress"))
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
                                navigate(RouteConstant?.Analyses, { state: { isCustome: isCustome, mockTestId: mockTestId }, replace: true });
                            }}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
