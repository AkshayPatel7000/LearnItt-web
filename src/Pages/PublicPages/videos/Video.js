import React, { useEffect, useState } from 'react';
import { NovideoIcon } from '../../../assets/icon/inputIcon';
import { HeadTitle } from '../../../customComponents/headTitle/headTitle';
import NotFoundTemplate from '../../../customComponents/notFoundTemplate/NotFoundTemplate';
import Pagination from '../../../customComponents/pagination/Pagination';
import AuthStore from '../../../mobx/auth';
import MockTestData from '../../../services/MockTestService';
import EbookData from '../../../services/ebookSevice';
import VideoData from '../../../services/videoService';
import PypPupSort from '../pyp/pypShortBy';
import VideoCard from './VideoCard';
import VideoFilter from './VideoFilter';
import "./video.css";


export const dropDown = [
    { title: "Latest Added", id: 0 },
    { title: "Price - high to low", id: 1 },
    { title: "Price - low to high", id: 2 },
];
const myStyle = {
    backgroundColor: "white",
    display: "flex",
    height: "46px",
    border: "1px solid #4FA4F4 !important",
};
const cardStyle = {
    display: "flex",
    width: "100%",
    height: "70vh",
    justifyContent: "center"
}
const Video = () => {
    const [subjectsList, setSubjectsList] = useState();
    const [currentTab, setCurrentTab] = useState();
    const [apply, setApply] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(0);
    const [videoData, setVideoData] = useState([]);
    const [priceId, setPriceId] = useState(0);
    const [priceSortId, setPriceSortId] = useState(0);
    const [pageNoSize, setPageNoSize] = useState({ no: 1, size: 10 });
    const [videoPriceList, setVideoPriceList] = useState([]);
    const [totalVideoRecords, setTotalVideoRecords] = useState(0);
    const [show, setShow] = useState(false);
    /* eslint-disable */

    useEffect(() => {
        subjectList();
        getAllPrice();
    }, []);

    const subjectList = async () => {
        let post = {
            instituteId: AuthStore?.user?.user?.instituteId,
            subcourseId: AuthStore?.user?.user?.subcourseId,
        };
        const res = await VideoData.getAllVideoSubject(post);
        if (res?.isSuccess) {
            setSubjectsList(res?.data?.videoSubjects);
            var Id = res?.data?.videoSubjects[0].subjectId;
            setCurrentTab(Id);
            VideoList(Id);
        }
    };

    const getAllPrice = async () => {
        const resPrice = await MockTestData?.mocktestPrice();
        let resPriceData = resPrice?.map((elm) => {
            return {
                value: elm?.value,
                text: elm?.name,
            };
        });
        setVideoPriceList(resPriceData);
    };

    useEffect(() => {
        if (currentTab) {
            VideoList();
        }
    }, [currentTab, apply, priceSortId])

    const VideoList = async (no = 1, size = 10) => {
        let post = {
            instituteId: AuthStore?.user?.user?.instituteId,
            subcourseId: AuthStore?.user?.user?.subcourseId,
            subjectId: currentTab,
            languageFilter: currentLanguage ? currentLanguage : 0,
            priceWiseSort: priceSortId ? priceSortId : 0,
            pricingFilter: priceId ? priceId : 0,
            pageNumber: no,
            pageSize: size
        };
        const res = await VideoData.getAllVideoList(post);
        const resp = await EbookData.getAllCartItems()
        if (res?.isSuccess && resp) {
            setTotalVideoRecords(res?.data?.totalRecords);
            let modifiedVideoList = res?.data?.studentVideoDatas.map((item, index) => {
                return { ...item, isAddedToCart: resp?.showMyCart?.find(cartItem => cartItem?.productId === item?.videoId) ? true : false }
            })
            setVideoData(modifiedVideoList);
        } else {
            setVideoData([]);
        }
    }
    const updateVideoList = async () => {
        const resp = await EbookData.getAllCartItems()
        let modifiedVideoList = videoData.map((item, index) => {
            return { ...item, isAddedToCart: resp?.showMyCart?.find(cartItem => cartItem?.productId === item?.videoId) ? true : false }
        })
        setVideoData(modifiedVideoList);
    }

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    };

    const handleSort = (data) => {
        setPriceSortId(data?.id);
        setShow(!show);
    }
    return (
        <div style={{marginBlockEnd:"138px"}}>
            <HeadTitle text="Video" />
            <div className="d-flex my-3 flex-wrap gap-2">
                <div className="videoTab">
                    {subjectsList?.map((tab, i) => (
                        <button
                            key={i}
                            id={tab.subjectId}
                            disabled={currentTab === `${tab.subjectId}`}
                            onClick={handleTabClick}
                            className={currentTab === tab.subjectId ? "tab-h selected" : "tab-h"}
                        >
                            {tab.subjectName}
                        </button>
                    ))}
                </div>
                <div style={{ marginInline: "auto 10px" }} className=""  >
                    <div className="d-flex gap-2 fill-drop" style={{ float: 'right' }}>
                        <div>
                        <PypPupSort
                                menu={dropDown}
                                preText="Sort By :"
                                menuStyle={myStyle}
                                func={handleSort}
                            />
                            {/* <VideoMultiLevelDropDown
                                menu={dropDown}
                                preText="Sort By"
                                menuStyle={myStyle}
                                onClick={() => setShow(!show)}
                            />
                            {show && <VideoSort show={show} setPriceSortId={setPriceSortId} setShow={setShow} />} */}
                        </div>
                        <div className=" gap-2 sort">
                            <VideoFilter setApply={setApply} apply={apply} priceId={priceId} videoPriceList={videoPriceList} setPriceId={setPriceId} currentTab={currentTab} setCurrentLanguage={setCurrentLanguage} currentLanguage={currentLanguage} />
                        </div>
                    </div>
                </div>
            </div>
            {videoData.length > 0 ?
                (<>
                    <div className="row mb-2" >
                        {videoData?.map((item, i) => {
                            return (
                                <div key={i} className="col-md-12 col-lg-6 col-xs-12 py-2" >
                                    <VideoCard videoData={item} subjectList={updateVideoList} />
                                </div>
                            )
                        })}

                    </div>
                    <Pagination
                        totalLength={totalVideoRecords}
                        pageNoSize={pageNoSize}
                        setPageNoSize={setPageNoSize}
                        length={videoData?.length}
                        getFunction={VideoList}
                    />
                </>) : (
                    <>
                        <NotFoundTemplate icon={<NovideoIcon />} line1={"No video available"} line2={"We're sorry, but it looks like there are no videos available to watch at this time."} cardStyle={cardStyle} title="Go Home" />
                    </>)
            }

        </div>
    )
}

export default Video