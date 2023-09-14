import React from 'react'
import "./video.css";
import { NovideoIcon } from '../../../assets/icon/inputIcon';
import { VideoTitleHeading } from '../../../customComponents/DynamicText/Heading';
import { CategoryHeading } from '../../../customComponents/Header/cardheader';
import CustomButton from '../../../customComponents/button/customButton';
import { RouteConstant } from '../../../utils/routes/constant';
import { useNavigate } from 'react-router-dom';

const Novideo = () => {
    const navigate = useNavigate();
    return (
        <div className='NoVideoMain'>
            <div className='NoVideoIcon'>
                <NovideoIcon />

            </div>
            <div className='mt-3 text-center'>
                <VideoTitleHeading text="No Video Available" />
                <div className='mt-2' style={{maxWidth:"360px"}}>
                    <CategoryHeading text="We're sorry, but it looks like there are no videos available to watch at this time." />
                </div>
                <div className='mt-3 d-flex align-items-center justify-content-center'>
                    <CustomButton
                        title="Go Home"
                        width="168px"
                        height="52px"
                        func={()=>navigate(RouteConstant.home)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Novideo