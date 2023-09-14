import React from "react";
import { SmallText } from "../customComponents/DynamicText/Heading";
import { ThemeColors } from "../theme/theme";

export default function Footer() {
  return (
    <footer
      className="p-3 "
      style={{ background: "#F0F5FB", marginBlock: "auto 0px" }}
    >
      <SmallText
        text="Powered by Learnitt ©2023"
        color={ThemeColors.lightPurple}
      />
    </footer>
  );
}
