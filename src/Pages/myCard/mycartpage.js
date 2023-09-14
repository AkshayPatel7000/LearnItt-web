import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CategoryHeading } from "../../../src/customComponents/Header/cardheader";
import {
  AddMoney,
  EmptyCart,
  LanguageIcon,
  RupeeIcon,
} from "../../assets/icon/inputIcon";
import {
  CardHeading,
  PriceHeading,
  PriceText,
  RobotMediumHeading,
  RobotgoryHeading,
  RobotoTextHeadingNormal,
} from "../../customComponents/Header/cardheader";
import CustomButton from "../../customComponents/button/customButton";
import { HeadTitle } from "../../customComponents/headTitle/headTitle";
import NotFoundTemplate from "../../customComponents/notFoundTemplate/NotFoundTemplate";
import EbookStore from "../../mobx/ebook";
import WalletDetail from "../../services/WalletService";
import EbookData from "../../services/ebookSevice";
import { ThemeColors } from "../../theme/theme";
import { cartPayload } from "../../utils/payloadHanlder";
import { RouteConstant } from "../../utils/routes/constant";
import "./myCard.css";
import { useLayoutEffect } from "react";
const cardStyle = {
  display: "flex",
  width: "100%",
  height: "90%",
  justifyContent: "center",
};
const Mycartpage = () => {
  const { showMyCart, totalRecords, toBePurchasedPrice } =  EbookStore?.cartDetails;
  const [balance, setbalance] = useState("");
  const [diff, setDiff] = useState(0);
  // const [modal, setModal] = useState(false);

  const navigate = useNavigate();


  /*eslint-disable */
  useEffect(() => {
    getStudentBalance();
  }, [totalRecords]);
 

  const getStudentBalance = async () => {
    try {
      const res = await WalletDetail?.getStudentBalance();
      setbalance(res?.balance);
    } catch (e) {
      console.log("Error on create order --> ", e);
    }
  };

  const checkout = async () => {
    let checkoutItems = showMyCart.filter(
      (item) => item?.toBePurchased === true
    );
    let checkoutdata = checkoutItems?.map((item) => {     
      return{
        "productCategory": Number(EbookData.checkProductCategory(item?.productCategory)),
        "productId": item?.productId,
        "price":item?.price
      }
    })
    if (balance >= toBePurchasedPrice) {
      let payload = {
        totalAmount: toBePurchasedPrice,
        checkOutItems: checkoutdata,
      };
    
    const res= await WalletDetail?.Checkout(payload);
    if(res?.isSuccess){
      let oldCart = [...toJS(EbookStore.cartDetails.showMyCart)];
      let updatedCart = oldCart.filter(element =>checkoutdata.includes(elm=>elm?.productId !==element?.productId))
    //  console.log("updatedCart",toJS(updatedCart));
        EbookStore.setCartDetails({
        ...EbookStore?.cartDetails,
        showMyCart: updatedCart,
        toBePurchasedPrice: handlePrice(updatedCart),
      });
      if(res?.messages==="Checkout items successfully!"){
        toast.success("Checked out Items successfully!")
      }
    navigate(RouteConstant?.myPurchase)
    }

        
    } else {
      setDiff(toBePurchasedPrice - balance);
    }
  };

  const handlePrice = (cart) => {
    let toBePurchasedPrice = cart
      ?.filter((item) => item?.toBePurchased)
      ?.reduce((acc, item) => {
        acc = acc + item?.price;
        return acc;
      }, 0);
    return toBePurchasedPrice;
  };

  const handleSelectAll = () => {
    let updatedCart = showMyCart?.map((item) => {
      return {
        ...item,
        toBePurchased: EbookStore.isAllCartSelected ? false : true,
      };
    });
   
    let checkoutdata = updatedCart?.map((item) => {
      return {
        productCategory: item?.productCategory,
        productId: item?.productId,
        price: item?.price,
      };
    });

    EbookStore?.setcheckOutItems(checkoutdata);
    EbookStore.setCartDetails({
      ...EbookStore?.cartDetails,
      showMyCart: updatedCart,
      toBePurchasedPrice: handlePrice(updatedCart),
    });
    // setIsCheckAll(!isCheckAll);
    !!diff &&
      diff > 0 &&
      !!updatedCart.isAllCartSelected &&
      setDiff(handlePrice(updatedCart) - balance);
    EbookStore.setIsAllCartSelected(!EbookStore.isAllCartSelected);
  };

  const handleSingleItemSelect = (selectedItem) => {
    let updatedCart = showMyCart?.map((item) => {
      if (item?.id === selectedItem?.id) {
        return { ...item, toBePurchased: !item?.toBePurchased };
      } else return item;
    });
   
    EbookStore.setCartDetails({
      ...EbookStore?.cartDetails,
      showMyCart: updatedCart,
      toBePurchasedPrice: handlePrice(updatedCart),
    });
    let isAllChecked = updatedCart.find((it) => !it?.toBePurchased);
    // setIsCheckAll(isAllChecked ? false : true);
    !!diff && diff > 0 && setDiff(handlePrice(updatedCart) - balance);
    EbookStore.setIsAllCartSelected(isAllChecked ? false : true);
  };
  const handleRemoveItem = (item, productId) => {
    EbookData?.removeItemFromCart(cartPayload.call(item, productId));
    let oldCart = [...EbookStore.cartDetails.showMyCart];
    let updatedCart = oldCart.filter((it) => it?.id !== item?.id);
    EbookStore.setCartDetails({
      ...EbookStore?.cartDetails,
      showMyCart: updatedCart,
      toBePurchasedPrice: handlePrice(updatedCart),
    });
    let found = updatedCart.find((it) => !it?.toBePurchased == true);
    
    EbookStore.setIsAllCartSelected(found ? false : true);

    !!diff && setDiff(handlePrice(updatedCart) - balance);
  if(updatedCart.length===0){
    EbookStore.setCartDetails({...EbookStore?.cartDetails,totalRecords:0})
  }

  };

 
  return (
    <div className="border-0 radius-0 ps-4 py-4 gap-3">
      <div className="row">
        <div className="col-xl-6 col-lg-7 col-md-8 col-sm-10">
          <HeadTitle text="My Cart" />
        </div>
        <div
          className="col-xl-4 col-lg-7 col-md-8 col-sm-10"
          style={{ marginInline: "auto 10px" }}
        >
          <div
            className="p20 card border-0 rounded-4"
            style={{ background: ThemeColors?.white }}
          >
            <div className="d-flex justify-content-between  gap-5">
              <div className="flex-column w-100">
                <RobotMediumHeading
                  text={`Price Details (${EbookStore?.cartDetails?.showMyCart?.filter(elm=>elm?.toBePurchased===true)?.length} Item)`}
                />
                <hr />
                <div className="d-flex justify-content-between">
                  <RobotoTextHeadingNormal text="Total Amount" />
                  <RobotoTextHeadingNormal text={`₹ ${toBePurchasedPrice}`} />
                </div>
              </div>
              {!diff ? (
                <CustomButton
                  title="Checkout"
                  type="submit"
                  width="108px"
                  height="52px"
                  background={ThemeColors.black}
                  func={checkout}
                />
              ) : (
                <CustomButton
                  title="Money"
                  width="118px"
                  height="52px"
                  style={{ paddingBlock: '5px' }}
                  background={ThemeColors.black}
                  func={() => {navigate(RouteConstant?.Wallet)}}
                />
              )}
            </div>
            {!!diff && (
              <p className="text-danger fs-6 mt-1">{`Add ₹${diff} in your wallet to buy these items`}</p>
            )}
          </div>
        </div>
      </div>

      {totalRecords > 0 ? (
        <div className="row">
          <div className="d-flex justify-content-start gap-2 mt-2">
            <div className="f-sz14 f-w600 " style={{ color: "#000" }}>
              Select All
            </div>
            <div>
              <input
                // key={id}
                type="checkbox"
                // name={name}
                // id={}
                onClick={handleSelectAll}
                checked={EbookStore.isAllCartSelected}
              />
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "1rem",
            }}
          >
            {showMyCart?.map((item) => (
              <div className="">
                <div className="My_card p_card">
                  <div className="d-flex justify-content-between">
                    <p
                      className={"h6"}
                      style={{ color: ThemeColors?.secondaryBlack }}
                    >
                      {item?.productCategory}
                    </p>
                    <input
                      // key={id}
                      type="checkbox"
                      // name={name}
                      // id={}
                      onClick={() => handleSingleItemSelect(item)}
                      checked={item?.toBePurchased}
                      // isChecked={isCheck.includes(id)}
                    />
                  </div>
                  <div className="display-f gap-30 media">
                    <div className="IMG">
                      <img
                        src={item?.thumbnail}
                        alt=""
                        width={150}
                        height={150}
                      />
                    </div>
                    <div className="d-flex flex-column  w100">
                      <div className="mt-2 ">
                        <div className="display-space-between g10">
                          <div>
                            <CardHeading
                              text={item?.productName}
                              fontFamily="Bold"
                            />
                          </div>
                        </div>
                        <RobotgoryHeading text={item?.topicName} />
                      </div>
                      <div className="d-flex gap-2 mt-2 mb-1  ">
                        <PriceHeading text="Price " />
                        <div className="d-flex align-items-center">
                          <RupeeIcon />
                          <PriceText text={item?.price} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex flex-wrap col justify-content-between align-items-center gap-1">
                    <div className="d-flex gap-3">
                      <div className="d-flex gap-2 align-items-center">
                        <LanguageIcon />
                        <CategoryHeading text="English" />
                      </div>
                    </div>
                    <div className="d-flex gap-2 Ebook-c">
                      <CustomButton
                        title="Remove"
                        width="120px"
                        height="35px"
                        background={ThemeColors?.white}
                        style={{ fontSize: "14px" }}
                        border="1px solid #4FA4F4"
                        color={ThemeColors?.lightBlue}
                        func={() => handleRemoveItem(item)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <NotFoundTemplate
            icon={<EmptyCart />}
            line1={"Your cart is empty"}
            line2={"Looks like you haven’t made your choice yet"}
            cardStyle={cardStyle}
            title="Go Home"
          />
        </div>
      )}
    </div>
  );
};

export default observer(Mycartpage);
