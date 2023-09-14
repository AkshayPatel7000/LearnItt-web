import { useState } from "react";
import { ThemeColors } from "../../../theme/theme";
import "./pypPage.css";

export default function CustomDropdown({ menu, placeholder, width, background = ThemeColors.white, func }) {
    const style = {
        background: background,
    }
    const [selectedValue, setSelectedValue] = useState('');
    const setData = (data) => {
        setSelectedValue(data);
        func && func(data)
    };

    return (
        <div className="dropdown">
            <button
                // className="btn dropdown-toggle ebookcustom-toggl selectTopic "
                className="btn dropdown-toggle pypcustom-toggl w-100 "
                id="dropdownButton"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-auto-close="outside"
                style={{ ...style, width: { width } }}
            >
                <p className="d-flex justigy-content-left">{selectedValue?.text || placeholder} </p>
            </button>
            <ul className="dropdown-menu dropdown-custom" aria-labelledby="dropdownButton">
                {menu?.map((data, i) => (
                    <li key={i}
                        className={data?.text === selectedValue.text ? "selected" : ""}
                        onClick={(e) => {
                            setData(data);
                        }}
                    >
                        <p className="dropdown-item m-0">
                            {data?.text}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}