import styled from "styled-components";
import { ThemeColors } from "../../theme/theme";
export const StyledInput = styled.div`
  &.inputWithIcon {
    position: relative;
    // margin:10px 0 10px 0;
  }
  .left-icon {
    position: absolute;
    margin-left: 1rem;
    margin-top:1.6rem;
    transform: translateY(-50%);
  }
 .right-icon {
    position: absolute;
    right: 10px;
    margin-top:-1.3rem;
    transform: translateY(-50%);
  }
`;
export const InputLabel = styled.label`
  color: ${ThemeColors.other};
  // margin-bottom: 4rem;
  font-family:medium;
`;

export const Button = styled.button`
border: none;
border-radius: 5px;
color: white;
padding: 10px;
text-decoration: none;
font-size: 20px;
// font-family: SemiBold;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
`

export const formControl = {
  display: "block",
  padding: " 0.375rem 0.75rem",
  fontSize: "14px",
  lineHeight: "2.4rem",
  backgroundClip: "padding-box",
  borderRadius: "5px",
  background:"#FAFAFA"
}
export const formControlOtp = {
  display: 'block',
  width: '100%',
  maxWidth:"50px",
  padding: '0.375rem 0.75rem',
  fontSize: ' 1rem',
  lineHeight: ' 2.4rem',
  backgroundClip: 'padding-box',
  background: ThemeColors.inputbg,
  borderRadius: '5px',
  textAlign: 'center',
  border: "1px solid #E5ECF0",
}

export const formSelect = {
  display: 'block',
  width: '100%',
  fontSize: '1rem',
  height: '3rem',
  background: ThemeColors.inputbg,
  // paddingTop: '0.9rem',
  // paddingBottom: '0.5rem',
  // paddingLeft: '1rem',
  // textIndent: '2.5rem',
  borderRadius: '5px',
  backgroundClip: 'padding-box',
}

