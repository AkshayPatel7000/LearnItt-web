import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ThemeColors } from "../../theme/theme";
import "./customDropdown.css";
import { toJS } from "mobx";
import StudentStore from "../../mobx/student";

const CustomDropdown = ({
  menu,
  placeholder,
  check,
  reset,
  background = ThemeColors.white,
  selectedValues,
  func,
  customStyle,
}) => {
  const style = {
    background: background,
    ...customStyle
  };
  const [selectedValue, setSelectedValue] = useState("");

  const setData = (data) => {
    if (placeholder === "Language") {
      StudentStore?.setfilterData({ languageFilter: data?.value });
    } else if (placeholder === "Status") {
      StudentStore?.setfilterData({ statusFilter: data?.value });
    } else if (placeholder === "Pricing") {
      StudentStore?.setfilterData({ pricingFilter: data?.value });
    }
    setSelectedValue(data);
    func && func(data) 
  };

  useEffect(() => {
    if (selectedValues) {
      setSelectedValue(selectedValues);
    } else {
      setSelectedValue("");
    }
  }, []);

  

  return (
    <div className="dropdown">
      <button
        className={selectedValues ? "btn dropdown-toggle custom-toggle1" : "btn dropdown-toggle custom-toggle"}
        id="dropdownButton"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        // data-bs-auto-close="outside"
        style={{ ...style, color: selectedValues ? '#4fa4f4 !important' : '#787f86 !important' }}
      >
        <p className="d-flex justigy-content-left pe-4">
          {selectedValue?.text  ? selectedValue?.text : placeholder}
        </p>
      </button>
      <ul
        className="dropdown-menu dropdown-custom"
        aria-labelledby="dropdownButton"
      >
        {menu?.map((data, i) => (
          <li
            key={i}
            className={data?.text === selectedValue.text ? "selected" : ""}
            onClick={(e) => {
              setData(data);
              check(data)
            }}
          >
            <p className="dropdown-item m-0">{data?.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default observer(CustomDropdown)