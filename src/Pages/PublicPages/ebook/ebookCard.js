import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { CartIcon, LanguageIcon, RupeeIcon } from '../../../assets/icon/inputIcon';
import { CardHeading, CategoryHeading, PriceHeading, PriceText, RobotgoryHeading } from '../../../customComponents/Header/cardheader';
import CustomButton from '../../../customComponents/button/customButton';
import EbookData from '../../../services/ebookSevice';
import { ThemeColors } from '../../../theme/theme';
import { commonPayload } from '../../../utils/payloadHanlder';
import { RouteConstant } from '../../../utils/routes/constant';
import "./ebook.css";
import EbookIcon from "../../../assets/images/EbookIcon.png";
import moment from 'moment';

const EbookCard = ({ ebook, subjectList }) => {
    const { isAddedToCart, ebookThumbnail, ebookTitle, topicName, price, isPurchased, language } = ebook

    const navigate = useNavigate();
    const handleCart = async (ebook, e) => {
        e?.preventDefault()
        const res = ebook?.isAddedToCart ? navigate(RouteConstant.cart) : ebook?.isPurchased ? navigate(RouteConstant.EbookViewer, { state: { ebook: ebook } }) : await EbookData?.addToCart(commonPayload.call(ebook, 2))
        if (res) {
            subjectList()
        }
    }

    return (
        <div className={"card p-4 rounded-4 pointer"} style={{ minHeight: "220px", border: "1px solid #8AD0AF" }}>
    <div className="col purchaseDate mb-2">
     { moment.utc(ebook?.purchaseDate).local().format('MMM DD ,YYYY')}
      </div>
            <div className='d-flex gap-4 ' onClick={() => navigate('/DescriptionEbook', { state: ebook })}>
                <div>
                    <img alt="thumb" width={"120px"} height={"120px"} src={ebookThumbnail || EbookIcon} />
                </div>
                <div className='d-flex flex-column'>
                    <div className="mt-2">
                        <CardHeading text={ebookTitle} fontFamily="Bold" />
                        <RobotgoryHeading text={topicName} />
                    </div>
                    <div className="d-flex gap-2 mt-2 mb-1  ">
                        <PriceHeading text="Price" />
                        <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                {price !== 0 && (<RupeeIcon />)}
                                <PriceText text={price === 0 ? 'Free' : price} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div><hr /></div>
            <div className="d-flex flex-wrap col justify-content-between align-items-center">
                <div className="d-flex gap-3">
                    <div className="d-flex gap-2 align-items-center">  <LanguageIcon />
                        <CategoryHeading text={language} /></div>
                </div>
                <div className="d-flex gap-2">
                    {!(price > 0 && !isPurchased) ?
                        <CustomButton
                            title={"View"}
                            width="120px"
                            height="35px"
                            color={ThemeColors?.completed}
                            background={ThemeColors?.white}
                            style={{ fontSize: '15px', border: `1px solid ${ThemeColors?.completed}` }}
                            func={() => navigate(RouteConstant.EbookViewer, { state: { ebook: ebook } })}
                        /> :
                        <CustomButton
                            title={isAddedToCart ? "View Cart" : "Add To Cart"}
                            width="120px"
                            height="35px"
                            color={isAddedToCart ? ThemeColors?.completed : ThemeColors.white}
                            background={isAddedToCart ? ThemeColors?.white : ThemeColors?.completed}
                            style={{ fontSize: '12px', border: `1px solid ${ThemeColors?.completed}` }}
                            icon={!isAddedToCart && <CartIcon />}
                            func={(e) => handleCart(ebook, e)}
                        />}
                </div>
            </div>
        </div>
    )
}

export default observer(EbookCard)