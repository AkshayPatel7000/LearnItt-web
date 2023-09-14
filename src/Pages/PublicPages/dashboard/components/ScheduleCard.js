import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../../../../customComponents/button/customButton'
// import { CountDownClock } from '../../../../customComponents/coundownClock/CountDownClock'
import { NormalHeading, SmallHeading } from '../../../../customComponents/DynamicText/Heading'
import { ThemeColors } from '../../../../theme/theme'
import { HHMMSSToHM } from '../../../../utils/hooks/hhmmssTohm'
import { RouteConstant } from '../../../../utils/routes/constant'
import CountDownClock from '../../../../customComponents/coundownClock/CountDownClock'

export default function ScheduleCard({ label, icon, data }) {
    const { isDay, mockTestDuration, mockTestId, mockTestName, startsInDays, startsInTime, testAvailaiblityType } = data;
    const navigate = useNavigate();
    const [remainingTime, setRemainingTime] = useState("00:00:00")

    const liveClock = () => {
        if (isDay) {
            const date = new Date().toISOString();
            const date1 = new Date(date);
            const date2 = new Date(startsInDays);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays + " days";
        } else {
            // return CountDownClock(startsInTime, setRemainingTime);
            return <CountDownClock time={startsInTime} setState={setRemainingTime} />
        }
    }

    const testStart = () => {
        if (remainingTime === "00:00:00" && !isDay) {
            navigate(RouteConstant?.generalInstruction, { state: { id: mockTestId }, });
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

    return (
        <div className='card border-0 rounded-3 p-4'>
            <div style={{ width: "100%" }}>
                <div style={{ float: "right", width: "40%" }} className="d-flex justify-content-end pt-3">{icon}</div>
                <div className='d-flex' style={{ float: "none", flexDirection: "column", gap: " 20px" }}>
                    <div>
                        {(mockTestName?.length > 25 ? <NormalHeading text={mockTestName?.substring(0, 25 - 3) + "..."} /> : <NormalHeading text={mockTestName} />)}
                        <label className='d-block' style={{ fontSize: "15px", color: "#787f86" }}>{label}</label>
                    </div>
                    <div className='d-flex flex-wrap justify-content-between align-items-end gap-3' style={{ minWidth: "max-content" }} >
                        <div>
                            <SmallHeading text="Starts in" />
                            <label style={{ fontWeight: 600, fontSize: "14px", color: ThemeColors.purple }}>{(testAvailaiblityType === 'Always') ? "00:00:00" : liveClock()}</label>
                        </div>
                        <div>
                            <SmallHeading text="Duration" />
                            {/* <label style={{ fontWeight: 600, fontSize: "14px", color: ThemeColors.purple }}>{moment(mockTestDuration, 'hh:mm:ss').format('hh[hr] mm[min]',)}</label> */}
                            <label style={{ fontWeight: 600, fontSize: "14px", color: ThemeColors.purple }}>{HHMMSSToHM(mockTestDuration)}</label>
                        </div>
                        <CustomButton title="Start" background={ThemeColors?.purple} width="50px" height="24px" titleStyle={{ fontSize: "12px" }} disable={checkTest() || !(remainingTime === "00:00:00")} func={() => testStart()} />
                    </div>
                </div>
            </div >
        </div >
    )
}
