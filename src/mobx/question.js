import { makeAutoObservable } from "mobx";

class Question {
  userAnswer = [];
  userQuestion = [];
  questionType = "";
  Question = "";
  Options = {};
  index = "";
  isLoading = false;
  menu = [];
  sectionTitle = ""
  selectedSecQue = {};
  selectedSec = {};
  QuestionId = "";
  timeDuration = "";
  reviewAns = {};
  saveDisable = true;
  colorAnswer = {
    isAColor: false,
    isBColor: false,
    isCColor: false,
    isDColor: false
  }
  subMenu = "";
  subjectIndex = 0;
  sectionIndex = 0;
  questionIndex = 0;
  CorrectAnswer = false;
  currentQue = 0;
  optSet = {
    isCorrectA: false,
    isCorrectB: false,
    isCorrectC: false,
    isCorrectD: false,
  }
  integerTypeValue = "";
  langSelected = "english";
  languageArr = [];
  remainingDuration = "";
  constructor() {
    makeAutoObservable(this);
  }

  setUserAnswer = (data) => {
    this.userAnswer = data;
  };
  setUserQuestion = (data) => {
    this.userQuestion = data;
  };

  setQuestion = (data) => {
    this.Question = data;
  };
  setQuestionId = (data) => {
    this.QuestionId = data;
  };
  setOption = (data) => {
    this.Options = data;
  };
  setquestionType = (data) => {
    this.questionType = data;
  };

  setMenu = (data) => {
    this.menu = data;
  };

  setIndex = (data) => {
    this.index = data;
  };
  setSectionTitle = (data) => {
    this.sectionTitle = data;
  };
  setSelectedQuestion = (data) => {
    this.selectedSecQue = data;
  };
  selectedSection = (data) => {
    this.selectedSec = data;
  };
  setTimeDuration = (data) => {
    this.timeDuration = data;
  };
  setCorrectAnswer = (data) => {
    this.CorrectAnswer = data;
    //  console.log("11" ,toJS(this.CorrectAnswer));
  };

  setreviewAns = (data) => {
    this.reviewAns = data
  }
  setSubMenu = (data) => {
    this.subMenu = data
  }
  setColor = (data) => {
    this.colorAnswer = data;
  }
  setsaveDisable = (data) => {
    this.saveDisable = data;
  }

  setSubjectIndex = (data) => { this.subjectIndex = data; }
  setSectionIndex = (data) => { this.sectionIndex = data; }
  setQuestionIndex = (data) => { this.questionIndex = data; }
  setCurrentQue = (data) => { this.currentQue = data; }
  setIntegerTypeValue = (data) => { this.integerTypeValue = data; }
  setLangSelected = (data) => { this.langSelected = data; }
  setLanguageArr = (data) => { this.languageArr = data; }
  setRemainingDuration= (data) => { this.remainingDuration = data; }
}
const QuestionStore = new Question();
export default QuestionStore;
