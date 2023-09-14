import React from 'react';
import './Checkbox.css'

export default function Checkbox({ id, handleClick, isChecked, isDisabled = false, value, name, className = "" }) {

    return (
         /* eslint-disable */
        <input
            id={id}
            name={name}
            type="checkbox"
            onChange={handleClick}
            checked={isChecked}
            disabled={isDisabled}
            value={value}
            className={"checkboxInput" + ' ' + className}
        />
    )
}
