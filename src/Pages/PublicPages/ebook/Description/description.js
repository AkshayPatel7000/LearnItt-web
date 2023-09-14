import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    CartIcon,
    RupeeIcon
} from "../../../../assets/icon/inputIcon";
import writer from "../../../../assets/images/writer.png";
import CardSubHeading from "../../../../customComponents/DynamicText/cardSubHeading";
import {
    CardSubHeading1,
    PriceText,
    RobotLightHeading,
    RobotoTitelHeading,
    RobotodesHeading,
    VideoPriceHeading
} from "../../../../customComponents/Header/cardheader";
import CustomButton from "../../../../customComponents/button/customButton";
import { HeadTitle } from "../../../../customComponents/headTitle/headTitle";
import EbookData from "../../../../services/ebookSevice";
import { ThemeColors } from "../../../../theme/theme";
import { commonPayload } from "../../../../utils/payloadHanlder";
import { RouteConstant } from "../../../../utils/routes/constant";
import "../ebook.css";
import { MyCart } from "../../../../assets/svg";

const DescriptionEbook = () => {
    const { state } = useLocation();
    const navigate = useNavigate()
    const [ebookLIstByid, setEbookListByid] = useState({});
    /* eslint-disable */

    useEffect(() => {
        getEbookByid();
    }, []);

    const getEbookByid = async () => {
        let payload = {
            id: state?.ebookId,
        };
        const res = await EbookData?.getEbookDescList(payload);
        if (res?.isSuccess) {
            setEbookListByid({
                ...res?.data, isAddedToCart: state?.isAddedToCart
            });
            handleIsCart(res?.data)
            return res?.data;
        } else {
            setEbookListByid({});
        }
    };

    const handleCart = async (ebook) => {
        const res = ebook?.isAddedToCart ? navigate(RouteConstant.cart) : await EbookData?.addToCart(commonPayload.call(ebook, 2))
        if (res) {
            handleIsCart(ebook)
        }
    }
    const viewPdf = (data) => {
        navigate(RouteConstant.EbookViewer, { state: { ebook: data } });
    }

    const handleIsCart = async (data) => {
        const resp = await EbookData.getAllCartItems()
        let Ebook = resp?.showMyCart?.find(cartItem => cartItem?.productId === data?.ebookId)
        setEbookListByid({ ...data, isAddedToCart: Ebook ? true : false });
    }
    return (

        <div className="card border-0 radius-0 ps-4 py-4 gap-3 eb-c">
            <HeadTitle text="eBook" />

            <div className="d-flex gap-5 eb-f">
                <div className="mt-2">
                    <img src={writer} style={{ width: "150px" }} />
                </div>
                <div className="eb-m">

                    <div className="mt-2 mb-4 ">
                        <div className="pb-2">   <CardSubHeading
                            text={ebookLIstByid?.ebookTitle}
                            fontFamily="Bold"

                        /></div>

                        <CardSubHeading1
                            text={ebookLIstByid?.topicName}
                            fontFamily="Bold"

                        />
                    </div>

                    <div className='row g-10 align-items-start pt-3'>
                        <div className="columnCard d-flex">
                            <div className="d-flex align-items-center">  <RupeeIcon />
                                <PriceText text={ebookLIstByid?.price} /></div>


                            <VideoPriceHeading text="PRICE" />
                        </div>
                        <div className="columnCard">
                            <RobotoTitelHeading text={ebookLIstByid?.authorName} />
                            <RobotLightHeading text="Author " />
                        </div>
                        <div className="columnCard">
                            <RobotoTitelHeading text={ebookLIstByid?.language} />

                            <RobotLightHeading text="Language" />
                        </div>
                    </div>
                    <div className="pt-5 pb-4">
                        <RobotodesHeading text={ebookLIstByid?.topicName} />
                        <div
                            className="pt-3"
                            style={{
                                fontSize: "14px",
                                fontFamily: "roboto",
                                fontWeight: "400",
                                color: "#000",
                            }}
                        >
                            {ebookLIstByid?.description}
                        </div>
                    </div>
                    <div className="d-flex flex-wrap col justify-content-between align-items-center">
                        <div className="display-grid-temp2 gap-2 Ebook-c">
                            <CustomButton
                                title={(ebookLIstByid?.price === 0 || ebookLIstByid.isPurchased) ? "View PDF" : ebookLIstByid?.isAddedToCart ? "View Cart" : "Add To Cart"}
                                width="190px"
                                height="56px"
                                color={ThemeColors?.white}
                                background={ ThemeColors?.completed}
                                style={{ fontSize: '15px', border: `1px solid ${ThemeColors?.completed}` }}
                                icon={(ebookLIstByid?.price === 0 || ebookLIstByid.isPurchased) ? "" : <CartIcon/>}
                                func={() => (ebookLIstByid?.price === 0 || ebookLIstByid.isPurchased) ? viewPdf(ebookLIstByid) : handleCart(ebookLIstByid)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(DescriptionEbook);
