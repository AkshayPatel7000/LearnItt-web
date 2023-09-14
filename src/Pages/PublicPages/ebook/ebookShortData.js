import React, { useRef } from 'react'
import "./ebook.css";

import { sortEnum } from '../../../utils/routes/constant';
import { useOnClickOutside } from '../videos/useOutsideClick';
const EbookSort = ({ show, setPriceSortId, setShow }) => {
    const dropdownRef = useRef(null);
    useOnClickOutside(dropdownRef, () => setShow(false));

    const onClickable = (data) => {
        setPriceSortId(data);
        setShow(!show);
        
    }
    // console.log("sortEnum=>", sortEnum)
    return (
        <div ref={dropdownRef} style={{ width: "100%" }}>
            <div className="popUp">
                {sortEnum.map((item) => {
                    return (
                        <p onClick={() => onClickable(item.id)}>{item.title}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default EbookSort;