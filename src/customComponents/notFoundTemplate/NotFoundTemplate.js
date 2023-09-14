import React from 'react'
import { CardHeading, CategoryHeading } from '../Header/cardheader'
import CustomButton from '../button/customButton'
import { RouteConstant } from '../../utils/routes/constant'
import { useNavigate } from 'react-router-dom';

export default function NotFoundTemplate({ icon, line1, line2, cardStyle, title, width = "168px", height = "52px", }) {
    const navigate = useNavigate();

    return (
        <div className="card p-5 border-0 " style={{ ...cardStyle }}>
            <div className='row gap-3 justify-content-center align-items-center text-center'>
                {icon}
                <CardHeading text={line1} />
                <CategoryHeading text={line2} color={"#787F86"} />
                {title &&
                    <CustomButton title={title} width={width} height={height} func={() => navigate(RouteConstant.home)} />
                }
            </div>
        </div>
    )
}
