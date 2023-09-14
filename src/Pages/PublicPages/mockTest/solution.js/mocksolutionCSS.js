import styled from "styled-components";
import { ThemeColors } from "../../../../theme/theme";
export const SolStyledInput = styled.div`
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



export const Solformselect = {
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
  border: " none",
}

