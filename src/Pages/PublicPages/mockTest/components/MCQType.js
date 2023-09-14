import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import React from 'react'
import Checkbox from '../../../../customComponents/checkbox/Checkbox'
import { SmallHeading } from '../../../../customComponents/DynamicText/Heading'
import QuestionStore from '../../../../mobx/question'

const MCQType = ({ IsReview, data }) => {
    const questionData = data.questionTableData[QuestionStore?.langSelected]
    const ansClick = (data, checked) => {
        QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].studentAns = true
        let tempUserQ = toJS(QuestionStore?.userQuestion)
        let que = tempUserQ?.mocktestPanelList[QuestionStore.subjectIndex]?.subjectwiseSection[QuestionStore.sectionIndex]?.mockTestQuestions[QuestionStore?.questionIndex]
        tempUserQ.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex] = { ...que, ...data }
        QuestionStore.setUserQuestion(tempUserQ)
        if (!checked) {
            let temp = QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex]
            if (!(temp.isCorrectA || temp.isCorrectB || temp.isCorrectC || temp.isCorrectD)) {
                QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].studentAns = false
            }
        }
    }
    return (
        <div className='d-grid gap-2 mt-2'>
            <label >
                <div className="card mt-2 gap-2 mt-2 mcqType">
                    <Checkbox id="isCorrectA" handleClick={(e) => { !IsReview && ansClick({ isCorrectA: e.target.checked }, e.target.checked) }} isChecked={data.isCorrectA} isDisabled={IsReview} />
                    <SmallHeading text={`${questionData?.optionA}`} />
                </div>
            </label>
            <label>
                <div className="card gap-2 mcqType" >
                    <Checkbox id="isCorrectB" handleClick={(e) => { !IsReview && ansClick({ isCorrectB: e.target.checked }, e.target.checked) }} isChecked={data.isCorrectB} isDisabled={IsReview} />
                    <SmallHeading text={`${questionData?.optionB}`} />
                </div>
            </label>
            <label>
                <div className="card gap-2 mcqType" >
                    <Checkbox id="isCorrectC" handleClick={(e) => { !IsReview && ansClick({ isCorrectC: e.target.checked }, e.target.checked) }} isChecked={data.isCorrectC} isDisabled={IsReview} />
                    <SmallHeading text={`${questionData?.optionC}`} />
                </div>
            </label>
            <label>
                <div className="card gap-2 mcqType" >
                    <Checkbox id="isCorrectD" handleClick={(e) => { !IsReview && ansClick({ isCorrectD: e.target.checked }, e.target.checked) }} isChecked={data.isCorrectD} isDisabled={IsReview} />
                    <SmallHeading text={`${questionData?.optionD}`} />
                </div>
            </label>
        </div>
    )
}
export default observer(MCQType)