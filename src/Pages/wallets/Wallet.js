import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  DegreeFourFiveArrrowIcon,
  DegreeTwoTwoFiveArrowICon,
  PlusIcon,
  RupeeIcon,
  SearchIcon,
} from "../../assets/icon/inputIcon";
import { numberOnly } from "../../assets/regex";
import {
  AddMoneyWalletHeading,
  CardWalletHeading,
  MidTitleWalletHeading,
  TransactionAmountText,
  TransactionText,
  TransactionTimeText,
  WalletlargHeading,
} from "../../customComponents/DynamicText/Heading";
import CustomButton from "../../customComponents/button/customButton";
import ModalPopup from "../../customComponents/customModals/CustomModal";
import CustomInput from "../../customComponents/customTextInput";
import { HeadTitle } from "../../customComponents/headTitle/headTitle";
import EbookStore from "../../mobx/ebook";
import WalletDetail from "../../services/WalletService";
import "./wallet.css";
import { converttoUTC } from "../../utils/hooks/convertIST";
import moment from "moment";
const Wallet = () => {
  const [modal, setModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [balance, setbalance] = useState("");
  const [error, setError] = useState();
  const [toggle, setToggle] = useState(false);
  const [, setorderId] = useState(false);
  const { walletHistory } = EbookStore;
  // const navigate = useNavigate();
  const [searchParams, ] = useSearchParams();
  searchParams.get("status")

  useEffect(() => {
    getStudentBalance();
    getWalletHistory();
    setToggle(true);

    if(searchParams.get("status")==='Success'){
    toast.success("Your wallet has been enriched with a successful addition of funds.")
    }
    if(searchParams.get("status")==='Aborted'){
    toast.warning("Your payment has been Aborted.")
    }
    if(searchParams.get("status")==='Failure'){
    toast.error("Your payment has been Failed.")
    }
  }, []);

  const handleChange = (event) => {
    let isNumber = numberOnly.test(event?.target?.value);
    if (!isNumber) {
      setError(true);
    } else {
      setPrice(event?.target?.value);
      setError(false);
    }
  };
  const getStudentBalance = async () => {
    try {
      const res = await WalletDetail?.getStudentBalance();
      setbalance(res?.balance);
    } catch (e) {
      console.log("Error on create order --> ", e);
    }
  };

  const getWalletHistory = async () => {
    try {
      // const rechargeHistory =
       await WalletDetail?.getWalletHistory();
    } catch (e) {
      console.log("Error on create order --> ", e);
    }
  };

  const createOrder = async () => {
  let Data=
  {
    amount: price,
    isMobile: false,
   //serverType: 0  // enum for local
    serverType: 2   // enum for  prod
  }  
  console.log("gsdgh",Data)
    try {
      const res = await WalletDetail?.createPayment(Data);
    
      if(res){
        setModal(false);
        setorderId(res?.orderId);
        window.location.href = res?.redirectUrl
      }
    } catch (e) {
      console.log("Error on create order --> ", e);
    }
  };

  const handleMoney = (amount) => {
    setPrice(amount);
    setModal(true);
  };
  
  const getProductName = (category) => {
    let productCategory;
    switch (JSON.stringify(category)) {
      case "1":
        productCategory = "Mock Test";
        break;
      case "2":
        productCategory = "Ebook";
        break;
      case "3":
        productCategory = "Video";
        break;
      case "4":
        productCategory = "Previous Year Paper";
        break;

      default:
        productCategory = "Top-up";
        break;
    }
    return productCategory;
  };

  if (!toggle) return <></>;
  return (
    <>
      <div>
        <HeadTitle text="Wallet" />
        <div className="row d-flex flex-wrap">
          <div className="col-lg-6 col-sm-6 col-xl-6 p-3">
            <div className="balCard">
              <CardWalletHeading text="Balance" color="white" />
              <WalletlargHeading text={`₹  ${balance}`} color="white" />
            </div>
            <div className="row p-3 g-10">
              <div className="col addMoney" onClick={() => setModal(true)}> 
                <PlusIcon />
                <AddMoneyWalletHeading text="Add Money" color="#4FA4F4" />
              </div>
              <div className="col walletMoney" onClick={() => handleMoney(100)}>
              ₹100
              </div>
              <div className="col walletMoney" onClick={() => handleMoney(500)}>
                ₹500
              </div>
              <div
                className="col walletMoney"
                onClick={() => handleMoney(1000)}
              >
                ₹1000
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-6 col-xl-6 p-3 miniTransaction">
            <MidTitleWalletHeading text="Transaction" />
            {/* <div className="searchInput mt-3">
              <SearchIcon />
              <input
                type="text"
                className="search"
                placeholder="Search Transaction"
              />
            </div> */}
            <div>
            <table className="mt-3 walletTable" style={{ width: "100%" }}>
              <tbody style={{ width: "100%" }}>
                {walletHistory.map((item) => (
                  <div className="p-3 tablerow d-flex align-items-start justify-content-between h-auto">
                    <div className="d-flex">
                      <div
                        style={{
                          width: "50px",
                         
                        }}
                      >
                        {item?.productName?<DegreeFourFiveArrrowIcon />:<DegreeTwoTwoFiveArrowICon/>}
                      </div>
                      <div className="">
                        <TransactionText
                          className=""
                          text={item?.productName || "Wallet Recharge"}
                        />
                        <TransactionTimeText
                          text={getProductName(item?.productCategory)}
                          marginn={"2px"}
                        />
                        <TransactionTimeText
                          text={moment.utc(item?.creationDate).local().format('DD MMM YYYY | hh:mm a')}
                        />
                      </div>
                    </div>
                    <div style={{ textAlign: "end",marginBlock:"auto" }}>
                      <TransactionAmountText
                        text={
                          item?.creditAmount
                            ? `+${item?.creditAmount}`
                            : `-${item?.debitAmount}`
                        }
                        color={item?.creditAmount ? "#8AD0AF" : "#D03D3D"}
                      />
                    </div>
                  </div>
                ))}
                {/* <tr className="p-4 tablerow">
                  <td style={{ width: "50px" }}>
                    <DegreeTwoTwoFiveArrowICon />
                  </td>
                  <td className="p-2">
                    <TransactionText text="000011102354" />{" "}
                    <TransactionTimeText text="1:00 pm" />{" "}
                  </td>
                  <td style={{ textAlign: "end" }}>
                    <TransactionAmountText text="+₹1000" color="#8AD0AF" />
                  </td>
                </tr> */}
              </tbody>
            </table>
            </div>
            {/* <button className="btnDownload mt-3">Download History</button> */}
          </div>
        </div>
      </div>
      {modal && (
        <ModalPopup
          width={"100%"}
          isFooter={false}
          CloseModalFunc={() => {
            setModal(false);
          }}
        >
          <>
            <div className="modeltextCenter ">
              <CustomInput
                lefticon={<RupeeIcon />}
                label={"Enter Amount"}
                placeholder={"Enter Amount"}
                value={price}
                type="text"
                onChange={handleChange}
                width="231px"
                height="50px"
              />
              {error && <span>Please enter valid amount</span>}
              <CustomButton
                func={createOrder}
                style={{ marginTop: "20px" }}
                title="Proceed Top-up"
                type="submit"
              />
            </div>
          </>
        </ModalPopup>
      )}
    </>
  );
};

export default observer(Wallet);
