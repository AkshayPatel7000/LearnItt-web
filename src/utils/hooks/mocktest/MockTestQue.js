import QuestionStore from "../../../mobx/question"

export const SetAllOptFalse = async () => {
    let temp = QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex]
    QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex] = { ...temp, ...QuestionStore.optSet, isAnswered: false }
    QuestionStore.setCurrentQue(QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex].mockTestQuestions[QuestionStore.questionIndex])
}

export const FixPayload = async () => {
    return (
        {
            mockTestId: QuestionStore?.userQuestion?.mockTestId,
            questionRefId: QuestionStore?.userQuestion?.mocktestPanelList[QuestionStore.subjectIndex]?.subjectwiseSection[QuestionStore.sectionIndex]?.mockTestQuestions[QuestionStore?.questionIndex]?.questionRefId,
            questionType: QuestionStore?.userQuestion?.mocktestPanelList[QuestionStore.subjectIndex]?.subjectwiseSection[QuestionStore.sectionIndex]?.mockTestQuestions[QuestionStore?.questionIndex]?.questionType,
            subjectId: QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectId,
            sectionId: QuestionStore.userQuestion.mocktestPanelList[QuestionStore.subjectIndex].subjectwiseSection[QuestionStore.sectionIndex]?.sectionId,
            isCorrectA: QuestionStore?.userQuestion?.mocktestPanelList[QuestionStore.subjectIndex]?.subjectwiseSection[QuestionStore.sectionIndex]?.mockTestQuestions[QuestionStore?.questionIndex].isCorrectA || false,
            isCorrectB: QuestionStore?.userQuestion?.mocktestPanelList[QuestionStore.subjectIndex]?.subjectwiseSection[QuestionStore.sectionIndex]?.mockTestQuestions[QuestionStore?.questionIndex].isCorrectB || false,
            isCorrectC: QuestionStore?.userQuestion?.mocktestPanelList[QuestionStore.subjectIndex]?.subjectwiseSection[QuestionStore.sectionIndex]?.mockTestQuestions[QuestionStore?.questionIndex].isCorrectC || false,
            isCorrectD: QuestionStore?.userQuestion?.mocktestPanelList[QuestionStore.subjectIndex]?.subjectwiseSection[QuestionStore.sectionIndex]?.mockTestQuestions[QuestionStore?.questionIndex].isCorrectD || false,
        }
    )
}

