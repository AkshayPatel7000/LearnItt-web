import QuestionStore from "../../mobx/question";
import { QASelected } from "../routes/constant";

const QuestionAnswerColor = () =>{
   //  console.log("hdfhgsf",toJS(QuestionStore?.colorAnswer));
   if(QuestionStore?.colorAnswer?.isAColor){
      return QASelected 
   }
   if(QuestionStore?.colorAnswer?.isBColor){
      return QASelected
   }
   if(QuestionStore?.colorAnswer?.isCColor){
      return QASelected
   }
   if(QuestionStore?.colorAnswer?.isDColor){
      return QASelected
   }
}

export default QuestionAnswerColor;

