import React, { useRef, useState } from "react";
import { MockFilterIcon } from "../../../assets/icon/inputIcon";
import { Heading, SmallHeading } from "../../../customComponents/DynamicText/Heading";
import { CategoryHeading } from "../../../customComponents/Header/cardheader";
import CustomButton from "../../../customComponents/button/customButton";
import { ThemeColors } from "../../../theme/theme";
import { AllLanguages } from "../../../utils/routes/constant";
import { useOnClickOutside } from "./useOutsideClick";
import "./video.css";
/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks
 */
export default function VideoFilter({ setApply, apply, priceId, videoPriceList, setPriceId, currentTab, setCurrentLanguage, currentLanguage }) {
    const dropdownRef = useRef(null);

    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);
    useOnClickOutside(dropdownRef, () => setIsActive(false));

    const handleTabClick = (e) => {
        setCurrentLanguage(parseInt(e.target.id));
    };
    const handleTabClickPrice = (e) => {
        setPriceId(parseInt(e.target.id));
    };

    const Submit = () => {
        setApply(!apply);
    }
    const clearAll = () => {
        setCurrentLanguage(0);
        setPriceId(0);
        setApply(!apply);
    }
    return (
        <div style={{ width: "100%" }}>
            <div className="popup-container ">
                <div onClick={onClick} className="popup-trigger">
                    <MockFilterIcon />
                </div>
                <div
                    ref={dropdownRef}
                    className={`menu ${isActive ? "active" : "inactive"} py-4 px-3 c-pop`}
                    style={{ width: "400px", zIndex: "100" }}

                >
                    <div className="d-flex justify-content-between align-items-center ">
                        <Heading text="Filter" />
                        <div onClick={() => clearAll()}>
                            <CategoryHeading text="Clear All" />
                        </div>
                    </div>



                    < SmallHeading text="Price" />
                    <div className="pop-Tabcontain pt-2">
                        <div className="videoTab1">
                            {videoPriceList.map((tab, i) => {
                                return (
                                    <button
                                        key={i}
                                        id={tab.value}
                                        disabled={priceId === `${tab.value}`}
                                        onClick={handleTabClickPrice}
                                        className={priceId === tab.value ? 'selected' : ''}
                                    >
                                        {tab.text}
                                    </button>
                                )
                            })}
                        </div>
                        {/* <div className='content'>
                            {tabs.map((tab, i) =>
                                <div key={i}>
                                    {currentLanguage === `${tab.id}` && <div><p className='title'>{tab.title}</p><p>{tab.content}</p></div>}
                                </div>
                            )}
                        </div> */}
                    </div>


                    < SmallHeading text="Language" />
                    <div className="pop-Tabcontain pt-2">
                        <div className="videoTab1">
                            {AllLanguages.map((tab, i) => {
                                return (
                                    <button
                                        key={i}
                                        id={tab.id}
                                        disabled={currentLanguage === `${tab.id}`}
                                        onClick={handleTabClick}
                                        className={currentLanguage === tab.id ? 'selected' : ''}
                                    >
                                        {tab.Title}
                                    </button>
                                )
                            })}
                        </div>
                        {/* <div className='content'>
                            {tabs.map((tab, i) =>
                                <div key={i}>
                                    {currentLanguage === `${tab.id}` && <div><p className='title'>{tab.title}</p><p>{tab.content}</p></div>}
                                </div>
                            )}
                        </div> */}
                    </div>
                    <div className="d-flex gap-4 mt-3 align-items-center">
                        <CustomButton
                            title="Apply"
                            type="submit"
                            width="116px"
                            background={


                                ThemeColors.black
                            }
                            func={() => Submit()}
                        />
                        <CustomButton
                            width="116px"
                            title="Cancel"
                            type="submit"
                            func={() => setIsActive(false)}
                            background={
                                ThemeColors.disable
                            }
                        /></div>

                </div>

            </div>
        </div>
    );
}