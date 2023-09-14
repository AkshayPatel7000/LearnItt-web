import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    CrossBlueIcon,
    CrossRedIcon,
    RightGreenIcon
} from "../../../assets/svg";
import {
    CorrectHeading,
    OverallTitleHeading,
    ResultTitleHeading,
    SmallTiHeading
} from "../../../customComponents/DynamicText/Heading";
import CustomButton from "../../../customComponents/button/customButton";
import MockTestData from "../../../services/MockTestService";
import { ThemeColors } from "../../../theme/theme";
import { RouteConstant } from "../../../utils/routes/constant";
import "../result/mockTestResult.css";
import ProgressBar from "./progressBar";
import TotoalMarksBar from "./totoalMarksBar";
const MockTestResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { uniqueId, mockTestId, isCustome } = location.state
    const [currentTab, setCurrentTab] = useState(0);
    const [resultData, setresultData] = useState();
    const [subjectData, setSubjectData] = useState();
    const [tabs, settabs] = useState([{ id: 0, title: 'All' }]);
    /* eslint-disable */

    useEffect(() => {
        if (uniqueId) {
            getResult()
        }
    }, [uniqueId])

    const getResult = async () => {
        let post = {
            uniqueMockTestId: uniqueId,
            mockTestId: mockTestId,
            isCustome: isCustome
        }
        let resp = await MockTestData.getStudentResult(post)
        if (resp.isSuccess) {
            let temp = {
                correct: resp.data.overAllCorrect,
                inCorrect: resp.data.overAllInCorrect,
                skipped: resp.data.overAllSkipped,
                totalQuestion: resp.data.totalQuestion,
            }

            setresultData(resp?.data)
            setSubjectData(temp)
            let tabData = resp?.data?.subjectWisePermormance.map((subject, index) => {
                return {
                    title: subject.subjectName,
                    id: index + 1,
                }
            })
            settabs([...tabs, ...tabData])
        }
    }

    // const allPreviousResult = async () => {
    //     let post = {
    //         mockTestId: mockTestId,
    //         isCustome: isCustome
    //     }
    //     let resp = await MockTestData.getStudentPreviousResult(post)
    //     if (resp.isSuccess) {
    //         let temp = {
    //             correct: resp.data.studentResults[0].overAllCorrect,
    //             inCorrect: resp.data.studentResults[0].overAllInCorrect,
    //             skipped: resp.data.studentResults[0].overAllSkipped,
    //             totalQuestion: resp.data.studentResults[0].totalQuestion,
    //         }
    //         setresultData(resp?.data?.studentResults?.[0])
    //         setSubjectData(temp)
    //         let tabData = resp?.data?.studentResults?.[0].subjectWisePermormance.map((subject, index) => {
    //             return {
    //                 title: subject?.subjectName,
    //                 id: index+1,
    //             }
    //         })
    //         settabs([...tabs, ...tabData])
    //     }
    // }


    const handleTabClick = (data) => {
        setCurrentTab(data.id);
        if (data.title === "All") {
            let a = {
                correct: resultData?.overAllCorrect,
                inCorrect: resultData?.overAllInCorrect,
                skipped: resultData?.overAllSkipped,
                totalQuestion: resultData?.totalQuestion,
            }
            setSubjectData(a)
            setSubjectData(a)
        }
        else {
            let temp = resultData.subjectWisePermormance?.filter(elm => elm.subjectName === data.title)
            let a = {
                correct: temp[0]?.correct,
                inCorrect: temp[0]?.inCorrect,
                skipped: temp[0]?.skipped,
                totalQuestion: temp[0]?.totalSubjectQuestion,
            }
            setSubjectData(a)
        }
    }


    const mockSolution = () => {
        navigate(RouteConstant?.MockSolution, {state:{isCustome:isCustome}})
    }

    return (
        <div className="card border-0 radius-0 ps-4 py-4 gap-3">
            <div className="d-flex flex-column py-3 me-4 px-4 mt-2 flex-wrap" style={{ background: ThemeColors.inputbg, columnGap: "55px" }}>
                <ResultTitleHeading text={resultData?.mockTestName} />
                <div className="d-flex flex-row gap-5">
                    <SmallTiHeading text="Total Marks " />
                    <SmallTiHeading text="Marks Obtained" />
                </div>

                <div className="d-flex flex-row gap-5" style={{ marginTop: "10px" }}>
                    <div
                        className="d-flex align-items-center justify-content-center rounded p-3"
                        style={{ background: ThemeColors.lightBlue, height: "32px", color: ThemeColors.white }}
                    >{resultData?.totalMarks}</div>
                    <div className="d-flex align-items-center justify-content-center rounded p-3"
                        style={{ background: ThemeColors.lightBlue, height: "32px", color: ThemeColors.white, marginLeft: "2.7em" }}>
                        {/* {moment(resultData?.duration, 'HH:mm').format('H[ Hrs] m[ Mins]',)} */}
                        {resultData?.score}
                        {/* {resultData?.duration && HHMMSSToHM(resultData?.duration)} */}
                    </div>
                </div>
            </div>

            <div className="ml-4 tab-container ">
                <ResultTitleHeading text="Your Performance" />
                <div className="scrollmenu">
                    <div className='Tabcontainer'>
                        <div className='tabs'>
                            {tabs.map((tab, i) => {
                                return <button key={i} id={tab.id} disabled={currentTab === tab.id} onClick={() => handleTabClick(tab)}>{tab.title}</button>
                            }
                            )}
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div className="staticContainer justify-content-between  pe-4 py-4 my row ">
                <div className="overflowCard d-flex align-items-center p-3 rounded row  col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div className="d-flex flex-column align-items-center col-xl-4 ">
                        <OverallTitleHeading text="Total Attempt Questions" />
                        <ProgressBar correct={subjectData?.inCorrect + subjectData?.correct} totalQ={subjectData?.totalQuestion} />
                        {/* for custom mocktest */}
                        {
                            // !isCustome &&
                            <CustomButton
                                title="Solution"
                                width="76px"
                                height="32px"
                                background={ThemeColors.black}
                                style={{ fontSize: "14px" }}
                                func={mockSolution}
                            />

                        }

                    </div>
                    <div className="m-box d-flex flex-column align-items-center col-xl-8 ">
                        <div className="p-2 overflowCard1 d-flex align-items-center flex-row justify-content-between col-xl-12  ">
                            <div>
                                <div>{subjectData?.correct}</div>
                                <>
                                    <CorrectHeading text="correct " />
                                </>
                            </div>
                            <div>
                                <RightGreenIcon />
                            </div>
                        </div>
                        <div className="p-2 mt-3 overflowCard1 align-items-center d-flex flex-row justify-content-between col-xl-12  ">
                            <div>
                                <div>{subjectData?.inCorrect}</div>
                                <>
                                    <CorrectHeading text="Incorrect" />
                                </>
                            </div>
                            <div>
                                <CrossRedIcon />
                            </div>
                        </div>
                        <div className="p-2 mt-3 overflowCard1 align-items-center d-flex flex-row justify-content-between col-xl-12 ">
                            <div>
                                <div>{subjectData?.skipped}</div>
                                <>
                                    <CorrectHeading text="Skipped" />
                                </>
                            </div>
                            <div>
                                <CrossBlueIcon />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="barCard d-flex flex-column rounded col-xl-6 col-lg-6 col-md-6 col-sm-6 py-2">
                    <div className="d-flex justify-content-start mt-3 ms-3">
                        <OverallTitleHeading text="Total Marks" />
                    </div>
                    <div className="d-flex gap-5 justify-content-start" style={{ marginLeft: '7em' }}>
                        <OverallTitleHeading text={`Total Questions -${resultData?.totalQuestion}`} />
                        <OverallTitleHeading text={`Attempts - ${subjectData?.inCorrect + subjectData?.correct}`} />
                    </div>
                    <div className="mt-3" >
                        <TotoalMarksBar Correct={subjectData?.correct} Incorrect={subjectData?.inCorrect} Skipped={subjectData?.skipped} label={subjectData?.totalQuestion} />
                    </div>
                </div>

            </div>

        </div>
    );
};
export default MockTestResult;
