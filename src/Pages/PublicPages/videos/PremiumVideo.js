import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartIcon, WhitePlayIcon } from '../../../assets/icon/inputIcon';
import { NormalTileHeading, ResultTitleHeading, VideoMidTitleHeading } from '../../../customComponents/DynamicText/Heading';
import { RobotoPrivacyHeading, VideoPriceHeading, VideoPriceText } from '../../../customComponents/Header/cardheader';
import CustomButton from '../../../customComponents/button/customButton';
import { HeadTitle } from '../../../customComponents/headTitle/headTitle';
import EbookData from '../../../services/ebookSevice';
import VideoData from '../../../services/videoService';
import { ThemeColors } from '../../../theme/theme';
import { commonPayload } from '../../../utils/payloadHanlder';
import { RouteConstant } from '../../../utils/routes/constant';

const PremiumVideo = () => {
    const location = useLocation();
    const [videoInfo, setVideoInfo] = useState({});
    const [isPlay, setIsPlay] = useState(false);
    const videoId = location.state;
    const navigate = useNavigate()
    /* eslint-disable */

    useEffect(() => {
        getVideoInfoById();
    }, [videoId]);
    const getVideoInfoById = async () => {
        let post = { id: videoId, };
        const res = await VideoData.getVideoById(post);
        if (res?.isSuccess) {
            setVideoInfo(res?.data);
            handleIsCart(res?.data)
        }
    };
    const playVideo = () => {
        if ((videoInfo.price === 0 || videoInfo.isPurchased)) {
            setIsPlay(!isPlay);
        }
    }

    const handleIsCart = async (data) => {
        const resp = await EbookData.getAllCartItems()
        let video = resp?.showMyCart?.find(cartItem => cartItem?.productId === data?.videoId)
        setVideoInfo({ ...data, isAddedToCart: video ? true : false });
    }
    const handleCart = async (video) => {
        const res = video?.isAddedToCart ? navigate(RouteConstant.cart) : await EbookData?.addToCart(commonPayload.call(video, 3))
        if (res) {
            handleIsCart(video)
        }
    }
    return (
        <>
            <div>
                <HeadTitle text="Video" />
                <div className={(videoInfo.price === 0 || videoInfo.isPurchased) ? 'imageFreeVideo mt-3' : 'imagePremiumVideo mt-3'} onClick={() => playVideo()}>
                    {isPlay ?
                        <video
                            className="VideoInput_video"
                            controls
                            src={videoInfo?.videoURL}
                            autoPlay={true}
                            width="100%"
                            height="100%"
                            playsInline={true}
                            loop={false}
                            style={{ maxHeight: "500px", objectFit: "fill" }}
                            controlsList="nodownload"
                        /> : <img style={{ maxHeight: "360px" }} alt="thumb" className={(videoInfo.price === 0 || videoInfo.isPurchased) ? 'imageFree' : 'imagePremium'} src={videoInfo?.videoThumbnail} />}

                    {(videoInfo.price === 0 || videoInfo.isPurchased) ? (<>{!isPlay && <div className='playIconFreeVideo' >
                        <WhitePlayIcon width={20} height={20} />
                    </div>}</>) : <CustomButton
                        title="Premium Video"
                        background={ThemeColors?.inProgress}
                        style={{ padding: "20px 40px", position: "absolute", borderRadius: "10px" }}
                        width="203px"
                    />}
                </div>
                <div className='mt-3'>
                    <ResultTitleHeading text={videoInfo?.videoTitle} />
                </div>
                <div className="mt-3">
                    <NormalTileHeading text={videoInfo?.topic} />
                </div>
                <div className='row g-10 align-items-start'>
                    <div className="columnCard">
                        <VideoPriceText text={videoInfo?.price === 0 ? "Free" : videoInfo?.price} />
                        <VideoPriceHeading text="PRICE" />
                    </div>
                    <div className="columnCard">
                        <VideoMidTitleHeading text={videoInfo?.facultyName} />
                        <VideoPriceHeading text="FACULTY" />
                    </div>
                    <div className="columnCard">
                        <VideoMidTitleHeading text={videoInfo?.language} />
                        <VideoPriceHeading text="LANGUAGE" />
                    </div>
                </div>
                <div className="m-4">
                    <RobotoPrivacyHeading text="Description" />
                    <div className='decriptionText'>
                        {videoInfo?.description}
                    </div>
                </div>
            </div>
            {!(videoInfo.price === 0 || videoInfo.isPurchased) &&
                <CustomButton
                    // title="Add To Cart"
                    background={ThemeColors?.inProgress}
                    style={{ fontSize: '12px' }}
                    width="193px"
                    icon={<CartIcon />}
                    title={videoInfo?.isAddedToCart ? "View Cart" : "Add To Cart"}
                    func={() => handleCart(videoInfo)}
                />}

        </>
    )
}

export default observer(PremiumVideo)