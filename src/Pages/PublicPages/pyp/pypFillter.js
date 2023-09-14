import React, { useRef, useState } from "react";
import { MockFilterIcon } from "../../../assets/icon/inputIcon";
import { Heading, SmallHeading } from "../../../customComponents/DynamicText/Heading";
import { CategoryHeading } from "../../../customComponents/Header/cardheader";
import CustomButton from "../../../customComponents/button/customButton";
import { ThemeColors } from "../../../theme/theme";
import "./pypPage.css";
import { PypFiltterdatas } from "./pypoutSideClick"
import PypStore from "../../../mobx/pyp";
import { useEffect } from "react";
import { AllLanguages } from "../../../utils/routes/constant";
import PypData from "../../../services/pypService";
import CustomDropdown from "./pypDropDown";

const pricFilter = [{ id: 0, "text": "All" }, { id: 1, "text": "Free" }, { id: 2, "text": "Premium" }]
export default function PypFillter({ applyFunc, setPageNoSize }) {
    const dropdownRef = useRef(null);
    const [currentTab, setCurrentTab] = useState("0");
    const [priceTab, setPriceTab] = useState("0");
    const [isActive, setIsActive] = useState(false);
    const [yearList, setYearList] = useState([]);
    useEffect(() => {
        getYearList()
    }, [])
    const getYearList = async () => {
        let resp = await PypData.getYearList()

        if (resp.isSuccess) {
            let yearList = resp.data.years.map((elm) => {
                return {
                    text: elm,
                    id: elm
                }
            })
            setYearList(yearList)
        }
    }
    const onClick = () => setIsActive(!isActive);
    PypFiltterdatas(dropdownRef, () => { setIsActive(false); });

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
        PypStore.setfilterData({ languageFilter: JSON.parse(e.target.id) })
    };

    const handlePriceTabClick = (e) => {
        setPriceTab(e.target.id);
        PypStore.setfilterData({ pricingFilter: JSON.parse(e.target.id) })
    };
    const applyFunction = () => {
        setIsActive(false)
        applyFunc()
        setPageNoSize({no:1,size:10})
    }

    const reset = () => {
        setCurrentTab("0");
        setPriceTab("0")
        PypStore.setfilterData({
            languageFilter: JSON.parse(0),
            priceWiseSort: 0,
            pricingFilter:  JSON.parse(0),
            year:  JSON.parse(0)
        })
  
        applyFunc()
    }

    const handleSelect = (data) => {
        PypStore.setfilterData({ year: data.id, })
    }
    return (
        <div style={{ width: "100%" }}>
            <div className="popup-container ">
                <div onClick={onClick} className="popup-trigger">
                    <MockFilterIcon />
                </div>
                <div ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"} py-4 px-3 c-pop`}
                    style={{ width: "400px", zIndex: "100" }}>
                    <div className="d-flex justify-content-between align-items-center ">
                        <Heading text="Filter" />
                        <div className="pointer" onClick={() => reset()}>
                            <CategoryHeading text="Clear All" />
                        </div>
                    </div><SmallHeading text="Year" />
                    <CustomDropdown
                        height="48px"
                        width="200px"
                        customclassName="form-dropdown"
                        placeholder="Select Year"
                        menuStyle={{ border: "1px solid #E3E9EE" }}
                        background="#FAFAFA"
                        menu={yearList}
                        func={handleSelect}

                    />
                    <SmallHeading text="Price" />
                    <div className="pop-Tabcontain pt-2">
                        <div className="ebooktab1 pt-2">
                            {pricFilter.map((tab, i) => {
                                return (
                                    <button
                                        key={i}
                                        id={tab.id}
                                        disabled={priceTab === `${tab.id}`}
                                        onClick={handlePriceTabClick}
                                    >
                                        {tab.text}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <SmallHeading text="Language" />
                    <div className="pop-Tabcontain pt-2">
                        <div className="ebooktab1">
                            {AllLanguages.map((tab, i) => (
                                <button
                                    key={i}
                                    id={tab.id}
                                    disabled={currentTab === `${tab.id}`}
                                    onClick={handleTabClick}
                                >
                                    {tab.Title}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="d-flex gap-4 mt-3 align-items-center">
                        <CustomButton
                            title="Apply"
                            type="submit"
                            width="116px"
                            background={ThemeColors.black}
                            func={() => applyFunction()}
                        />
                        <CustomButton
                            width="116px"
                            title="Cancel"
                            type="submit"
                            background={ThemeColors.disable}
                            func={() => setIsActive(false)}
                        /></div>

                </div>

            </div>
        </div>
    );
}