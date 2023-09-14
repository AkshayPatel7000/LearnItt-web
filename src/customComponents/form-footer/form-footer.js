import React from 'react'
import { ThemeColors } from '../../theme/theme'

export default function FormFooter(props) {
    const { leftText,  rightText, rightClick } = props
    const rightTxt = {
        color: ThemeColors.primary,
        textDecoration: 'underline',
        fontSize: 'large',
        fontFamily: 'SemiBold',
        fontWeight: '600'
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <p className="pointer" style={{ fontSize: 'large', color: ThemeColors.other }}>{leftText}</p>
            <p style={rightTxt} className="pointer" onClick={() => rightClick()}>{rightText}</p>
        </div>
    )
}
