import React, { useEffect, useRef } from "react";
import "./index.scss";
import { StyledInput, formControlOtp } from "./indexCss";

export default function CustomInput(props) {
    const { name, placeholder, type, lefticon, righticon, label, id, value, onChange, maxLength, tabIndex, onKeyUp, onClick, inputRef, isDisabled, min, max, width = "100%", background = "#FAFAFA", height = "48px", rightIconFunc } = props;

    const ref = useRef();
    const inputStyle = {
        width: width,
        background: background,
        height: height,
        display: "block",
        padding: " 0.375rem 0.75rem",
        fontSize: "14px",
        lineHeight: "2.4rem",
        backgroundClip: "padding-box",
        borderRadius: "5px",
    }
    useEffect(() => {
        if (inputRef) {
            ref.current.focus();
        }
    }, [inputRef])
    return (
        maxLength === "1" ?
            <StyledInput className={"inputWithIcon"}>
                {lefticon && <div className="left-icon">{lefticon}</div>}
                <input ref={ref} type={type} name={name} value={value} disabled={isDisabled} placeholder={placeholder} style={formControlOtp} maxLength={maxLength} tabIndex={tabIndex} onChange={(e) => onClick(e, tabIndex)} onKeyUp={(e) => onKeyUp(e, tabIndex)} />
                {righticon && <div className="right-icon">{righticon}</div>}
            </StyledInput>
            : <>
                <div className='input-container'>
                    {lefticon && <div className='position'>{lefticon}</div>}
                    <div className="did-floating-label-content">
                        <input className="did-floating-input" type={type ? type : 'text'} id={id} onChange={onChange} name={name} placeholder={placeholder}
                            disabled={isDisabled}
                            min={min}
                            max={max}
                            value={value}
                            // style={{ ...formControl, ...inputStyle }}
                            style={lefticon ? { textIndent: "30px", ...inputStyle } : inputStyle}
                        />
                        {label && <label className="did-floating-label">{label}</label>}
                    </div>
                    {righticon && <div className="right-icon" onClick={rightIconFunc}>{righticon}</div>}
                </div>

            </>
    )
}
