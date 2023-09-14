import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotFoundIcon, Test1Icon, Test2Icon, Test3Icon } from '../../../assets/icon/inputIcon'
import EbookIcon from "../../../assets/images/EbookIcon.png"
import MockTestIcon from "../../../assets/images/MockTestIcon.png"
import PYPIcon from "../../../assets/images/PYPIcon.png"
import VideoIcon from "../../../assets/images/VideoIcon.png"
import img1 from "../../../assets/images/slide1.png"
import img2 from "../../../assets/images/slide2.png"
import img3 from "../../../assets/images/slide3.png"
import { MidTitleHeading } from '../../../customComponents/DynamicText/Heading'
import Carousel from '../../../customComponents/carousel/Carousel'
import AuthStore from '../../../mobx/auth'
import DashboardService from '../../../services/DashboardService'
import { HHMMSSToHM } from '../../../utils/hooks/hhmmssTohm'
import { RouteConstant } from '../../../utils/routes/constant'
import DashboardCard from './components/DashboardCard'
import ScheduleCard from './components/ScheduleCard'

export default function Dashboard() {
    const navigate = useNavigate();
    const [mockTestList, setMockTestList] = useState()
    useEffect(() => {
       
        getAllMockTest()
    }, [])
    const getAllMockTest = async () => {
        let post = {
            pageNumber: 1,
            pageSize: 3,
            instituteId: AuthStore?.user?.user?.instituteId
        }
        const res = await DashboardService.getAllMockTest(post);

        if (res?.isSuccess) {
            setMockTestList(res?.data);
        }
    }
    return (
        <div>
            <Carousel img1={img1} img2={img2} img3={img3} />
            <div className="row py-2">
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 py-2" onClick={() => navigate(RouteConstant.viewmockTest)}>
                    <DashboardCard
                        icon={MockTestIcon}
                        heading="Mock test"
                        cardText="Give your test here"
                    />
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 py-2" onClick={() => navigate(RouteConstant.ebookPage)}>
                    <DashboardCard
                        icon={EbookIcon}
                        heading="eBook"
                        cardText="View all your eBooks here"
                    />
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 py-2"   onClick={() => navigate(RouteConstant.Video)}>
                    <DashboardCard
                        icon={VideoIcon}
                        heading="Video"
                        cardText="View all the videos here"
                      
                    />
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 py-2" onClick={() => navigate(RouteConstant.PypPage)}>
                    <DashboardCard
                        icon={PYPIcon}
                        heading="Previous Year paper"
                        cardText="Check Previous Year paper"
                    />
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <MidTitleHeading text="Scheduled Test" />
                </div>
                <div className='pointer' style={{ fontSize: "14px", fontWeight: "600", color: "#4FA4F4" }} onClick={() => navigate(RouteConstant?.viewmockTest)}>See All</div>
            </div>

            <div className="row py-2">
                {mockTestList?.instituteMockTest ? mockTestList?.instituteMockTest?.map((mockTest, key) => {
                    return (
                        <div key={key} className="col-xl-4 col-lg-6 col-md-12 col-sm-6 py-2" >
                            <ScheduleCard label={`Attempt ${HHMMSSToHM(mockTest?.mockTestDuration)} test to get featured in the leaderboard.`} icon={key === 0 ? < Test1Icon /> : key === 1 ? <Test2Icon /> : <Test3Icon />} data={mockTest} />
                        </div>
                    )
                }) :
                    <div className='d-flex justify-content-center' >
                        <NotFoundIcon />
                    </div>
                }
            </div>
        </div>
    );
}
