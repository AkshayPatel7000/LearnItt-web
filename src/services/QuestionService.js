import { toast } from "react-toastify";
import { axiosInstance } from "../config/https";
import AuthStore from "../mobx/auth";
import { ApiPath } from "../utils/routes/constant";
import QuestionStore from "../mobx/question";

class Question {
  getQuestionPanel = async (payload) => {
    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.getQuestionPanel}`, payload);
      if (resp?.data.isSuccess) {
        AuthStore.setLoading(false);
        QuestionStore?.setUserQuestion(resp?.data?.data);
        if (resp?.data?.data?.remainingDuration !== "00:00:00") {
          QuestionStore?.setTimeDuration(resp?.data?.data?.remainingDuration);
        } else {
          QuestionStore?.setTimeDuration(resp?.data?.data?.timeDuration);
        }
        QuestionStore?.setCorrectAnswer(resp?.data?.data?.isShowCorrectAnswer);
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on getQuestion --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };

  saveStudentAnswer = async (payload) => {
    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.saveStudentAnswer}`, payload);
      if (resp?.data.isSuccess) {
        AuthStore.setLoading(false);
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on getQuestion --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };

  getAllAnswers = async (payload) => {
    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.getstudentanswers}`, payload);
      if (resp?.data.isSuccess) {
        AuthStore.setLoading(false);
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on getAllAnswers --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };

  getReviewAnswer = async (payload) => {
    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.getReviewAnswer}`, payload);
      if (resp?.data.isSuccess) {
        AuthStore.setLoading(false);
        // QuestionStore?.setreviewAns(resp?.data?.data)
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on getAllAnswers --> ", error);
      AuthStore.setLoading(false);
      // toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };

  markAsSeen = async (payload) => {
    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.markAsSeen}`, payload);
      if (resp?.data.isSuccess) {
        AuthStore.setLoading(false);
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on markAsSeen --> ", error);
      AuthStore.setLoading(false);
      // toast.error(error?.response?.data?.data[0]?.message)
      //throw new Error(error);
    }
  };

  removeAns = async (payload) => {
    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.removeAnswer}`, payload);
      if (resp?.data.isSuccess) {
        AuthStore.setLoading(false);
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on markAsSeen --> ", error);
      AuthStore.setLoading(false);
      // toast.error(error?.response?.data?.data[0]?.message)
      throw new Error(error);
    }
  };

  resumeMocktest = async (payload) => {
    try {
      AuthStore.setLoading(true);
      const resp = await axiosInstance.post(`${ApiPath?.resumeMocktest}`, payload);
      if (resp?.data.isSuccess) {
        AuthStore.setLoading(false);
        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    }
    catch (error) {
      console.log("Error on markAsSeen --> ", error);
      AuthStore.setLoading(false);
      // toast.error(error?.response?.data?.data[0]?.message)
      //throw new Error(error);
    }
  };

  getMockTestSolution = async (payload) => {
    AuthStore.setLoading(true);
    const mockSolutionData = await axiosInstance.post(
      `${ApiPath?.mockTestSolution}`,
      payload
    );

    if (
      mockSolutionData?.data.isSuccess &&
      mockSolutionData?.data.responseCode === 200
    ) {
      AuthStore.setLoading(false);
      return mockSolutionData?.data;
    } else {
      AuthStore.setLoading(false);
      return mockSolutionData?.data;
    }
  };
}


const QuestionService = new Question();
export default QuestionService;
