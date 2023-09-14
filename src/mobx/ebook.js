import { makeAutoObservable } from "mobx";
class Ebook {
    instituteId = "";
    isLoading = false;
    filterData = {
        languageData: 0,
        Topicid: "",
        price: 0,
        ebook: [],
    };
    ebook = {
        instituteId: "",

        subcourseId: "",
        subjectId: "",
        languageFilter: 0,
        priceFilter: 0,
        ebook: "",

    }
    cartDetails={};
    walletHistory=[];
    isAllCartSelected=false;
    checkOutItems=[]
    constructor() {
        makeAutoObservable(this);
    }

    setTopic = (data) => {
        this.filterData.Topicid = data?.id;

    };

    setcheckOutItems= (data) => {
        this.checkOutItems = data;
    };

    setEbook = (data) => {
        this.ebook.ebook = data[0]?.ebookId;

        //console.log("data=======>ddddddddddddddddddd", data[0]?.ebookId)
    };
    setCartDetails=(payload)=>{
        this.cartDetails={...payload}
    }
    setfilterData = (data) => {
        this.filterData = { ...this.filterData, ...data };
        //console.log("data=======>", data)
    };
    setIsAllCartSelected=(value)=>{
        this.isAllCartSelected= value
    }
    setWalletHistory=(payload)=>{
        //console.log("payload",payload)
        this.walletHistory=[...payload]
    }
}
const EbookStore = new Ebook();
export default EbookStore;


