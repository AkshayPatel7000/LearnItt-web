import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CartIcon,
  LanguageIcon,
  RupeeIcon,
  WhitePlayIcon,
} from "../../../assets/icon/inputIcon";
import VideoIcon from "../../../assets/images/VideoIcon.png";
import { VideoTitleHeading } from "../../../customComponents/DynamicText/Heading";
import {
  CategoryHeading,
  PriceHeading,
  PriceText,
  RobotgoryHeading,
} from "../../../customComponents/Header/cardheader";
import CustomButton from "../../../customComponents/button/customButton";
import EbookData from "../../../services/ebookSevice";
import { ThemeColors } from "../../../theme/theme";
import { commonPayload } from "../../../utils/payloadHanlder";
import { RouteConstant } from "../../../utils/routes/constant";
import "./video.css";
import moment from "moment/moment";
const VideoCard = ({ videoData, subjectList }) => {
  const {
    videoId,
    isAddedToCart,
    videoThumbnail,
    videoTitle,
    topicName,
    facultyName,
    price,
    isPurchased,
    language,
  } = videoData;
  const navigate = useNavigate();
  const handleCart = async (video) => {
    const res = video.isAddedToCart
      ? navigate(RouteConstant?.cart)
      : video?.isPurchased
      ? navigate(RouteConstant.PremiumVideo, { state: { video: video } })
      : await EbookData?.addToCart(commonPayload.call(video, 3));
    if (res) {
      subjectList && subjectList();
    }
  };

  return (
    <div className={"card precompleted pointer"} style={{ minHeight: "220px" }}>
         <div className="col purchaseDate mb-2">
     { moment.utc(videoData?.purchaseDate).local().format('MMM DD ,YYYY')}
      </div>
      <div
        className="d-flex gap-4 "
        onClick={() => navigate(RouteConstant.PremiumVideo, { state: videoId })}
      >
        
        <div className="thumbnail d-flex justify-content-center align-items-center">
       
          <div className="playIcon">
            <WhitePlayIcon />
          </div>
          <img
            className="videoThumnail"
            alt="thumb"
            width={"120px"}
            height={"120px"}
            src={videoThumbnail || VideoIcon}
          />
        </div>

        <div className="d-flex flex-column">
          <div className="mt-2 ">
            <VideoTitleHeading text={videoTitle} />
            <RobotgoryHeading text={topicName} />
            <RobotgoryHeading text={facultyName} />
          </div>
          <div className="d-flex gap-2 mb-1  ">
            <PriceHeading text="Price" />
            <div className="d-flex align-items-center">
              {price !== 0 && <RupeeIcon />}
              <PriceText text={price === 0 ? "Free" : price} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr style={{ marginBottom: "10px" }} />
        <div className="d-flex flex-wrap col justify-content-between align-items-center">
          <div className="d-flex gap-3">
            <div className="d-flex gap-2 align-items-center">
              <LanguageIcon />
              <CategoryHeading text={language} />
            </div>
          </div>
          <div className="d-flex gap-2">
            {price > 0 && !isPurchased ? (
              <CustomButton
                title={isAddedToCart ? "View Cart" : "Add To Cart"}
                width="120px"
                height="35px"
                color={isAddedToCart ? ThemeColors?.black : ThemeColors.white}
                background={
                  isAddedToCart ? ThemeColors?.white : ThemeColors?.inProgress
                }
                style={{
                  fontSize: "12px",
                  border: `1px solid ${ThemeColors?.inProgress}`,
                }}
                icon={!isAddedToCart && <CartIcon />}
                func={() => handleCart(videoData)}
              />
            ) : (
              <CustomButton
                title={"Watch"}
                width="120px"
                height="35px"
                color={ThemeColors?.inProgress}
                background={ThemeColors?.white}
                style={{
                  fontSize: "12px",
                  border: `1px solid ${ThemeColors?.inProgress}`,
                }}
                func={() =>
                  navigate(RouteConstant.PremiumVideo, { state: videoId })
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(VideoCard);
