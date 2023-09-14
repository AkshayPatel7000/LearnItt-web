import React from 'react'

import { ThemeColors } from '../../../../theme/theme'
import CardSubHeading from '../../../../customComponents/DynamicText/cardSubHeading'

export default function DashboardCard({ icon, heading, cardText }) {
    return (
        <div className="card border-0 rounded-3 p-4 pointer">
            <img src={icon} className="card-img-top" alt="..." style={{ width: "5vmax", maxWidth: "60px" }} />
            <div className="pt-3">
                <CardSubHeading text={heading} />
                <p className="card-text" style={{ color: ThemeColors.secondaryBlack }}>{cardText}</p>
            </div>
        </div>
    )
}
