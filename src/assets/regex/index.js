import { ThemeColors } from "../../theme/theme";

/* eslint-disable */
export const alphabetOnly = /^[a-zA-Z ]*$/;
export const singleSpace = /^\s+|\s+$|(\s)\s+/;
export const emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})/;
//  export const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
export const numberOnly = /^[0-9\b]+$/;
export const numberdecimalOnly = /^\d*\.?\d*$/;
export const mobileNumber = /^[0-9]{10}$/;
export const mobileNumberWithCode = /^[0-9]{12}$/;
export const numberGreaterThanOne = /^[1-9][0-9]*$/;
export const positiveNumber = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;
export const imageRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/;
export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]

// STYLE
export const notVisited = { background: ThemeColors.notVisited, border: `1px solid ${ThemeColors.secondaryBlack}`, color: ThemeColors.black };
export const answered = { background: ThemeColors?.completed, border: `1px solid ${ThemeColors.completed}`, color: ThemeColors.white };
export const notAnswered = { background: ThemeColors.expired, border: `1px solid ${ThemeColors.expired}`, color: ThemeColors.white };
export const currentQuestion = { background: ThemeColors.lightSkyBlue, border: `1px solid ${ThemeColors.lightBlue}`, color: ThemeColors.black };
export const mark4Review = { background: ThemeColors.lightBlue, border: `1px solid ${ThemeColors.lightBlue}`, color: ThemeColors.white };