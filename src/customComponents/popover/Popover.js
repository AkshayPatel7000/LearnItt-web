import React from 'react'
import "./Popover.css"
export default function Popover({ children, popover__title, style }) {
    return (
        <div className="popover__wrapper">
             {/* eslint-disable  */}
            <a>
                <div className="popover__title" style={{...style}}>{popover__title}</div>
            </a>
            <div className="popover__content p-3">
                {children}
            </div>
        </div>
    )
}
