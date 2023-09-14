import React, { useEffect, useState } from "react";
import { ProfileIcon } from "../../assets/icon/inputIcon";
import { ThemeColors } from "../../theme/theme";
import Result from "../../services/ResultService";
import { OverallTitleHeading } from "../../customComponents/DynamicText/Heading";

export default function ResultAnalysis() {

  const [rankData, setrankData] = useState("");


  useEffect(() => {
    getOverallResult();
  }, []);

  const getOverallResult = async () => {
    let res = await Result.getOverallResult();
    // console.log("res", res);
    setrankData(res);
  };

  const style = {
    flexDirection: "column",
    alignItems: "center",
    background: ThemeColors?.white,
    borderRadius: "20px",
    height: "505px",
  };

  return (
    <div className="d-flex align-items-center rounded" style={style}>
      <div className="mt-5">
        <ProfileIcon />
      </div>
      <span
        style={{
          color: ThemeColors?.primary,
          fontSize: "24px",
          fontFamily: "Outfit",
        }}
      >
        {" "}
        {rankData?.name}
      </span>
      <div className="d-flex flex-column gap-2 m-4">
        <OverallTitleHeading text={`Rank : ${rankData?.rank} `} />

        <OverallTitleHeading text={`Total Number of Mocktest :  ${rankData?.totalMockTest}`} />

        <OverallTitleHeading text={`Total Marks :  ${rankData?.totalMarks}`} />

        <OverallTitleHeading text={`Total Obtained Marks :  ${rankData?.totalObtainedMarks}`} />
        
        <OverallTitleHeading text={`Average Percentage :  ${rankData?.averagePercentage}`} />
      </div>
    </div>
  );

  
}
