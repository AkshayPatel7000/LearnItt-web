import { MathJaxContext } from "better-react-mathjax";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Heading24500, SmallTiHeading, TileHeading } from "../../../../customComponents/DynamicText/Heading";
import { CategoryHeading } from "../../../../customComponents/Header/cardheader";
import CustomButton from "../../../../customComponents/button/customButton";
import CustomDropdown from "../../../../customComponents/customDropdown/customDropdown";
import ModalPopup from "../../../../customComponents/customModals/CustomModal";
import QuestionStore from "../../../../mobx/question";
import QuestionService from "../../../../services/QuestionService";
import { ThemeColors } from "../../../../theme/theme";
import { FixPayload, SetAllOptFalse } from "../../../../utils/hooks/mocktest/MockTestQue";
import CorrectAnswer from "./CorrectAnswer";
import IntegerType from "./IntegerType";
import MCQType from "./MCQType";
import SingleType from "./SingleType";
import { toJS } from "mobx";

const QuestionCard = ({ isCustome, data, isBtnPaused, submitTest,mocktestData }) => {
  QuestionStore.setCurrentQue(data);
  // const location = useLocation();
  const [modal, setModal] = useState(false);
  const [reviewAns, setreviewAns] = useState();
  const [isSubmit, setisSubmit] = useState(false);
  const  dataCheck=QuestionStore?.userQuestion?.mocktestPanelList[QuestionStore.subjectIndex]?.subjectwiseSection[QuestionStore.sectionIndex]?.mockTestQuestions
 
  useEffect(() => {
   QuestionStore?.setIndex(0);

    if(toJS(dataCheck).filter(elm=>elm?.isAnswered===true).length >= 1){
    setisSubmit(true)
   }
    
  }, [mocktestData?.id, QuestionStore?.userQuestion?.mocktestPanelList]);


  useEffect(()=>{
    window.addEventListener("beforeunload", function(e){
      markAsSeen()
   }, false);
   return ()=>{  
    window.removeEventListener("beforeunload", function(e){
    markAsSeen()
 }, false);
   markAsSeen()}
  },[])
 

  useEffect(() => {
    const markasSeen=function(e){
      markAsSeen( QuestionStore.remainingDuration)
   }
    const getCorrectAnswer = async () => {
      let payload = {
        mockTestId: mocktestData?.id,
        questionRefId: data?.questionRefId,
      };
      const res = await QuestionService?.getReviewAnswer(payload);
      //console.log("res->>",res)
      if (res?.isSuccess) {
        setreviewAns(res?.data)
        QuestionStore.userQuestion.mocktestPanelList[
          QuestionStore.subjectIndex
        ].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[
          QuestionStore.questionIndex
        ].IsShowCorrectAns = true
      }
    }
    if (QuestionStore?.CorrectAnswer && !data?.isAnswered) {
      QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].IsSave = true;
      QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].IsReview = false;
    } else if (data?.isAnswered && QuestionStore?.CorrectAnswer) {
      QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].IsReview = true;
      QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].IsSave = false;
      QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].IsShowCorrectAns = true
       getCorrectAnswer();
    }
    else {
      QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].IsReview = true;
    }
    // if (!data?.isVisited) {
    QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].isVisited = true;
    // getCorrectAnswer();
    markAsSeen()
    // }
   
  }, [data,mocktestData?.id]);

  const nextPage = async () => {
    
    if(toJS(dataCheck).filter(elm=>elm?.isAnswered===true).length >= 1){
    setisSubmit(true)
   }
    if (data?.IsShowCorrectAns) {
      //show next answer
      if (QuestionStore?.userQuestion?.mocktestPanelList[QuestionStore.subjectIndex]?.subjectwiseSection[QuestionStore.sectionIndex]?.mockTestQuestions.length !== QuestionStore?.questionIndex + 1) {
        QuestionStore.setQuestionIndex(QuestionStore?.questionIndex + 1);
        let currentQ = QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex];
        if (currentQ?.isVisited && !currentQ?.isAnswered) {
          SetAllOptFalse();
        }
      }
    }
     else {
      //  save answer
      var count = 0;
      let QuestionAttempted = JSON.parse(JSON.stringify(QuestionStore.userQuestion.mocktestPanelList[
        QuestionStore.subjectIndex
      ].subjectwiseSection[QuestionStore.sectionIndex]));
      QuestionAttempted.mockTestQuestions.map((item) => {
        if (item.isAnswered) {
          count = count + 1
        }
      })
      if (count >= QuestionAttempted.totalAttempt && !isCustome) {
        toast.warning(`Your maximum attempt is ${QuestionAttempted.totalAttempt}`)
      } else {
        if (QuestionStore.currentQue?.isVisited && QuestionStore.currentQue?.studentAns) {
          QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].isAnswered = true;
          QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].isMarkReview = false;
        }
        let fix = await FixPayload();
        let payload = {
          ...fix,
          isCustome: isCustome,
          isMarkReview: false,
          isAnswered: QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].isAnswered || false,
          remainingDuration: QuestionStore.remainingDuration
        };
        if (payload.questionType === 3) {
          payload.studentAnswer = QuestionStore.integerTypeValue;
        }

        let saveNextres = await QuestionService?.saveStudentAnswer(payload);
        if (saveNextres.isSuccess) {
      
          if (
            QuestionStore?.userQuestion?.mocktestPanelList[
              QuestionStore.subjectIndex
            ]?.subjectwiseSection[QuestionStore.sectionIndex]?.mockTestQuestions
              .length !==
            QuestionStore?.questionIndex + 1
          ) {
            QuestionStore.setQuestionIndex(QuestionStore?.questionIndex + 1);
            let currentQ =
              QuestionStore.userQuestion.mocktestPanelList[
                QuestionStore.subjectIndex
              ].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[
              QuestionStore.questionIndex
              ];
            if (currentQ?.isVisited && !currentQ?.isAnswered) {
              SetAllOptFalse();
            }
          }
        }
      }
    }
  };

  const ShowCorrectAnswer = async () => {
    var count = 0;
    let QuestionAttempted = JSON.parse(JSON.stringify(QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex]));
    QuestionAttempted.mockTestQuestions.map((item) => {
      if (item.isAnswered) {
        count = count + 1
      }
    })

    if (count >= QuestionAttempted.totalAttempt && !isCustome) {
      return toast.warning(`Your maximum attempt is ${QuestionAttempted.totalAttempt}`);
    } 
    else {
      let currentQue=QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex]
      // save response  first before  review answer
      if (currentQue?.isVisited && currentQue?.studentAns) {
      // if (QuestionStore.currentQue?.isVisited && QuestionStore.currentQue?.studentAns) {
        QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].isAnswered = true;
      }

    }
    let fix = await FixPayload()
    let payload = {
      ...fix,
      isAnswered: QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].isAnswered || false,
      isMarkReview: false,
      isCustome: isCustome,
      remainingDuration: QuestionStore.remainingDuration
    };
    if (payload.questionType === 3) {
      payload.studentAnswer = QuestionStore.integerTypeValue;
    }
    let saveNextres = await QuestionService?.saveStudentAnswer(payload);
    if (saveNextres.isSuccess) {
      QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].IsSave = false;
      QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].IsReview = true;
      // --------------------//
      let payload = {
        mockTestId: mocktestData?.id,
        questionRefId: data?.questionRefId,
        remainingDuration: QuestionStore.remainingDuration
      };
      //===============//
      const res = await QuestionService?.getReviewAnswer(payload);
      if (res?.isSuccess) {
        setreviewAns(res?.data)
        QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].IsShowCorrectAns = true
      }
    }


  };

 
  const clearPage = async () => {
    let temp = QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex];
    temp = { ...temp, ...QuestionStore.optSet, };
    QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex] = {
      ...temp,
      isAnswered: false,
      isMarkReview: false,
      studentAns: false,
    };
    QuestionStore.setCurrentQue(temp);

    let fix = await FixPayload();
    let post = {
      ...fix,
      isVisited: true,
      remainingDuration: QuestionStore.remainingDuration
    }
    await QuestionService?.removeAns(post);
  };

  const markForReview = async () => {
    // Mark for review save //
    
    if(toJS(dataCheck).filter(elm=>elm?.isAnswered===true).length >= 1){
      setisSubmit(true)
     }
    if (QuestionStore.currentQue?.isVisited && QuestionStore.currentQue?.studentAns) {
      QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].isAnswered = false;
    }
    // QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].isMarkReview = true;
    let fix = await FixPayload()
    let payload = {
      ...fix,
      isMarkReview: true,
      isAnswered: false,
      isCustome: isCustome,
      remainingDuration: QuestionStore.remainingDuration
    };
    if (payload.questionType === 3) {
      payload.studentAnswer = QuestionStore.integerTypeValue;
    }

    let saveNextres = await QuestionService?.saveStudentAnswer(payload);
    if (saveNextres.isSuccess) {
      if (QuestionStore?.userQuestion?.mocktestPanelList[QuestionStore.subjectIndex]?.subjectwiseSection[QuestionStore.sectionIndex]?.mockTestQuestions.length !== QuestionStore?.questionIndex + 1) {
        QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].isMarkReview = true;
        QuestionStore.setQuestionIndex(QuestionStore?.questionIndex + 1);
        let currentQ = QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex];
        if (currentQ?.isVisited && !currentQ?.isAnswered) {
          SetAllOptFalse();
        }
      }
    }
  };

  const markAsSeen = async () => {
    let fix = await FixPayload();
    let post = {
      ...fix,
      isVisited: true,
      remainingDuration: QuestionStore.remainingDuration
    }
    await QuestionService?.markAsSeen(post);
  }

  const setCurrentLanguage = (data) => {
    QuestionStore.setLangSelected(data.value)
  }

  return (
    <>
      <MathJaxContext>
        <div className="card rounded-0 border-0 px-3 gap-2 h-100 pt-2">
          <div className="d-flex col justify-content-between flex-wrap">
            <TileHeading text={`Question ${QuestionStore?.questionIndex + 1}`} />
            <CustomDropdown menu={QuestionStore.languageArr} selectedValues={QuestionStore.languageArr[0]} func={setCurrentLanguage} />
            {/* <CustomDropdown menu={Languages} selectedValues={Languages[0]}/> */}
          </div>

          <div
            className="d-flex flex-column justify-content-between"
            style={{ minHeight: "73vh" }}
          >
            <div>
              <SmallTiHeading
                color={ThemeColors.black}
                text={data?.questionTableData[QuestionStore?.langSelected]?.questionText}
              />
              {data?.questionTableData[QuestionStore?.langSelected]?.isAvailable &&
                <>
                  {(data?.questionType === 1 ||
                    data?.questionType === 5 ||
                    data?.questionType === 4) && (
                      <SingleType data={data} IsReview={data?.IsShowCorrectAns} />
                    )}
                  {data?.questionType === 2 && (
                    <MCQType data={data} IsReview={data?.IsShowCorrectAns} />
                  )}
                  {data?.questionType === 3 && (
                    <IntegerType data={data} IsReview={data?.IsShowCorrectAns} />
                  )}
                </>
              }
            </div>

            {
              data?.IsShowCorrectAns && data?.questionTableData[QuestionStore?.langSelected]?.isAvailable && <CorrectAnswer data={reviewAns} />
            }

            <div className="d-flex justify-content-between gap-3 flex-wrap mt-3 mb-3">
              <CustomButton
                background={
                  data?.isAnswered ? ThemeColors?.markdisable : ThemeColors.lightBlue
                }
                title="Mark for Review"
                width="155px"
                disable={data?.isAnswered || isBtnPaused}
                func={() => {
                  markForReview();
                }}
              />
              <div className="d-flex gap-2">
                <CustomButton
                  func={clearPage}
                  title="Clear"
                  width="125px"
                  style={{
                    borderRadius: "35px 0px 0px 35px",
                    border: "1px solid #0B1C30",
                  }}
                  background={ThemeColors.white}
                  color={ThemeColors.black}
                  disable={data?.IsShowCorrectAns || isBtnPaused}
                />

                {data?.IsSave ? (
                  <CustomButton
                    title="Review Answer"
                    background={
                      !data?.studentAns
                        ? ThemeColors?.disable
                        : ThemeColors?.primary
                    }
                    disable={!data?.studentAns || isBtnPaused}
                    func={ShowCorrectAnswer}
                    width="148px"
                    style={{ borderRadius: "0px 35px 35px 0px" }}
                  />
                ) : (
                  data?.IsReview && (
                    <CustomButton
                      title="Save & Next"
                      background={
                        !data?.studentAns
                          ? ThemeColors?.disable
                          : ThemeColors?.primary
                      }
                      disable={!data?.studentAns || isBtnPaused}
                      func={nextPage}
                      width="125px"
                      style={{ borderRadius: "0px 35px 35px 0px" }}
                    />
                  )
                )}
              </div>

              <CustomButton
                title="Submit Test"
                width="125px"
                background={ThemeColors.completed || isBtnPaused}
                func={() => {
                  setModal(true);
                }}
                disable={!isSubmit}
              />
            </div>
          </div>
        </div>
      </MathJaxContext>

      {modal && (
        <ModalPopup
          CloseModalFunc={() => {
            setModal(false);
          }}
          isFooter={false}
          width={"396px"}
        >
          <div className="row m-0 text-center gap-3">
            <Heading24500 text="Submit Test" />
            <CategoryHeading
              text="Are you sure you want to submit the test for final marking?"
              color={ThemeColors.black}
            />
            <CategoryHeading
              text="No changes will be allowed after the submission."
              color={ThemeColors.lightPurple}
            />
            <div className="d-flex justify-content-center gap-3">
              <CustomButton
                title="Yes"
                width="64px"
                func={() => submitTest({
                  formData: {
                    mockTestId: QuestionStore.userQuestion.mockTestId,
                    isCustome: isCustome,
                    isStarted: false,
                    isCompleted: true
                  }, setModal
                })}
              />
              <CustomButton
                title="No"
                width="64px"
                background={ThemeColors.white}
                style={{
                  border: "1px solid #0B1C30",
                  color: ThemeColors.primary,
                  fontWeight: 500,
                }}
                func={() => setModal(false)}
              />
            </div>
          </div>
        </ModalPopup>
      )}
    </>
  );
};
export default observer(QuestionCard);
