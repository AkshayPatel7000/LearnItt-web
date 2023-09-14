import React, { useRef } from 'react'
import "./video.css";
import { useOnClickOutside } from './useOutsideClick';
import { sortEnum } from '../../../utils/routes/constant';
const VideoSort = ({ show, setPriceSortId,setShow }) => {
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setShow(false));
  
  const onClickable = (data)=>{
    setPriceSortId(data);
    setShow(!show);
  }
  return (
    <div ref={dropdownRef} style={{ width: "100%" }}>
      <div className="popUp">
        {sortEnum.map((item)=>{
          return(
            <p onClick={()=>onClickable(item.id)}>{item.title}</p>
          )
        })}
      </div>
    </div>
  )
}

export default VideoSort;