import { useState } from "react";
import { UpDown } from "../../../assets/icon/inputIcon";
import "./pypPage.css";

export default function PypPupSort({
    menu,
    preText,
    menuStyle,
    // onSort,
    func
}) {
    const [show, setShow] = useState(false);
    const [mainMenu, setMainMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(menu[0]);
    const setData = (data, index) => {
        if (!data.subMenu) {
            setSelectedValue(data);
            setShow(false);
            setMainMenu(false);
        } else {
            setShow(!show);
        }
        func && func(data)
    };
    return (

        <div className="dropdown">
            <div
                className="d-flex gap-2 profileDropDown align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle pointer"
                id="defaultDropdown"
                data-bs-toggle={"dropdown"}
                data-bs-auto-close="true"
                aria-expanded="false"
                style={{
                    ...menuStyle, height: "40px",
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    fontSize: "18px",
                }}
            >
                <p className="t-t m-0 fs-6">{preText}</p> <div className="fs-6" >
                    {selectedValue?.title}
                </div>
                <UpDown />
            </div>
            <ul className="dropdown-menu " aria-labelledby="defaultDropdown" >
                {menu?.map((data, i) => (
                    <li className="p-0 pointer" key={i}>
                        <a className="dropdown-item"
                            onClick={(e) => {
                                setData(data, i);
                                // onSort && onSort(data?.title);
                            }}
                        >
                            {data?.title}
                        </a>
                    </li>
                ))}
            </ul>
            <ul
                className={`Sdropdown-menu ${mainMenu ? "show" : "hide"}`}
                aria-labelledby="dropdownButton"
                style={{
                    backgroundColor: "white",
                    color: "rgba(0, 117, 255, 1)",
                    // minWidth: "9.5rem",
                }}
            >
                {menu?.map((data, i) => (

                    <li className="p-0 pointer" key={i}>
                        <p
                            className={`${data?.subMenu && "dropdown-toggle SsubDropDown"} Sdropdown-item Sitems mb-0`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            id={i}
                            onClick={(e) => {
                                setData(data, i);
                                // onSort && onSort(data?.title);
                            }}
                        >
                            {data?.title}
                        </p>
                    </li>
                ))}


            </ul>
        </div >
    );
}