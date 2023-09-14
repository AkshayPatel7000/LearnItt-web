import React from 'react'

export default function RadioButton({ text }) {
    return (
        <p> <input
            type="checkbox"
            className="rounded-checkbox"
            id="checkbox"
        /> <label for="checkbox">{text}</label></p>
    )
}
