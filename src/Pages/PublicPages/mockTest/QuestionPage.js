import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InfoIcon } from "../../../assets/icon/inputIcon";
import {
  Heading,
  Heading12500,
  Heading14600
} from "../../../customComponents/DynamicText/Heading";
import Popover from "../../../customComponents/popover/Popover";
import AuthStore from "../../../mobx/auth";
import QuestionStore from "../../../mobx/question";
import QuestionService from "../../../services/QuestionService";
import { ThemeColors } from "../../../theme/theme";
import Legend from "./components/Legend";
import QuestionCard from "./components/QuestionCard";
import QuestionSet from "./components/QuestionSet";
import { RouteConstant } from "../../../utils/routes/constant";
import MockTestData from "../../../services/MockTestService";
import { FixPayload } from "../../../utils/hooks/mocktest/MockTestQue";

const QuestionPage = () => {
  const location = useLocation();
  const [isBtnPaused, setIsBtnPaused] = useState(false)
  let data= JSON.parse(localStorage.getItem("questionParams"))
//  console.log("data=>>>>",data)


  const navigate = useNavigate()
  window.addEventListener("beforeunload",(e)=>handleBeforeUnload(e,QuestionStore?.remainingDuration) ,{capture:true});
  useEffect(() => {
    AuthStore.setDisplay("d-none")
    // let elem= document.getElementById('fullScreen');
    // const openFullScreen=()=>{
    //   console.log("full_screen")
    //   if(elem.requestFullscreen){
    //     elem.requestFullscreen()
    //    console.log("full_screen")
    //   }
      
    // }
    // openFullScreen()
  //   window.addEventListener("beforeunload", function(e){
  //     markAsSeen( QuestionStore.remainingDuration)
  //  }, false);
    // register_tab_GUID()
    
  
   
    if (document.addEventListener)
    {
     document.addEventListener('fullscreenchange', exitHandler, false);
     document.addEventListener('mozfullscreenchange', exitHandler, false);
     document.addEventListener('MSFullscreenChange', exitHandler, false);
     document.addEventListener('webkitfullscreenchange', exitHandler, false);
    }
    
    function exitHandler()
    {
     if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
     {
      // Run code on exit
     
      window.close()
     }
    }
    return () => {
      window.removeEventListener("beforeunload", (e)=>handleBeforeUnload(e,QuestionStore?.remainingDuration),{capture:true});
    //   window.removeEventListener("beforeunload", function(e){
    //     markAsSeen()
    //  }, false);
      AuthStore.setDisplay("")
    };
  }, []);
  const handleBeforeUnload = async (e, time) => {
    localStorage.setItem("time",time)
    e.preventDefault();
    markAsSeen(time)
    const message = "Are you sure you want to leave? All provided data will be lost.";
    (e || window.event).returnValue = null;
    return null;
   
  }
  useEffect(() => {
    const getQuestionData = async () => {
      let payload = {
        mockTestId: data?.id,
        isCustome: data?.isCustome,
      };
      // will discuss it and remove it //anjali
      const res = await QuestionService?.getQuestionPanel(payload);
      if (res.isSuccess) {
        getSubjectData();
        getLanguageData();
        if (res?.data?.remainingDuration !== res?.data.timeDuration) {
          getAnswers()
        }
      }
  
    }
    getQuestionData();
  }, [data?.id,data?.isCustome]);

  function register_tab_GUID() {
    // detect local storage available
    if (typeof (Storage) !== "undefined") {
        // get (set if not) tab GUID and store in tab session
        if (sessionStorage["tabGUID"] == null) sessionStorage["tabGUID"] = tab_GUID();
        var guid = sessionStorage["tabGUID"];

        // add eventlistener to local storage
        window.addEventListener("storage", storage_Handler, false);

        // set tab GUID in local storage
        localStorage["tabGUID"] = guid;
    }
}
// fd
function storage_Handler(e) {
    // if tabGUID does not match then more than one tab and GUID
    if (e.key === 'tabGUID') {
        if (e.oldValue != e.newValue) tab_Warning();
    }
}

function tab_GUID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

function tab_Warning() {
  markAsSeen()
    alert("Another tab is open!");
   
    // window.close()
}

  const submitTest = async (data) => {
    let post = {
      ...data.formData
    }
    let res = await MockTestData.saveMocktestStatus(post)
    if (res.isSuccess) {
      data?.setModal && data?.setModal(false);
      navigate(RouteConstant?.mockTestResult, { state: { uniqueId: res.data, isCustome: data?.formData?.isCustome, mockTestId: QuestionStore.userQuestion.mockTestId }, replace: true });
    }
  };
  const markAsSeen = async (time) => {
    let updated_time=time|| QuestionStore.remainingDuration;
    // console.log("time+>>>>>",time)
    let fix = await FixPayload();
    let post = {
      ...fix,
      isVisited: true,
      remainingDuration: updated_time
    }

    let res = await QuestionService?.markAsSeen(post);
    if (res) {
      // navigate(RouteConstant.viewmockTest)
    }

    return true
  }
  const getAnswers = async () => {
    const res = await QuestionService.getAllAnswers({ mockTestId: data?.id, isCustome: data?.isCustome });
    if (res?.isSuccess) {
      let panelData = res?.data?.studentQuestionResponse;
      let panelList = toJS(QuestionStore.userQuestion.mocktestPanelList)
      for (let i = 0; i < panelList.length; i++) {
        for (let j = 0; j < panelData.length; j++) {
          if (panelList[i].subjectId === panelData[j].subjectId) {
            for (let k = 0; k < panelList[i].subjectwiseSection.length; k++) {
              //if (panelList[i].subjectwiseSection[k].sectionId === panelData[j].sectionId) {
            //console.log("if2")
                for (let l = 0; l < panelList[i].subjectwiseSection[k].mockTestQuestions.length; l++) {
                  if (panelList[i].subjectwiseSection[k].mockTestQuestions[l].questionRefId === panelData[j].questionRefId) {
                   // console.log("if3")
                    let panel = {
                      isCorrect: {
                        isCorrectA: panelData[j].isCorrectA,
                        isCorrectB: panelData[j].isCorrectB,
                        isCorrectC: panelData[j].isCorrectC,
                        isCorrectD: panelData[j].isCorrectD,
                        studentAnswer: panelData[j].studentAnswer,
                        //
                        isMarkReview: panelData[j].isMarkReview,
                        isShowResult: panelData[j].isShowResult,
                        isVisited: panelData[j].isVisited,
                        isAnswered: panelData[j].isAnswered,
                        studentAns: true,
                      },
                    
                    }
                    let temp1 = panelList[i].subjectwiseSection[k]?.mockTestQuestions[l];
                    panelList[i].subjectwiseSection[k].mockTestQuestions[l] = { ...temp1, ...panel.isCorrect }
          
                  }
                }
              }
            }

          //}
        }
      }
      QuestionStore.setUserQuestion({ ...QuestionStore.userQuestion, mocktestPanelList: panelList })
    }
  }

  const getSubjectData = async () => {
    let menuData = await toJS(QuestionStore?.userQuestion?.mocktestPanelList)?.map((elm) => {
      return {
        title: elm?.subjectName,
        id: elm?.subjectId,
        subMenu: elm?.subjectwiseSection.map((data) => {
          return {
            title: data?.sectionName,
            mockTestQuestions: data?.mockTestQuestions,
          };
        }),
      };
    });
    QuestionStore?.setMenu(menuData);
    QuestionStore?.setSectionTitle(menuData[0]?.subMenu[0]?.title);
  }
  const getLanguageData = async () => {
    let languageData = await toJS(QuestionStore.userQuestion.languages)?.map((elm) => {
      return {
        value: elm.toLowerCase(),
        text: elm,
      }
    });
    // QuestionStore.setLangSelected("hindi");
    QuestionStore.setLangSelected(languageData[0].value);
    QuestionStore.setLanguageArr(languageData);
  }
  
   return (
    <>
    <div> 
    </div>
    <div style={{ paddingInline: "5%" }} id="fullScreen">
      <div
        className="d-flex justify-content-between py-1 px-4 mt-2"
        style={{ background: ThemeColors.skyBlue }}
      >
        <div
          className="d-flex flex-wrap"
          style={{ rowGap: "25px", columnGap: "55px" }}
        >
          <Legend
            color={ThemeColors?.notVisited}
            text="NOT VISITED"
            border={"1px solid #787f86"}
            width={"10px"}
            height={"10px"}
            borderRadius={"85px"}
            padding="6px 6px"
          />
          <Legend
            color={ThemeColors?.completed}
            text="ANSWERED"
            border={""}
            width={"10px"}
            height={"10px"}
            borderRadius={"85px"}
            padding="6px 6px"
          />
          <Legend
            color={ThemeColors?.expired}
            text="NOT ANSWERED"
            border={""}
            width={"10px"}
            height={"10px"}
            borderRadius={"85px"}
            padding="6px 6px"
          />
          <Legend
            color={ThemeColors?.lightSkyBlue}
            text="CURRENT QUESTIONS"
            border={"1px solid #0075FF"}
            width={"10px"}
            height={"10px"}
            borderRadius={"85px"}
            padding="6px 6px"
          />
          <Legend
            color={ThemeColors?.lightBlue}
            text="MARK FOR REVIEW"
            border={""}
            width={"10px"}
            height={"10px"}
            borderRadius={"85px"}
            padding="6px 6px"
          />
        </div>
        <div className="d-flex align-items-center gap-1 text-muted" >
        {
         QuestionStore?.userQuestion?.mocktestPanelList && 
         <>Need to attempt : <Heading12500 text={`${QuestionStore?.userQuestion?.mocktestPanelList?.[QuestionStore.subjectIndex]?.subjectwiseSection?.[QuestionStore.sectionIndex]?.totalAttempt} Question only`} /></>
        }
          <Popover popover__title={<InfoIcon />} style={{ paddingBottom: "5px" }}>
            <Heading text="Details" />
            <hr />
            <div className="d-grid" style={{ maxHeight: "30rem", overflowY: "auto", gap: "10px" }}>
              {
                QuestionStore.userQuestion?.mocktestPanelList && QuestionStore.userQuestion?.mocktestPanelList.map((list, key) => {
                  return (
                    <div key={key}>
                      <Heading14600 text={list?.subjectName} />
                      <Heading12500 color="#787f86" text={`Total Sections: ${list.subjectwiseSection.length}`} />
                      <Heading12500 color="#787f86" text={`Total Questions: ${list.subjectwiseSection.length>1 ? list?.totalQuestions : list.subjectwiseSection[QuestionStore?.sectionIndex]?.totalQuestions}`} />
                    </div>
                  )
                })}
            </div>
          </Popover>
        </div >
      </div>
      <div
        className="row m-0"
        style={{ background: ThemeColors.white, flexDirection: "row-reverse" }}
      >
        <div className="col-xl-3 col-lg-3">
          <QuestionSet isBtnPaused={isBtnPaused} setIsBtnPaused={setIsBtnPaused} isCustome={data?.isCustome} submitTest={submitTest} />
        </div>
        <div className="col-xl-9 col-lg-9">
          {
            QuestionStore?.userQuestion?.mocktestPanelList && <QuestionCard mocktestData={data} isCustome={data?.isCustome} isBtnPaused={isBtnPaused} data={QuestionStore?.userQuestion?.mocktestPanelList[QuestionStore.subjectIndex]?.subjectwiseSection[QuestionStore.sectionIndex]?.mockTestQuestions[QuestionStore?.questionIndex]} language={QuestionStore?.userQuestion?.languages} submitTest={submitTest} />
          }
        </div>
      </div>
    </div >
    </>
  );
}
export default observer(QuestionPage)