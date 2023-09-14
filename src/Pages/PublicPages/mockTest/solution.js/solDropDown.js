import React from "react";

import "./mockSolution.css";
import { SolStyledInput, Solformselect } from "./mocksolutionCSS";



export default function SolDropdown(props) {
    const { option, label, lefticon, placeholder, setFieldValue, width, disable = false, marginBottom } = props;
    const itemSelected = (data) => {
        var parseData = JSON.parse(data);
        setFieldValue(parseData.sectionId);
    };

    return (
        <>

            <SolStyledInput className={"inputWithIcon"}>
                {lefticon && <div className="solposition">{lefticon}</div>}
                <div className="soldid-floating-label-content" style={{ marginBottom: marginBottom, width: width }}>
                    <select style={lefticon ? { textIndent: "20px", ...Solformselect } : Solformselect} className="soldid-floating-select" onChange={e => { itemSelected(e?.target?.value) }} disabled={disable} >
                        {/* <option value="" disabled selected hidden style={{ color: "#A9BECC" }}>{placeholder} </option> */}
                        {option?.map((elm) => (
                            <option className="section-field"  selected value={elm?.sectionName}>
                                {elm?.sectionName }
                            </option>
                        ))}
                    </select>
                    {label && <label className="soldid-floating-label">{label}</label>}
                </div>
            </SolStyledInput>
        </>
    );
}
