import React from 'react'

export default function Legend({ color, text, border, width, padding, height, borderRadius }) {
    return (
        <div className="d-flex gap-2 align-items-center" style={{ fontWeight: 600, fontSize: "12px" }}>
            <div style={{ padding: padding, width: width, height: height, background: color, borderRadius: borderRadius, border: border }}></div>
            {text}
        </div>
    )
}
