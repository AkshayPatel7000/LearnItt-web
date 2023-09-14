import { useState } from "react";
import "./ebook.css";
import { ThemeColors } from "../../../theme/theme";
import { useEffect } from "react";
import EbookStore from "../../../mobx/ebook";

export default function EbookDropdow({ menu, placeholder, check, width, reset, background = ThemeColors.white }) {
    const style = {
        background: background,

    }
    const [selectedValue, setSelectedValue] = useState('');

    const setData = (data) => {
        if (placeholder === "Language") {
            check(placeholder, data?.value)
        } else if (placeholder === "Status") {
            check(placeholder, data?.value)
        } else if (placeholder === "Pricing") {
            check(placeholder, data?.value)
        }
        setSelectedValue(data);
    };
    useEffect(() => {
        if (reset) {
            setSelectedValue("");
        }
    }, [reset])

    return (
        <div className="dropdown">
            <button
                className="btn dropdown-toggle ebookcustom-toggl selectTopic "
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
                            EbookStore.setTopic(data)

                        }}
                    >
                        <p className="dropdown-item m-0">
                            {data?.topicName}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}