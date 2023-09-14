import React from 'react'
import CustomButton from '../../../../customComponents/button/customButton'
import { CardHeading, CategoryHeading, PriceHeading, PriceText, RobotgoryHeading } from '../../../../customComponents/Header/cardheader'
import { RupeeIcon } from '../../../../assets/icon/inputIcon'
import PDF from "../../../../assets/images/PDF.png";

export default function MyPurchaseCard() {
    return (
        <div className={"card p-4 previsited pointer"} style={{ border: "1px solid #739EF1s" }}>
            <div className='d-flex gap-4 '>
                <div>
                    <img src={PDF} alt="thumb" />
                </div>
                <div className='d-flex flex-column'>
                    <div className="mt-2 ">
                        <CardHeading text={pyp?.paperTitle} fontFamily="Bold" />
                        <RobotgoryHeading text={pyp?.year} />
                    </div>
                    <div className="d-flex gap-2 mt-2 mb-1  ">
                        <PriceHeading text="Price" />
                        <div className="d-flex align-items-center">
                            {pyp?.price > 0 && <RupeeIcon />}
                            <PriceText text={pyp?.price > 0 ? pyp?.price : "Free"} />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="d-flex flex-wrap col justify-content-between align-items-center px-3">
                <div className="d-flex gap-3">
                    <div className="d-flex gap-2 align-items-center">  <LanguageIcon />
                        <CategoryHeading text={pyp?.language} />
                    </div>
                </div>

                <div className="d-flex gap-2 align-items-center">
                    {pyp?.price > 0 ?
                        <CustomButton
                            title={pyp?.isAddedToCart ? "View Cart" : "Add To Cart"}
                            width="120px"
                            height="35px"
                            color={pyp?.isAddedToCart && ThemeColors?.completed}
                            background={pyp?.isAddedToCart ? ThemeColors?.white : ThemeColors?.completed}
                            style={{ fontSize: '12px', border: `1px solid ${ThemeColors?.completed}` }}
                            icon={!pyp?.isAddedToCart && <CartIcon />}
                            func={() => handleCart(pyp)}
                        />
                        :
                        <CustomButton
                            title={"View Paper"}
                            width="120px"
                            height="35px"
                            color={pyp?.isAddedToCart && ThemeColors?.completed}
                            background={pyp?.isAddedToCart ? ThemeColors?.white : ThemeColors?.completed}
                            style={{ fontSize: '12px', border: `1px solid ${ThemeColors?.completed}` }}
                            // icon={<EyeIcon />}
                            func={() => navigate(RouteConstant.viewPYP, { state: { pyp: pyp } })}
                        />
                    }
                </div>
            </div>
        </div>
    )
}
