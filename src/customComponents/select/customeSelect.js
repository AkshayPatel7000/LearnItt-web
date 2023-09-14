import React, { useState } from "react";
import styled from "styled-components";
import { ThemeColors } from "../../theme/theme";
import { InputLabel } from "../customTextInput/indexCss";


export default function CustomSelect({ label, options, leftIcon }) {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    };

    const setSelectedThenCloseDropdown = (index) => {
        setSelectedOption(index);
        setIsOptionsOpen(false);
    };
    const handleKeyDown = (index) => (e) => {
        switch (e.key) {
            case " ":
            case "SpaceBar":
            case "Enter":
                e.preventDefault();
                setSelectedThenCloseDropdown(index);
                break;
            default:
                break;
        }
    };
    const handleListKeyDown = (e) => {
        switch (e.key) {
            case "Escape":
                e.preventDefault();
                setIsOptionsOpen(false);
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedOption(
                    selectedOption - 1 >= 0 ? selectedOption - 1 : options?.length - 1
                );
                break;
            case "ArrowDown":
                e.preventDefault();
                setSelectedOption(
                    selectedOption === options?.length - 1 ? 0 : selectedOption + 1
                );
                break;
            default:
                break;
        }
    };

    return (

        <div className="">
            <InputLabel>{label}</InputLabel>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOptionsOpen}
                className={`selectButton ${isOptionsOpen ? "expanded" : ""}`}
                onClick={toggleOptions}
                onKeyDown={handleListKeyDown}
            >
                {leftIcon}
                <p>{options[selectedOption]}</p>
            </button>
            <ul
                className={`options ${isOptionsOpen ? "show" : ""}`}
                role="listbox"
                aria-activedescendant={options[selectedOption]}
                tabIndex={-1}
                onKeyDown={handleListKeyDown}
            >
                {options && options.map((option, index) => (
                    <LI
                        id={option}
                        role="option"
                        aria-selected={selectedOption === index}
                        tabIndex={0}
                        onKeyDown={handleKeyDown(index)}
                        onClick={() => {
                            setSelectedThenCloseDropdown(index);
                        }}
                    >
                        {option}
                    </LI>
                ))}
            </ul>
        </div>
    );
};

export const LI = styled.li`
  color: ${ThemeColors.other};
  padding: 6px 10px;
  background:#F3F3F3;
  &:hover{
        background: ${ThemeColors.light};
        cursor: pointer;
  };
  &[aria-selected="true"] {
      background: ${ThemeColors.light};
      cursor: pointer;
  }
`;