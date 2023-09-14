import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useEffect, useState } from "react";
import { CloseArrow, DownArrow } from "../../../../assets/svg";
import {
  ResultTitleHeading,
  RobotSolMediumHeading1,
  SolutionRobotoTextHeading
} from "../../../../customComponents/DynamicText/Heading";
import {
  RobotoblackHeading1
} from "../../../../customComponents/Header/cardheader";
import QuestionStore from "../../../../mobx/question";
import QuestionService from "../../../../services/QuestionService";
import "./mockSolution.css";
import SolDropdown from "./solDropDown";
import { ThemeColors } from "../../../../theme/theme";
import { useLocation } from "react-router-dom";

const MockSolution = () => {
  const [open, Setopen] = useState(false);
  const [openindex, SetOpenindex] = useState(null);
  const [subjectSection, SetSubjectSection] = useState();
  const [solutionData, SetSoluionData] = useState();
  const [currentTab, setCurrentTab] = useState();
  const [setSectionSol, SetsetSectionSol] = useState();
  const location =useLocation()
  // var sect = solutionData[0]?.subjectwiseSection[0]?.mockTestQuestions;
  // var sect = solutionData[0]?.subjectwiseSection[0]?.mockTestQuestions;

  //  console.log(" sect====>", location?.state?.isCustome);

  useEffect(() => {
    getMockSolution();
  }, []);

  const getMockSolution = async () => {
    let payload = {
      mockTestId: QuestionStore.userQuestion.mockTestId || location?.state?.mockTestId,
      isCustome: false || location?.state?.isCustome,
    };
    const resp = await QuestionService?.getMockTestSolution(payload);
    if (resp?.isSuccess) {
      let solData = resp?.data?.mocktestPanelList;
      SetSoluionData(solData);
      SetsetSectionSol(
        resp?.data?.mocktestPanelList[0].subjectwiseSection[0].sectionId
      );
      SetSubjectSection(resp?.data?.mocktestPanelList[0]);
      setCurrentTab(resp?.data?.mocktestPanelList[0].subjectId
      )
    }
  };

  const solutionOpen = (index) => {
    Setopen(true);
    SetOpenindex(index);
  };
  const ClosesolutionOpen = () => {
    Setopen(false);
    SetOpenindex(null);
  };
  const subjectsect = (tab) => {
    SetSubjectSection(tab);
    SetsetSectionSol(tab?.subjectwiseSection[0].sectionId);
    setCurrentTab(tab.subjectId);
  };


  return (
    <>
      {
        solutionData ?
        <>
      <ResultTitleHeading text="Solution" />
      <div className="solution mt-2 mb-3">
        {solutionData?.map((tab, i) => {
          return (
            <button
              key={i}

              disabled={currentTab === `${tab.subjectId }`}

              className={currentTab === tab.subjectId ? 'selected' : ''}
              onClick={(e) => subjectsect(tab)}
            >
              {tab.subjectName}
            </button>
          );
        })}
      </div>
      <SolDropdown
        option={subjectSection?.subjectwiseSection}
        width="130px"
        setFieldValue={SetsetSectionSol}
      />
      <div className="row">
        {solutionData?.map((mockTest) => {
          return mockTest?.subjectwiseSection
            ?.filter((sect) => sect.sectionId === setSectionSol)
            .map((section) => {

              return section?.mockTestQuestions?.map((question, index) => {
              
                return (
                  <MathJaxContext>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 py-2">
                      <div className="card border-0 mt-3 rounded-0 p-3 solutionContainer">
                        <div style={{backgroundColor:ThemeColors?.inputbg , color:ThemeColors?.lightPurple}} className="py-2 rounded d-flex justify-content-center">Question {index + 1}</div>
                        <div className="pt-3">
                          <MathJax>
                            <div> <RobotoblackHeading1
                              text={
                                question?.questionTableData?.english?.questionText
                              }
                            /></div>

                          </MathJax>
                        </div>
                        <div className="d-flex gap-2 justify-content-center mt-4">
                          <div
                            key={index}
                            className="d-flex gap-2"
                            onClick={() => solutionOpen(index)}
                          >
                            {!open && openindex !== index ? (
                              <>
                                {" "}
                                <SolutionRobotoTextHeading text="View Solution" />
                                <span>
                                  {" "}
                                  <DownArrow stroke={ThemeColors.lightBlue} />
                                </span>
                              </>
                            ) : (
                              ""
                            )}{" "}
                          </div>
                        </div>

                        {open && openindex === index ? (
                          <div style={{ backgroundColor: "#FAFAFA" }}>
                            <div className="d-flex gap-2 justify-content-center mt-4">
                              <div>
                                <MathJax>
                                  <RobotSolMediumHeading1
                                    text={
                                      question?.questionTableData.english.explanation ?   question?.questionTableData.english.explanation : "Solution not found"
                                    }
                                  />
                                </MathJax>
                                <div
                                  onClick={ClosesolutionOpen}
                                  className="d-flex justify-content-center pt-4"
                                >
                                  <div className="d-flex gap-2">
                                    {" "}
                                    <SolutionRobotoTextHeading text="Hide Solution " />
                                    <span>
                                      <CloseArrow />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>{" "}
                    </div>
                  </MathJaxContext>
                );
              });
            });
        })}
      </div>
        </>
        : <h2>Data Not Found</h2>
      }
     
    </>
  );
};

export default MockSolution;
