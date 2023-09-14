import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import CustomInput from '../../../../customComponents/customTextInput'
import QuestionStore from '../../../../mobx/question'
import { ThemeColors } from '../../../../theme/theme'
import { toJS } from 'mobx'

const IntegerType = ({ data, IsReview }) => {
    useEffect(() => {
        QuestionStore.setIntegerTypeValue(data.studentAnswer)
    }, [data])
    const integerValue = (value) => {
        QuestionStore.setIntegerTypeValue(value)
        QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].studentAnswer = value;
        if (value !== "") {
            QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].studentAns = true
        } else {
            QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex].studentAns = false
        }
    }

    return (
        <div className='d-grid gap-2 mt-3' >
            <label style={{ fontSize: "14", fontWeight: 500 }}>Write Your Answer</label>
            <CustomInput placeholder='Type..' background={ThemeColors?.white} height="43px" value={QuestionStore.integerTypeValue || ""} onChange={(e) => { !IsReview && integerValue(e.target.value) }} disabled={IsReview} />
        </div>
    )
}

export default observer(IntegerType)
