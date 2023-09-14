import { useState } from "react";
import { UpDown } from "../../../assets/icon/inputIcon";
import "./video.css";

export default function VideoMultiLevelDropDown({
    menu,
    preText,
    menuStyle,
    // onSort,
    onClick
}) {
    const [show, setShow] = useState(false);
    const [mainMenu, setMainMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(menu[0]);
    return (

        <div className="dropdown" onClick={onClick}>
            <div
                className="btn sortByBack  rounded-1  SmultiLevelDD"
                type="button"
                id="dropdownButton"
                style={{ ...menuStyle, height: "40px"}}
            >
                <div>

                <p className="t-t" >{preText}</p>&nbsp;
                </div>
                {/* {selectedValue?.title} */}
                <div>

                <UpDown />
                </div>
            </div>
        </div>
    );
}