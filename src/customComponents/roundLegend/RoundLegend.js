import React from 'react'

export default function RoundLegend({ color, text, border, width, height,borderRadius }) {
    return (
        <div className="d-flex gap-2 align-items-center" style={{ fontWeight: 600, fontSize: "12px" }}>
            <div style={{ padding: "8px 6px", width: width, height: height, background: color, borderRadius: borderRadius, border: border }}></div>
            {text}
        </div>
    )
}
