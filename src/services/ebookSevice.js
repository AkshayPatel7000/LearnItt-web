import { toast } from "react-toastify";
import EbookIcon from "../assets/images/EbookIcon.png";
import MockTestIcon from "../assets/images/MockTestIcon.png";
import PDF from "../assets/images/PDF.png";
import VideoIcon from "../assets/images/VideoIcon.png";
import { axiosInstance } from "../config/https";
import AuthStore from "../mobx/auth";
import EbookStore from "../mobx/ebook";
import { ApiPath } from "../utils/routes/constant";
class Ebook {
  getAllSubject = async (payload) => {
    try {
      AuthStore.setLoading(false);
      const resp = await axiosInstance.post(
        `${ApiPath?.getAllSubject}`,
        payload
      );

      if (resp?.data.isSuccess && resp?.data.responseCode === 200) {
        AuthStore.setLoading(false);

        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    } catch (error) {
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message);
      throw new Error(error);
    }
  };
  getEbookList = async (payload) => {
    try {
      if (!payload) {
        payload = { pageNumber: 0, pageSize: 0 };
      }
      AuthStore.setLoading(true);
      const ebookListData = await axiosInstance.post(
        `${ApiPath?.getEbooklist}`,
        payload
      );

      if (
        ebookListData?.data.isSuccess &&
        ebookListData?.data.responseCode === 200
      ) {
        AuthStore.setLoading(false);
        return ebookListData?.data;
      } else {
        AuthStore.setLoading(false);
        return ebookListData?.data;
      }
    } catch (error) {
      AuthStore.setLoading(false);
      console.log(
        "🚀 ~ file: ebookSevice.js:55 ~ Ebook ~ getEbookList= ~ error:",
        error
      );
    }
  };
  getEbookDescList = async (payload) => {
    AuthStore.setLoading(true);
    const ebookDescListData = await axiosInstance.post(
      `${ApiPath?.getEbooklistByid}`,
      payload
    );

    if (
      ebookDescListData?.data.isSuccess &&
      ebookDescListData?.data.responseCode === 200
    ) {
      AuthStore.setLoading(false);
      return ebookDescListData?.data;
    } else {
      AuthStore.setLoading(false);
      return ebookDescListData.data;
    }
  };
  gettopiclistbysubjectidandsubcourseid = async (payload) => {
    try {
      AuthStore.setLoading(false);
      const resp = await axiosInstance.post(
        `${ApiPath?.gettopiclistbysubjectidandsubcourseid}`,
        payload
      );
      if (resp?.data.isSuccess && resp?.data.responseCode === 200) {
        AuthStore.setLoading(false);

        return resp?.data;
      } else {
        AuthStore.setLoading(false);
        return resp?.data;
      }
    } catch (error) {
      console.log("Error on topic --> ", error);
      AuthStore.setLoading(false);
      toast.error(error?.response?.data?.data[0]?.message);
      throw new Error(error);
    }
  };
  addToCart = async (payload) => {
    AuthStore.setLoading(true);
    const res = await axiosInstance.post(`${ApiPath?.addEbookToCart}`, payload);
    if (res?.data?.isSuccess) {
      AuthStore.setLoading(false);
      toast?.success(res?.data?.message);
      return res?.data?.isSuccess;
    } else {
      AuthStore.setLoading(false);
    }
  };
  checkProductCategory = (productCategory) => {
    // console.log(productCategory);
    switch (productCategory) {
      case "eBook":
        return "2";
      // break;
      case "MockTest":
        return "1";
      // break;
      case "Video":
        return "3";
      // break;
      case "PreviouseYearPaper":
        return "4";
      // break;
      default:
        break;
    }
  };
  checkImage = (Image, productCategory) => {
    if (Image === "") {
      switch (productCategory) {
        case "eBook":
          return EbookIcon;
        // break;
        case "MockTest":
          return MockTestIcon;
        // break;
        case "Video":
          return VideoIcon;
        // break;
        case "PreviouseYearPaper":
          return PDF;
        // break;
        default:
          return;
      }
    } else {
      return Image;
    }
  };
  getAllCartItems = async () => {
    AuthStore.setLoading(true);
    let modifiedCart = [];
    const res = await axiosInstance.get(`${ApiPath?.getCartItems}`);
    if (res) {
      AuthStore.setLoading(false);
      if (EbookStore.cartDetails?.showMyCart?.length >= 1) {
        modifiedCart = res.data.data?.showMyCart.filter(
          (item) =>
            !EbookStore.cartDetails?.showMyCart.some(
              (it) => it?.id === item?.id
            )
        );
        // console.log("modified-cart-1",modifiedCart)
        modifiedCart = modifiedCart?.map((item) => {
          return {
            ...item,
            toBePurchased: false,
            thumbnail: this.checkImage(item?.thumbnail, item?.productCategory),
          };
        });
        EbookStore.setCartDetails({
          ...res.data.data,
          showMyCart: [...EbookStore.cartDetails?.showMyCart, ...modifiedCart],
          toBePurchasedPrice: 0,
        });
        // console.log("modified-cart-2",modifiedCart)
        modifiedCart = [...EbookStore.cartDetails?.showMyCart, ...modifiedCart];
        EbookStore.setIsAllCartSelected(false);
      } else {
        modifiedCart = res.data.data?.showMyCart?.map((item) => {
          return {
            ...item,
            toBePurchased: false,
            thumbnail: this.checkImage(item?.thumbnail, item?.productCategory),
          };
        });
        EbookStore.setCartDetails({
          ...res.data.data,
          showMyCart: modifiedCart,
          toBePurchasedPrice: 0,
        });
      }
      let checkoutdata = modifiedCart?.map((item) => {
        return {
          productCategory: Number(
            this.checkProductCategory(item?.productCategory)
          ),
          productId: item?.productId,
          price: item?.price,
        };
      });
      EbookStore?.setcheckOutItems(checkoutdata);

      return res.data.data;
    } else {
      AuthStore.setLoading(false);
    }
  };
  removeItemFromCart = async (payload) => {
    AuthStore.setLoading(true);
    const res = await axiosInstance.post(`${ApiPath?.removeCartItem}`, payload);
    if (res) {
      // this.getAllCartItems()
    } else {
      AuthStore.setLoading(false);
    }
    AuthStore.setLoading(false);
  };
}
const EbookData = new Ebook();
export default EbookData;
