import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartIcon, LanguageIcon, RupeeIcon } from '../../../assets/icon/inputIcon';
import PDF from "../../../assets/images/PDF.png";
import { CardHeading, CategoryHeading, PriceHeading, PriceText, RobotgoryHeading } from '../../../customComponents/Header/cardheader';
import CustomButton from '../../../customComponents/button/customButton';
import EbookData from '../../../services/ebookSevice';
import { ThemeColors } from '../../../theme/theme';
import { commonPayload } from '../../../utils/payloadHanlder';
import { RouteConstant } from '../../../utils/routes/constant';
import "./pypPage.css";
import moment from 'moment/moment';
const PypCard = ({ pyp, subjectList, }) => {
    const { isPurchased,isAddedToCart,paperTitle,year,price,language, } = pyp
    const navigate = useNavigate();
    const handleCart = async (pyp) => {
        const res = pyp.isAddedToCart ? navigate(RouteConstant?.cart) : isPurchased ? navigate(RouteConstant.viewPYP, { state: { pyp: pyp } }) : await EbookData?.addToCart(commonPayload.call(pyp, 4))
        if (res) {
            subjectList()
        }
    }
    return (
        <div className={"card p-4 previsited pointer"} style={{ border: "1px solid #739EF1" }}>
     <div className="col purchaseDate mb-2">
        { moment.utc(pyp?.purchaseDate).local().format('MMM DD ,YYYY')}
      </div>
            <div className='d-flex gap-4 '>
                <div>
                    <img src={PDF} alt="thumb" />
                </div>
                <div className='d-flex flex-column'>
                    <div className="mt-2 ">
                        <CardHeading text={paperTitle} fontFamily="Bold" />
                        <RobotgoryHeading text={`YEAR_${year}`} />
                    </div>
                    <div className="d-flex gap-2 mt-2 mb-1  ">
                        <PriceHeading text="Price" />
                        <div className="d-flex align-items-center">
                            {price > 0 && <RupeeIcon />}
                            <PriceText text={price > 0 ? price : "Free"} />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="d-flex flex-wrap col justify-content-between align-items-center px-3">
                <div className="d-flex gap-3">
                    <div className="d-flex gap-2 align-items-center">  <LanguageIcon />
                        <CategoryHeading text={language} />
                    </div>
                </div>

                <div className="d-flex gap-2 align-items-center">
                    {(price > 0 && !isPurchased) ?
                        <CustomButton
                            title={isAddedToCart ? "View Cart" : "Add To Cart"}
                            width="120px"
                            height="35px"
                            color={isAddedToCart ? ThemeColors?.visited : ThemeColors?.white}
                            background={isAddedToCart ? ThemeColors?.white : ThemeColors?.visited}
                            style={{ fontSize: '12px', border: `1px solid ${ThemeColors?.visited}` }}
                            icon={!isAddedToCart && <CartIcon />}
                            func={() => handleCart(pyp)}
                        />
                        :
                        <CustomButton
                            title={"View Paper"}
                            width="120px"
                            height="35px"
                            color={ThemeColors?.white}
                            background={ ThemeColors?.visited}
                            style={{ fontSize: '12px', border: `1px solid ${ThemeColors?.visited}` }}
                            // icon={<EyeIcon />}
                            func={() => navigate(RouteConstant.viewPYP, { state: { pyp: pyp } })}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default observer(PypCard)