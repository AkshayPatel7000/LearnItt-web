import { MathJax, MathJaxContext } from "better-react-mathjax";
import React from "react";
import styled from "styled-components";
import "../../App.css";
import { ThemeColors } from "../../theme/theme";
import WindowSize from "../../utils/hooks/windowSize";

export function SmallHeading(props) {
  const { text } = props;
  const StyledText = {
    margin: "0",
    fontSize: ThemeColors.font.SmallHeading.fontSize,
    fonteight: ThemeColors.font.SmallHeading.fontWeight,
  };

  return (
    <MathJaxContext>
      <MathJax>
        <span
          className="queSpan"
          style={StyledText}
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      </MathJax>
    </MathJaxContext>
  );
}
export function SmallText(props) {
  const { text, color } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.smallText.fontSize};
    font-weight: ${ThemeColors.font.smallText.fontWeight};
    color: ${color || ThemeColors.font.smallText.color};
  `;
  return <StyledText>{text}</StyledText>;
}
export function categoryHeading(props) {
  const { text, color } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.categoryHeading.fontSize};
    font-weight: ${ThemeColors.font.categoryHeading.fontWeight};
    color: ${color || ThemeColors.font.categoryHeading.color};
  `;
  return <StyledText>{text}</StyledText>;
}
export function NormalHeading(props) {
  const { text, color } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.NormalHeading.fontSize};
    font-weight: ${ThemeColors.font.NormalHeading.fontWeight};
    font-family: ${ThemeColors.font.NormalHeading.fontFamily};
    color: ${color || ThemeColors.black};
  `;
  return <StyledText>{text}</StyledText>;
}

export function Heading(props) {
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.Heading.fontSize};
    font-weight: ${ThemeColors.font.Heading.fontWeight};
    color: ${ThemeColors.black};
    padding: ${props.padding};
  `;
  return <StyledText>{text}</StyledText>;
}
export function CorrectHeading(props) {
  const { text } = props;
  // position: absolute;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.CorrectHeading.fontSize};
    font-weight: ${ThemeColors.font.CorrectHeading.fontWeight};
    color: "#787f86";
    padding: ${props.padding};
  `;
  return <StyledText>{text}</StyledText>;
}
export function SubHeading(props) {
  const { width } = WindowSize();
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${({ width1 }) =>
      width1 <= 800 ? "16px" : ThemeColors.font.subHeading.fontSize};
    font-weight: ${ThemeColors.font.subHeading.fontWeight};
    font-family: "Medium";
    color: ${ThemeColors.black};
  `;
  return <StyledText width1={width}>{text}</StyledText>;
}

export function BoldHeading(props) {
  const { text } = props;
  const StyledText = styled.p`
    margin: 0px 0px 0px 0px;
    font-size: ${ThemeColors.font.boldHeading.fontSize};
    font-weight: ${ThemeColors.font.boldHeading.fontWeight};
    color: ${ThemeColors.font.boldHeading.color};
    font-family: ${ThemeColors.font.boldHeading.fontFamily};
  `;
  return <StyledText>{text}</StyledText>;
}

export function TitleHeading(props) {
  const { text } = props;

  const StyledText = styled.p`
    margin: 0px 0px 0px 0px;
    font-size: calc(10px + 1vmin);
    font-weight: ${ThemeColors.font.TitleHeading.fontWeight};
    color: ${ThemeColors.font.TitleHeading.color};
    font-family: ${ThemeColors.font.TitleHeading.fontFamily};
    @media (max-width: 800px) {
      display: none;
    }
  `;

  return <StyledText>{text}</StyledText>;
}

export function TileHeading(props) {
  const { text, color } = props;
  const StyledText = styled.p`
    font-size: ${ThemeColors.font.tileHeading.fontSize};
    font-weight: ${ThemeColors.font.tileHeading.fontWeight};
    color: ${color || ThemeColors.font.tileHeading.color};
    margin-bottom: 0px;
  `;
  return <StyledText>{text}</StyledText>;
}
export function SmallTiHeading(props) {
  const { text, color } = props;
  const StyledText = {
    margin: "7px 0 0 0",
    fontSize: ThemeColors.font.smallTiHeading.fontSize,
    fonteight: ThemeColors.font.smallTiHeading.fontWeight,
    color: color || ThemeColors.font.smallTiHeading.color,
  };

  return (
    <MathJax>
      <p
        style={StyledText}
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    </MathJax>
  );
}

export function NormalTileHeading(props) {
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: calc(13px + 1vmin);
    font-weight: ${ThemeColors.font.NormalTitleHeading.fontWeight};
    font-style: ${ThemeColors.font.NormalTitleHeading.fontStyle};
    color: ${ThemeColors.font.NormalTitleHeading.color};
    // line-height:${ThemeColors.font.NormalTitleHeading.lineHeight};
  `;
  return <StyledText>{text}</StyledText>;
}
export function TransactionText(props) {
  const { text,className } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.transactionText.fontSize};
    font-weight: ${ThemeColors.font.transactionText.fontWeight};
    font-family: ${ThemeColors.font.transactionText.fontFamily};
    color: ${ThemeColors.font.transactionText.color};
    line-height:${ThemeColors.font.transactionText.lineHeight};
  `;
  return <StyledText className={className}>{text}</StyledText>;
}
export function TransactionTimeText(props) {
  const { text,marginn=0 } = props;
  const StyledText = styled.p`
    margin: ${marginn};
    font-size: ${ThemeColors.font.RobotgoryHeadingText.fontSize};
    font-weight: ${ThemeColors.font.RobotgoryHeadingText.fontWeight};
    font-family: ${ThemeColors.font.RobotgoryHeadingText.fontFamily};
    color: ${ThemeColors.font.RobotgoryHeadingText.color};
    line-height:${ThemeColors.font.RobotgoryHeadingText.lineHeight};
  `;
  return <StyledText>{text}</StyledText>;
}
export function TransactionAmountText(props) {
  const { text, color } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.RobotgoryHeadingText1.fontSize};
    font-weight: ${ThemeColors.font.RobotgoryHeadingText1.fontWeight};
    font-family: ${ThemeColors.font.RobotgoryHeadingText1.fontFamily};
    color: ${color};
    line-height:${ThemeColors.font.RobotgoryHeadingText1.lineHeight};
  `;
  return <StyledText>{text}</StyledText>;
}
export function MidTitleHeading(props) {
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: calc(4px + 1.9vmin);
    font-weight: ${ThemeColors.font.MidTitleHeading.fontWeight};
    font-style: ${ThemeColors.font.MidTitleHeading.fontStyle};
    color: ${ThemeColors.font.MidTitleHeading.color};
    // line-height:${ThemeColors.font.MidTitleHeading.lineHeight};
  `;
  return <StyledText>{text}</StyledText>;
}
export function VideoMidTitleHeading(props) {
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.MidTitleHeading.fontSize};
    font-weight: ${ThemeColors.font.MidTitleHeading.fontWeight};
    font-style: ${ThemeColors.font.MidTitleHeading.fontStyle};
    color: ${ThemeColors.font.MidTitleHeading.color};
    // line-height:${ThemeColors.font.MidTitleHeading.lineHeight};
  `;
  return <StyledText>{text}</StyledText>;
}


export function MidTitleWalletHeading(props) {
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size:  ${ThemeColors.font.MidTitleHeading.fontSize};
    font-weight: ${ThemeColors.font.MidTitleHeading.fontWeight};
    font-style: ${ThemeColors.font.MidTitleHeading.fontStyle};
    color: ${ThemeColors.font.MidTitleHeading.color};
    line-height:${ThemeColors.font.MidTitleHeading.lineHeight};
  `;
  return <StyledText>{text}</StyledText>;
}
export function RobotSolMediumHeading(props) {
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size:  ${ThemeColors.font.RobotSolMediumHeading.fontSize};
    font-weight: ${ThemeColors.font.RobotSolMediumHeading.fontWeight};
    font-style: ${ThemeColors.font.RobotSolMediumHeading.fontStyle};
    color: ${ThemeColors.font.RobotSolMediumHeading.color};
    line-height:${ThemeColors.font.RobotSolMediumHeading.lineHeight};
  `;
  return <StyledText > {text}</StyledText >
}
export function RobotSolMediumHeading1(props) {
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size:  ${ThemeColors.font.RobotSolMediumHeading.fontSize};
    font-weight: ${ThemeColors.font.RobotSolMediumHeading.fontWeight};
    font-style: ${ThemeColors.font.RobotSolMediumHeading.fontStyle};
    color: ${ThemeColors.font.RobotSolMediumHeading.color};
    line-height:${ThemeColors.font.RobotSolMediumHeading.lineHeight};
  `;
  return <MathJax>
    <p

      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  </MathJax>;
}
export function ResultTitleHeading(props) {
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: calc(15px + 1vmin);
    font-weight: ${ThemeColors.font.ResultTitleHeading.fontWeight};
    font-style: ${ThemeColors.font.ResultTitleHeading.fontStyle};
    color: ${ThemeColors.font.ResultTitleHeading.color};
    // line-height:${ThemeColors.font.ResultTitleHeading.lineHeight};
  `;
  return <StyledText>{text}</StyledText>;
}
export function SolutionRobotoTextHeading(props) {
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: calc(15px + 1vmin);
    
    font-size: ${ThemeColors.font.SolutionRobotoTextHeading.fontSize};
    font-weight: ${ThemeColors.font.SolutionRobotoTextHeading.fontWeight};
    font-style: ${ThemeColors.font.SolutionRobotoTextHeading.fontStyle};
    color: ${ThemeColors.font.SolutionRobotoTextHeading.color};
    // line-height:${ThemeColors.font.SolutionRobotoTextHeading.lineHeight};
  `;
  return <StyledText>{text}</StyledText>;
}
export function VideoTitleHeading(props) {
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.VideoTitleHeading.fontSize};
    font-weight: ${ThemeColors.font.VideoTitleHeading.fontWeight};
    font-style: ${ThemeColors.font.VideoTitleHeading.fontStyle};
    color: ${ThemeColors.font.VideoTitleHeading.color};
    line-height:${ThemeColors.font.VideoTitleHeading.lineHeight};
    font-family:'outfit';
  `;
  return <StyledText>{text}</StyledText>;
}
export function OverallTitleHeading(props) {
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: 14px;
    font-weight: ${ThemeColors.font.OverallTitleHeading.fontWeight};
    font-style: ${ThemeColors.font.OverallTitleHeading.fontStyle};
    color: ${ThemeColors.font.OverallTitleHeading.color};
    // line-height:${ThemeColors.font.OverallTitleHeading.lineHeight};
  `;
  return <StyledText>{text}</StyledText>;
}

export function CardSubHeading(props) {
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.cardSubHeading.fontSize};
    font-weight: ${ThemeColors.font.cardSubHeading.fontWeight};
    color: ${ThemeColors.black};
  `;
  return <StyledText>{text}</StyledText>;
}
export function CardWalletHeading(props) {
  const { text, color } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.cardWalletHeading.fontSize};
    font-weight: ${ThemeColors.font.cardWalletHeading.fontWeight};
    color: ${color};
  `;
  return <StyledText>{text}</StyledText>;
}
export function AddMoneyWalletHeading(props) {
  const { text, color } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.addMoneyWalletHeading.fontSize};
    font-weight: ${ThemeColors.font.addMoneyWalletHeading.fontWeight};
    font-styele: ${ThemeColors.font.addMoneyWalletHeading.fontStyle};
    color: ${color};
    text-align: center;
  `;
  return <StyledText>{text}</StyledText>;
}
export function Heading14600(props) {
  const { text, color } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.Heading14600.fontSize};
    font-weight: ${ThemeColors.font.Heading14600.fontWeight};
    color: ${color || ThemeColors.black};
  `;
  return <StyledText>{text}</StyledText>;
}
export function Heading12500(props) {
  const { text, color } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.Heading12500.fontSize};
    font-weight: ${ThemeColors.font.Heading12500.fontWeight};
    color: ${color || ThemeColors.black};
  `;
  return <StyledText>{text}</StyledText>;
}
export function Heading24500(props) {
  const { text, color } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.Heading24500.fontSize};
    font-weight: ${ThemeColors.font.Heading24500.fontWeight};
    color: ${color || ThemeColors.black};
  `;
  return <StyledText>{text}</StyledText>;
}

export function LargHeading(props) {
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: calc(30px + 1vmin);
    font-weight: ${ThemeColors.font.largHeading.fontWeight};
    font-family: ${ThemeColors.font.largHeading.fontFamily};
    font-style: ${ThemeColors.font.largHeading.fontStyle};
  `;
  return <StyledText>{text}</StyledText>;
}
export function WalletlargHeading(props) {
  const { text, color } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.walletlargHeading.fontSize};
    font-weight: ${ThemeColors.font.walletlargHeading.fontWeight};
    font-family: ${ThemeColors.font.walletlargHeading.fontFamily};
    font-style: ${ThemeColors.font.walletlargHeading.fontStyle};
    color: ${color};
  `;
  return <StyledText>{text}</StyledText>;
}
export function XLargHeading(props) {
  const { width } = WindowSize();
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: calc(12px + 3vmin);
    font-weight: ${ThemeColors.font.xLargHeading.fontWeight};
    font-family: ${ThemeColors.font.xLargHeading.fontFamily};
  `;
  return <StyledText width1={width}>{text}</StyledText>;
}
export function MLargHeading(props) {
  const { width } = WindowSize();
  const { text } = props;
  const StyledText = styled.p`
    margin: 0;
    font-size: ${ThemeColors.font.mlargHeading.fontSize};
    font-weight: ${ThemeColors.font.mlargHeading.fontWeight};
    font-family: ${ThemeColors.font.mlargHeading.fontFamily};
    text-transform:capitalize ;
  `;
  return <StyledText width1={width}>{text}</StyledText>;
}
