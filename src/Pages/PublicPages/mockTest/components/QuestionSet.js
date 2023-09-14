import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StopWatchIcon, WarningIcon } from "../../../../assets/icon/inputIcon";
import { answered, currentQuestion, mark4Review, notAnswered, notVisited } from "../../../../assets/regex";
import { Heading12500 } from "../../../../customComponents/DynamicText/Heading";
import MultilevelDropdown from "../../../../customComponents/multilevelDropdown/MultilevelDropdown";
import Timer from "../../../../customComponents/timer/Timer";
import QuestionStore from "../../../../mobx/question";
import QuestionService from "../../../../services/QuestionService";
import { ThemeColors } from "../../../../theme/theme";
import { FixPayload, SetAllOptFalse } from "../../../../utils/hooks/mocktest/MockTestQue";
import TimeWarningModal from "../Modals/TimeWarningModal.js";



const QuestionSet = ({ isBtnPaused, setIsBtnPaused, isCustome, submitTest }) => {
  const [remainingTime, setRemainingTime] = useState("00:00:00")
  const [ModalData, setModalData] = useState({})
  const [newDiff, setNewDiff] = useState(null)
  const [isActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef();
  const [timerInfo, setTimerInfo] = useState({ hours: "00", minutes: "00", seconds: "00" });
  const navigate = useNavigate()

  useEffect(() => {
    const func = function (event) {
      // The popstate event is fired each time when the current history entry changes.

      var r = window.alert("You pressed a Back button! Are you sure?!");

      if (r === true) {
        // Call Back button programmatically as per user confirmation.
        this.history.back();
        // Uncomment below line to redirect to the previous page instead.
        // window.location = document.referrer // Note: IE11 is not supporting this.
      } else {
        // Stay on the current page.
        this.history.pushState(null, null, window.location.pathname);
      }

      this.history.pushState(null, null, window.location.pathname);
    }

  //  console.log("QuestionStore.remainingDuration", toJS(QuestionStore.remainingDuration))
    // window.addEventListener("beforeunload", (e) => handleBeforeUnload(e, QuestionStore.remainingDuration));
    // window.addEventListener("pageshow", (e) => pageShown(e) );
    // window.addEventListener("pagehide", pageHidden, false);
    //  window.addEventListener("p")
    
   
    
    return () => {
    
      //  alert("Reload kar diya!! nahi karna tha")
      // window.removeEventListener("pageshow", (e) => pageShown(e));
      // window.removeEventListener("pagehide", pageHidden, false);
      // window.removeEventListener("beforeunload", (e) => handleBeforeUnload(e, QuestionStore.remainingDuration));
   
    };
  }, []);
 

  const handleBeforeUnload = async (e, time) => {
    localStorage.setItem("time",time)
    e.preventDefault();
    //console.log("time on reload --> ", time);
    markAsSeen(time)
    const message = "Are you sure you want to leave? All provided data will be lost.";
    (e || window.event).returnValue = null;
    return null;
   
  }

  async function pageShown(evt, time) {
   // console.log("pageShown", time)
      

    if (evt.persisted) {
      alert("1 The page was just restored from the Page Cache.")
    }
    else {
      alert("IFFFFFFFF event handler called. The page was just restored from the Page Cache.")
    //  window.close()
    //  console.log("hello 1")
      // let x = alert("You will LOSS all of your data")
      // console.log("x", x)

    };
  }
  function pageHidden(evt) {
    if (evt.persisted) alert("pagehide event handler called. The page was suspended and placed into the Page Cache.");
    else alert("pagehide event handler called for page destruction. This is the same as the unload event.");
  }

  useEffect(() => {
    if (QuestionStore?.timeDuration) {
      let t = QuestionStore?.timeDuration.split(":")
      const dt = new Date();
      let t1 = t[0];
      let t2 = t[1];
      let t3 = t[2];
      dt.setHours(+dt.getHours() + +t1)
      dt.setMinutes(+dt.getMinutes() + +t2)
      dt.setSeconds(+dt.getSeconds() + +t3)
      setRemainingTime(dt)
      const dateCreated = dt;

      const currentDate = new Date().getTime();
      const setDueDate = new Date(dateCreated);
      setDueDate.setDate(setDueDate.getDate());
      const dueDate = setDueDate.getTime();
      setNewDiff(dueDate - currentDate)
    }
  }, [QuestionStore?.timeDuration]);
  /* eslint-disable */
  const sectionSet = (item, subItem, index, subIndex) => {
    QuestionStore.setSubjectIndex(index);
    QuestionStore.setSectionIndex(subIndex);
    QuestionStore?.setQuestionIndex(0);
    QuestionStore?.setSectionTitle(subItem?.title);
  };



  const handleTimer = async (status) => {
    let post = {
      mockTestId: QuestionStore.userQuestion.mockTestId,
      isPaused: !isPaused,
      remainingDuration: timerInfo
    }
    setIsPaused(!isPaused)
    if (status === "status") { 
      setIsPaused(false) 
      
    }
    setIsBtnPaused(!isBtnPaused);
    
    const resp = await QuestionService.resumeMocktest(post)
  }
  useEffect(() => {
    if (newDiff === 0) {

      return setModalData({
        icon: "",
        heading: "Time's up!!",
        paragraph: "Your test time has expired. Please submit your test to view your results.",
        buttonText: "Submit",
        onClick: () => {
          submitTest({
            formData: {
              mockTestId: QuestionStore.userQuestion.mockTestId,
              isCustome: isCustome,
              isStarted: false,
              isCompleted: true
            }
           
          }); setModalData({})
        }
      })

    }
    if (newDiff === 30000) {
      handleTimer();
      setModalData({
        icon: <WarningIcon />,
        heading: "Attention!!",
        paragraph: "You only have 30 Second left, please submit your test. ",
        buttonText: "Continue",
        onClick: () => {
          handleTimer("status");
          setIsBtnPaused(false); 
          setModalData({})

        }
      })
    }
  }, [newDiff])

  const handlePanel = (index) => {
    QuestionStore?.setQuestionIndex(index);
    let currentQ = QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[index]
    if (currentQ?.isVisited && !currentQ?.isAnswered) {
      QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[index].studentAns = false;
      SetAllOptFalse()
    }

  }
  const markAsSeen = async (time) => {
    
    //console.log("hello=>>>",time)

    let fix = await FixPayload();
    let post = {
      ...fix,
      isVisited: true,
      remainingDuration:time
    }

    let res = await QuestionService?.markAsSeen(post);
    if (res) {
      // navigate(RouteConstant.viewmockTest)
    }

    return true
  }

  return (
    <div
      className="card border-0 rounded-0 mt-3"
      style={{ background: ThemeColors.inputbg, height: "95%" }}
    >
      <div className="d-flex justify-content-between flex-wrap align-items-center px-3 py-2">
        <div
          className="d-flex gap-2 align-items-center"
          style={{ fontWeight: 500, fontSize: "14px" }}
        >
          <StopWatchIcon />
          <label style={{ minWidth: "60px" }}>Time Left </label>
          {/* <label className="text-danger">{Timer(remainingTime)}</label> */}
          <label className="text-danger">{<Timer remainingTime={remainingTime} ref={timerRef} setTimerInfo={setTimerInfo} timerInfo={timerInfo} isPaused={isPaused} isActive={isActive} newDiff={newDiff} setNewDiff={setNewDiff} />}</label>
        </div>
        {/* {QuestionStore.userQuestion?.isResume &&
          <CustomButton
            title={isPaused ? "Play" : "Pause"}
            height="36px"
            width="90px"
            func={handleTimer}
            icon={isPaused ? <PlayIcon /> : <PauseIcon />}
            background={ThemeColors.white}
            color={ThemeColors.black}
            style={{ border: "1px solid #4FA4F4" }}
            titleStyle={{
              fontFamily: "Medium",
              fontWeight: 500,
              fontSize: "14px",
            }}
            iconStyle={{ paddingBottom: "5px" }}
          />
        } */}
      </div>
      <div
        className="d-flex justify-content-between flex-wrap align-items-center px-3 py-2 my-2"
        style={{
          background: ThemeColors.skyBlue,
          color: ThemeColors.lightBlue,
        }}
      >
        <MultilevelDropdown
          menu={QuestionStore?.menu}
          subMenuFunc={sectionSet}
        />
        <Heading12500
          color={ThemeColors.lightBlue}
          text={QuestionStore?.sectionTitle}
        />
      </div>
      <div style={{ maxHeight: "350px", overflowY: "auto", marginTop: "10px" }}>
        <div className="d-flex gap-2 flex-wrap p-3 pt-0 pointer">
          {QuestionStore?.userQuestion?.mocktestPanelList && QuestionStore?.userQuestion?.mocktestPanelList[QuestionStore.subjectIndex]?.subjectwiseSection[QuestionStore.sectionIndex]?.mockTestQuestions?.map((data, index) => {
         
            return (
              <div
                key={index}
                className="d-flex justify-content-center align-items-center questionSetBox"
                style={
                  (data.questionRefId === QuestionStore.currentQue.questionRefId) ? { ...currentQuestion } : data?.isAnswered ? { ...answered } : data?.isMarkReview ? { ...mark4Review } : (data?.isVisited && !data?.isAnswered) ? { ...notAnswered } : { ...notVisited }
                }
                onClick={() => { handlePanel(index) }}>{index + 1}
              </div>
            );
          })}
        </div>
      </div>
      {ModalData && ModalData?.heading && <TimeWarningModal ModalData={ModalData} />}
    </div >
  );
};

export default observer(QuestionSet);
