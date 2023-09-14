import React from 'react'
import { ThemeColors } from '../../theme/theme'
import './CustomCard.css'
const CustomCard = ({ children }) => {
    return (
        <div className='custom-card' style={{ background: ThemeColors.white }}>
            <div className='custom-card-body'>
                {children}
            </div>
        </div>
    )
}

export default CustomCard


