import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReportFooterLogo, ReportLogo } from "../../../assets/icon/svgicon";
import {
    CrossBlueIcon,
    CrossRedIcon,
    RightGreenIcon
} from "../../../assets/svg";
import {
    CorrectHeading,
    Heading,
    Heading12500,
    Heading14600,
    OverallTitleHeading,
    ResultTitleHeading,
    SmallTiHeading
} from "../../../customComponents/DynamicText/Heading";
import CustomButton from "../../../customComponents/button/customButton";
import { HeadTitle } from "../../../customComponents/headTitle/headTitle";
import MockTestData from "../../../services/MockTestService";
import { ThemeColors } from "../../../theme/theme";
import { RouteConstant } from "../../../utils/routes/constant";
import "../result/mockTestResult.css";
import ProgressBar from "./progressBar";
import TotoalMarksBar from "./totoalMarksBar";
const Analyses = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { mockTestId, isCustome } = location.state
    const [currentTab, setCurrentTab] = useState(0);
    const [resultData, setresultData] = useState();
    const [subjectData, setSubjectData] = useState();
    const [tabs, settabs] = useState([{ id: 0, title: 'All' }]);

    // console.log(" sect====>", location?.state?.isCustome);
    /* eslint-disable*/
    useEffect(() => {
        allPreviousResult()
        let button = document.getElementById("pdfGen");
        button.addEventListener("click",
            printDocument
        );
    }, [])


    // const style ={
    //     position: 'fixed',
    //     left: '0',
    //     bottom:' 0',
    //     width:' 100%',
    //     color: 'white',
    //     textAlign: 'center',
    // }
    function printDocument() {
        const input = document.querySelector("#pdfContainer");
        input.removeAttribute("hidden")
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');

                const pdf =  new jsPDF("portrait",'in',[10,8.3]);
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save(`result.pdf`);
            });
        input.setAttribute("hidden", true)
    }

    const allPreviousResult = async () => {
        let post = {
            mockTestId: mockTestId,
            isCustome: isCustome
        }
        let resp = await MockTestData.getStudentPreviousResult(post)
        if (resp.isSuccess) {
            let temp = {
                correct: resp.data.studentResults[0].overAllCorrect,
                inCorrect: resp.data.studentResults[0].overAllInCorrect,
                skipped: resp.data.studentResults[0].overAllSkipped,
                totalQuestion: resp.data.studentResults[0].totalQuestion,
            }
            setresultData(resp?.data?.studentResults?.[0])
            setSubjectData(temp)
            let tabData = resp?.data?.studentResults?.[0].subjectWisePermormance.map((subject, index) => {
                return {
                    title: subject?.subjectName,
                    id: index + 1,
                }
            })
            settabs([...tabs, ...tabData])
        }
    }


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
        navigate(RouteConstant?.MockSolution,{state:{mockTestId:resultData?.mockTestId, isCustome:location?.state?.isCustome}})
    }
    return (
        <div className="card border-0 radius-0 ps-4 py-4 gap-3">
            <div className="px-3">
                <HeadTitle text={resultData?.mockTestName} component1={<CustomButton title={"Download Result"} width="160px" id={"pdfGen"} />} />
            </div>
            <div className="d-flex flex-column py-3 me-4 px-4 flex-wrap" style={{ border: '1px solid #FAFAFA', borderRadius: '20px', columnGap: "55px" }}>

                <div className="d-flex flex-row gap-5">
                    <SmallTiHeading text="Total Marks Obtained" />
                    <SmallTiHeading text="Total Marks" />
                </div>

                <div className="d-flex flex-row gap-5" style={{ marginTop: "10px" }}>
                    <div className="d-flex align-items-center justify-content-center rounded p-3"
                        style={{ background: ThemeColors.lightBlue, height: "32px", color: ThemeColors.white }}
                    >{resultData?.score}</div>
                    <div className="d-flex align-items-center justify-content-center rounded p-3"
                        style={{ background: ThemeColors.lightBlue, height: "32px", color: ThemeColors.white, marginLeft: "7em" }}>
                        {resultData?.totalMarks}
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column py-3 me-4 px-4 mt-2 flex-wrap" style={{ border: '1px solid #FAFAFA', borderRadius: '20px', columnGap: "55px" }}>
                <div className="ms-2">  <Heading text="Result" /></div>
                <thead className="m-0">
                <tr>
                        <td>
                            <OverallTitleHeading text={`Marks Obtained`} />
                        </td>
                        <td >
                            :
                        </td>
                        <td >
                            {resultData?.score}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <OverallTitleHeading text={`Rank`} />
                        </td>
                        <td >
                            :
                        </td>
                        <td >
                          {resultData?.rank}
                        </td>
                    </tr>
                  
                </thead>
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
                        <CustomButton
                            title="Solution"
                            width="76px"
                            height="32px"
                            background={ThemeColors.black}
                            style={{ fontSize: "14px" }}
                            func={mockSolution}
                        />
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

            <div style={{height:"100vh",width:"40%"}}  id="pdfContainer" className="m-5 px-0" hidden={true}>
                 <div style={{height:"85vh"}}>
                     <div className="d-flex flex-row gap-5 p-3" style={{backgroundColor:ThemeColors?.inputbg}}>
                        <div className="ms-5">
                        <ReportLogo/>
                        </div>
                        <div className="flex-column">
                        <Heading14600 text="Score Card"/>
                        <p>Demonstrates how well you have performed relative to your objectives.</p>
                        </div>
                     </div>
                        <div className="card p-3 my-2 mx-5 pt-5" >
                        <div className="row justify-content-between m-0">
                            <div className="col-12">{resultData?.mockTestName}</div>
                            <div className="col-6"><Heading14600 text="Total Questions" /></div>
                            <div className="col-6"><CustomButton title= {resultData?.totalQuestion} background={ThemeColors.skyBlue} height="26px" width="" color={ThemeColors.lightBlue} /></div>
                            <div className="col-6"><Heading14600 text="Total Marks" /></div>
                            <div className="col-6"><CustomButton title= {resultData?.totalMarks} background={ThemeColors.skyBlue} height="26px" width="" color={ThemeColors.lightBlue} /></div>
                        </div>
                        </div>
                        <div className="card p-3 my-4 mx-5" >
                        <div className="row justify-content-between m-0">
                            <div className="col-6"><Heading14600 text="Rank" /></div>
                            <div className="col-6"><Heading12500 text={resultData?.rank} /></div>
                            <div className="col-6"><Heading14600 text="Marks Obtained" /></div>
                            <div className="col-6">{resultData?.score}</div>
                        </div>
                        </div>
                                     <div className="mx-5 mb-2">
                        <Heading12500 text="Your Performance" />
                                     </div>
                        <table className="table table-bordered mx-5" style={{ width: "88%" }} >
                        <thead>
                            <tr>
                                <th scope="col"><Heading12500 text={"Subject"} color={ThemeColors.secondaryBlack} /></th>
                                <th scope="col"><Heading12500 text={"Correct"} color={ThemeColors.completed} /></th>
                                <th scope="col"><Heading12500 text={"Incorrect"} color={ThemeColors.expired} /></th>
                                <th scope="col"><Heading12500 text={"Skipped"} color={ThemeColors.lightBlue} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                resultData?.subjectWisePermormance.map((data, key) => {
                                    return (
                                        <tr key={key}>
                                            <td ><Heading12500 text={data.subjectName} color={ThemeColors.secondaryBlack} /></td>
                                            <td >{data?.correct}</td>
                                            <td >{data?.inCorrect}</td>
                                            <td >{data?.skipped}</td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td ><Heading12500 text="Total" /></td>
                                <td >{resultData?.overAllCorrect}</td>
                                <td >{resultData?.overAllInCorrect}</td>
                                <td >{resultData?.overAllSkipped}</td>
                            </tr>
                        </tbody>
                </table>
                 </div>
                <div className="d-flex flex-row gap-5 p-3" style={{backgroundColor:ThemeColors?.primary,width:"100vw",color:ThemeColors?.white,top:''}}>
                    <div className="mt-3"><ReportFooterLogo/></div>
                    <div className="flex-column">
                    <Heading12500 color={ThemeColors.secondaryBlack} text={"Contact Us"}/>
                    <p>9754508541</p>
                    </div>
                    <div className="flex-column">
                    <Heading12500 color={ThemeColors.secondaryBlack} text={"Email Us"}/>
                    <p>braincordeducation@gmail.com</p>
                    </div>                  
                 </div>
            </div>
        </div>
    );
};
export default Analyses;
