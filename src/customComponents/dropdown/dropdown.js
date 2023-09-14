import React from "react";
import "../customTextInput/index.scss";
import { formSelect, StyledInput } from "../customTextInput/indexCss";

export default function Dropdown(props) {
  const { option, label, lefticon, placeholder, name, name1, setFieldValue, handlefunc, width, name2, disable = false, marginBottom } = props;
  const itemSelected = (data) => {
    handlefunc && handlefunc(JSON.parse(data))
    if ((name || name1 || name2) && setFieldValue) {
      setFieldValue(name, data?.Title)
      setFieldValue(name1, data?.id)
      setFieldValue(name2, data?.code)
    }
  };

  return (
    <>
      {/* <InputLabel>{label}</InputLabel> */}
      <StyledInput className={"inputWithIcon"}>
        {lefticon && <div className="position">{lefticon}</div>}
        <div className="did-floating-label-content" style={{ marginBottom: marginBottom, width: width }}>
          <select style={lefticon ? { textIndent: "20px", ...formSelect } : formSelect} className="did-floating-select" onChange={e => { itemSelected(e?.target?.value) }} disabled={disable} >
            <option value="" disabled selected hidden style={{ color: "#A9BECC" }}>{placeholder} </option>
            {option?.map((elm) => (
              <option value={JSON.stringify(elm)}>
                {elm?.Title}
              </option>
            ))}
          </select>
          {label && <label className="did-floating-label">{label}</label>}
        </div>
      </StyledInput>
    </>
  );
}
