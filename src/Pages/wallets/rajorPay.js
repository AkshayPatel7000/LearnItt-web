import { toast } from "react-toastify";
import AuthStore from "../../mobx/auth";
import { toJS } from "mobx";
import { RouteConstant } from "../../utils/routes/constant";
// import { clearItem } from "../../redux/CartReducer/action";
import logo from "../../assets/images/KrackittLogo.png"

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const DisplayRazorpay = async (
  amount = 1,
  navigate
) => {
  const user = toJS(AuthStore?.user?.user);
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");


  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }
  const options = {
    key: "rzp_test_DSJfgEbM7ykeLj",
    amount: amount * 100,
    currency: "INR",
    name: "Krackitt",
    description: "Thank You for Purchase",
    image:
      logo,

    handler: function (response) {
      toast.success("Payment Success!");
      navigate(RouteConstant.home);
      //   swal({
      //     title: "Payment Success!",
      //     text: "Click Yes to know your Payment ID",
      //     icon: "success",
      //     buttons: ["No", "Yes"],
      //   }).then((willDelete) => {
      // if (willDelete) {
      //   swal(`Your Payment Id is : ${response.razorpay_payment_id}`, {}).then(
      //     () => {
      //       dispatch(clearItem());
      //       navigate("/");
      //     }
      //   );
      // } else {
      //   swal("Thank You for Shopping!").then(() => navigate("/"));
      // }
      //   });
    },
    prefill: {
      name: user.name,
      email: user.email,
      contact: user.mobileNumber,
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

export { DisplayRazorpay };

