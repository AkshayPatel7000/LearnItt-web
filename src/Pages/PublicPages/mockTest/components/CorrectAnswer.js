import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useEffect, useState } from "react";
import { CorrrectTick, WrongTick } from "../../../../assets/icon/svgicon";
import { RobotgoryHeadingText } from "../../../../customComponents/Header/cardheader";
import { ThemeColors } from "../../../../theme/theme";
import { toJS } from "mobx";

/* eslint-disable*/
export default function CorrectAnswer({ data }) {
  const styled = {

    height: 'max-content',
    borderRadius: "5px",
    flexDirection: 'column',
    padding:'10px'
  };
  const styled1 = {
    background: ThemeColors?.inputbg,
    height: "auto",
    borderRadius: "5px",
    flexDirection: 'column',
    padding:'10px'
  };
 const [isCorrect , setisCorrect] =useState(false)

//  console.log("object--->" ,toJS(data?.explaination));
useEffect(()=>{
  if(data?.questionType!==3){
     let ActualAns=[data?.isActualCorrectA,data?.isActualCorrectB,data?.isActualCorrectC,data?.isActualCorrectD]
     let UserAns=[data?.isCorrectA,data?.isCorrectB,data?.isCorrectC,data?.isCorrectD]
     let checkedAns=[]
         for (let i=0;i<ActualAns?.length;i++){
          if(!ActualAns[i]){
            ActualAns[i]===UserAns[i]?
            checkedAns.push(true):checkedAns.push(false)
          }
          else{
            checkedAns.push(true)
          }
         }
         setisCorrect(checkedAns.every(item=>item===true))
   
  }
  else{
    if(data?.studentAnswer===data?.correctAnswerA){
      setisCorrect(true)
    }else{
      setisCorrect(false)
    }
  }
})

  return (
    <>
    <div className="d-flex align-items-start" style={{backgroundColor:isCorrect ? ThemeColors?.lightGreen: ThemeColors?.lightRed,...styled}} >
      <div className="d-flex justify-contect-between align-items-start ms-3 gap-3 mt-2">
        {
          isCorrect ?
          <><CorrrectTick /><RobotgoryHeadingText text="Correct" color={ThemeColors?.completed} /></>:
          <><WrongTick/><RobotgoryHeadingText text="Wrong" color={ThemeColors?.expired} /></>
        }
      
      </div>
      <div className="d-flex justify-contect-between align-items-start ms-5 mt-2">
      <MathJaxContext>
      <MathJax>
        <span
         className="queSpan"
          dangerouslySetInnerHTML={{
            __html: data?.correctAnswerA,
          }}
        />
      {/* </MathJax>
      <MathJax> */}
        <span
         className="queSpan"
          dangerouslySetInnerHTML={{
            __html: data?.correctAnswerB,
          }}
        />
      {/* </MathJax>
      <MathJax> */}
        <span
         className="queSpan"
          dangerouslySetInnerHTML={{
            __html: data?.correctAnswerC,
          }}
        />
      {/* </MathJax>
      <MathJax> */}
        <span
         className="queSpan"
          dangerouslySetInnerHTML={{
            __html: data?.correctAnswerD,
          }}
        />
      </MathJax>
    </MathJaxContext>
  
      </div>
      
    </div>
    <div className="d-flex align-items-start" style={styled1}>
      <div className="d-flex align-items-center ms-3">
        <RobotgoryHeadingText text="Explanation" color={ThemeColors?.lightPurple} />
      </div>
      <div className="d-flex align-items-center ms-3 mt-2">
      <MathJaxContext>
      <MathJax>
      <span
         className="queSpan"
          dangerouslySetInnerHTML={{
            __html:data?.explaination
          }}
        />
        </MathJax>
        </MathJaxContext>
        
       {/* {  &&  data?.explanation } */}
      </div>
      
    </div>
    </>
  );
}
