import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { SmallHeading } from '../../../../customComponents/DynamicText/Heading'
import QuestionStore from '../../../../mobx/question'
import { QASelected } from '../../../../utils/routes/constant'


const SingleType = ({ IsReview, data }) => {
  //console.log("ddddddddddddd",toJS(data))
  const questionData = data.questionTableData[QuestionStore?.langSelected]
  const ansClick = (data) => {
    QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].studentAns = true
    let optSet = { ...QuestionStore.optSet, ...data }
    let tempUserQ = toJS(QuestionStore?.userQuestion)
    let que = tempUserQ?.mocktestPanelList[QuestionStore.subjectIndex]?.subjectwiseSection[QuestionStore.sectionIndex]?.mockTestQuestions[QuestionStore?.questionIndex]
    tempUserQ.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex] = { ...que, ...optSet }
   // console.log("--------->",toJS(tempUserQ))
    QuestionStore.setUserQuestion(tempUserQ)
  }

  return (
    <div className='d-grid gap-2 mt-2'>
      <label >
        <div className="card p-2" onClick={() => { !IsReview && ansClick({ isCorrectA: true }) }} style={data?.isCorrectA ? { ...QASelected } : {}} >
          <div className="d-flex justify-contect-between  align-items-center gap-3">
            <input type="radio" id="isCorrectA" checked={data.isCorrectA || false} disabled={IsReview} />
            <p className='p-0 m-0'>A.</p><SmallHeading text={`${questionData?.optionA}`} />
          </div>
        </div>
      </label>
      <label >
        <div className="card p-2" onClick={() => { !IsReview && ansClick({ isCorrectB: true }) }} style={data?.isCorrectB ? { ...QASelected } : {}} >
          <div className="d-flex justify-contect-between align-items-center gap-3">
            <input type="radio" id="isCorrectB" checked={data.isCorrectB || false} disabled={IsReview} />
            <p className='p-0 m-0'>B.</p><SmallHeading text={`${questionData?.optionB}`} />
          </div>
        </div>
      </label>
      <label>
        <div className="card p-2" onClick={() => { !IsReview && ansClick({ isCorrectC: true }) }} style={data?.isCorrectC ? { ...QASelected } : {}} >
          <div className="d-flex justify-contect-between align-items-center gap-3">
            <input type="radio" id="isCorrectC" checked={data.isCorrectC || false} disabled={IsReview} />
            <p className='p-0 m-0'>C.</p><SmallHeading text={`${questionData?.optionC}`} />
          </div>
        </div>
      </label>
      <label>
        <div className="card p-2" onClick={() => { !IsReview && ansClick({ isCorrectD: true }) }} style={data?.isCorrectD ? { ...QASelected } : {}} >
          <div className="d-flex justify-contect-between align-items-center gap-3">
            <input type="radio" id="isCorrectD" checked={data.isCorrectD || false} disabled={IsReview} />
            <p className='p-0 m-0'>D.</p><SmallHeading text={`${questionData?.optionD}`} />
          </div>
        </div>
      </label>
    </div>
  )
}

export default observer(SingleType)
