export const createOrder = async (amount) => {
  //   const { userDetails } = loginStore;

  try {
    // let headersList = {
    //   Accept: "*/*",

    //   "Content-Type": "application/json",

    //   "x-client-id": "TEST375104159435842b1ea952522a401573",

    //   "x-client-secret": "TEST2146f1332f7c9e1fa6ee20804197f2c2946e617d",

    //   "x-api-version": "2022-09-01",
    //   "Access-Control-Allow-Origin": "*",
    // };

    // let bodyContent = JSON.stringify({
    //   order_id: `${Date.now()}`,
    //   order_amount: amount,
    //   order_currency: "INR",
    //   order_note: "Testing order",
    //   customer_details: {
    //     customer_id: "12345",
    //     customer_name: "name",
    //     customer_email: "care@cashfree.com",
    //     customer_phone: "9816512345",
    //   },
    //   order_meta: {
    //     return_url: `https://test.cashfree.com/pgappsdemos/v3success.php?myorder=${Date.now()}`,
    //   },
    // });

    // let reqOptions = {
    //   url: "https://sandbox.cashfree.com/pg/orders",

    //   method: "POST",

    //   headers: headersList,

    //   data: bodyContent,
    // };

    // const { data } = await axios.request(reqOptions);

    // console.log("Order init response ---> " + JSON.stringify(data));

    // if (data?.payment_session_id) {
    // const cashfree = await window.Cashfree({
    //   mode: "sandbox", //or production
    // });

  
    // let checkoutOptions = {
    //   paymentSessionId:
    //     "session_5bV-xzFoSphcgWiU0OE8KIg1Nxlhdf3tfyldmpiMI7fyseGEewzsdVRcZZMOzGrpNTFbQUOujp-wyMYj0zNWGpwKEmvovHYbYitjiZ_1DboD",
    //   returnUrl: `https://test.cashfree.com/pgappsdemos/v3success.php?myorder=1682598363913`,
    // };
    let paymentPromise = cashfree.checkout({
      paymentMethod: null,
      paymentSessionId:
        "session_5bV-xzFoSphcgWiU0OE8KIg1Nxlhdf3tfyldmpiMI7fyseGEewzsdVRcZZMOzGrpNTFbQUOujp-wyMYj0zNWGpwKEmvovHYbYitjiZ_1DboD",
      returnUrl:
        "https://test.cashfree.com/pgappsdemos/v3success.php?myorder=1682598363913",
    });
    
    paymentPromise.then(function (result) {
 
    });
    // }
  } catch (e) {
    console.log("Error on create order --> ", e);
  }
};
