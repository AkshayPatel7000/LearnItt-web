import { makeAutoObservable } from "mobx";
class Pyp {
    filterData = {
        languageFilter: 0,
        priceWiseSort: 0,
        pricingFilter: 0,
        year: 0,
        // year: 2023,
    };

    constructor() {
        makeAutoObservable(this);
    }

    setTopic = (data) => {
        this.filterData.Topicid = data?.id
    };
    setfilterData = (data) => {
        this.filterData = { ...this.filterData, ...data }
    }


}
const PypStore = new Pyp();
export default PypStore;