import QuestionStore from "../../mobx/question";
const CurrentQuestion = (index)=>{

   QuestionStore?.setSectionTitle(QuestionStore?.selectedSecQue?.title)
  QuestionStore?.setquestionType(QuestionStore?.selectedSecQue?.mockTestQuestions[index]?.questionType)
  QuestionStore?.setQuestion(QuestionStore?.selectedSecQue?.mockTestQuestions[index]?.questionTableData?.['english'].questionText)
  QuestionStore?.setQuestionId(QuestionStore?.selectedSecQue?.mockTestQuestions[index]?.questionTableData?.['english'].id)
  QuestionStore?.setOption({
    optionA:QuestionStore?.selectedSecQue?.mockTestQuestions[index]?.questionTableData?.['english'].optionA,
    optionB:QuestionStore?.selectedSecQue?.mockTestQuestions[index]?.questionTableData?.['english'].optionB,
    optionC:QuestionStore?.selectedSecQue?.mockTestQuestions[index]?.questionTableData?.['english'].optionC,
    optionD:QuestionStore?.selectedSecQue?.mockTestQuestions[index]?.questionTableData?.['english'].optionD
})


   
}

export default  CurrentQuestion